import { computed, reactive, ref, watch } from "vue"
import { v4 as uuidv4 } from "uuid"
import RequestTabType from "../../types/requestTab"
import { useRoute, useRouter } from "vue-router"
import router from "../../router"
import requestType from "../../types/requestType"
import { currentRequestId, currentRequest } from "./useRequest"
import { requestInnerTabs } from "../../types/appStyleTypes"


export const requestTabs = reactive<RequestTabType[]>([])
export let newRequestsTabs = reactive<RequestTabType[]>([])
export const currentTabId = ref("")
export const currentTab = computed(() => {
    const tab = requestTabs.find(tab => tab.id === currentRequestId.value)
    return tab 
})
export const currentTabType = computed(() => {
    const tab = requestTabs.find(tab => tab.id === currentRequestId.value)
    return tab?.type || "get"
})
export const useRequestTabs = () => {
    function createRequestTab(id: string, name: string) {
        const obj: RequestTabType = {
            id,
            name,
            type: "get",
            current_req_tab_model: "params"
        }
        requestTabs.push(obj)
    }
    function createNewRequestTab() {
        const requestId = uuidv4()
        let reqHeaderObj: RequestTabType
        reqHeaderObj = {
            type: "get",
            name: 'New-request',
            id: `new-${requestId}`,
        }
        if (newRequestsTabs.length !== 0) return
        newRequestsTabs.push(reqHeaderObj)
        console.log({ requestId }, useRoute())
        return reqHeaderObj.id
    }
    function handleUpdateCurrentTabId(id: string) {
        router.push({ query: { t: id } })
        currentTabId.value = id
    }
    function removeTabFromTabs(id: string, requestTabType: 'new' | 'old') {
        if (requestTabType === 'new') {
            newRequestsTabs.splice(0, 1)
            let lastItem = requestTabs[requestTabs.length - 1]
            if (lastItem) {
                handleUpdateCurrentTabId(lastItem.id)
            }
        }
        else {
            const index = requestTabs.findIndex(tab => tab.id === id)
            requestTabs.splice(index, 1)
            if (requestTabs.length === 0) {
                handleUpdateCurrentTabId("")
                return
            }
            handleUpdateCurrentTabId(requestTabs[index - 1].id || requestTabs[requestTabs.length - 1].id)
        }
    }
    function addTabToRequestTabs(name: string, requestId: string,requestType:requestType = "get") {
        let reqHeaderObj: RequestTabType
        reqHeaderObj = {
            type: requestType,
            name,
            id: requestId,
            current_req_tab_model: "params"
        }
        const index = newRequestsTabs.findIndex(tab => tab.id === requestId)
        if (index !== -1) return
        requestTabs.push(reqHeaderObj)
        console.log({ requestId }, requestTabs)
    }
    function handleUpdateCurrentInnerTab(tab: requestInnerTabs) {
        const index = requestTabs.findIndex(tab => tab.id === currentRequestId.value)
        if (index === -1) return
        requestTabs[index].current_req_tab_model = tab
    }
    function handleUpdateTabHeaderRequestType(reqId: string,type: requestType) {
        console.log({reqId,type})
        const index = requestTabs.findIndex(tab => tab.id === reqId)
        if (index === -1) return
        requestTabs[index].type = type
    }

    return {
        handleUpdateCurrentTabId,
        createNewRequestTab,
        removeTabFromTabs,
        addTabToRequestTabs,
        handleUpdateCurrentInnerTab,
        handleUpdateTabHeaderRequestType
    }
}