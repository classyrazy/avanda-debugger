import { computed, reactive, ref, watch } from "vue"
import { v4 as uuidv4 } from "uuid"
import RequestTabType from "../../types/requestTab"
import { useRoute, useRouter } from "vue-router"
import router from "../../router"
import requestType from "../../types/requestType"
import { currentRequestId, currentRequest } from "./useRequest"
import { requestInnerTabs } from "../../types/appStyleTypes"
import { useStorage } from "@vueuse/core"


// export const requestTabs = reactive<RequestTabType[]>([])
export const requestTabs = useStorage<RequestTabType[]>("requestTabs", [])
export let newRequestsTabs = reactive<RequestTabType[]>([])
export const currentTabId = ref("")
export const currentTab = computed(() => {
    const tab = requestTabs.value.find(tab => tab.id === currentRequestId.value)
    return tab 
})
export const currentTabType = computed(() => {
    const tab = requestTabs.value.find(tab => tab.id === currentRequestId.value)
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
        requestTabs.value.push(obj)
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
        currentRequestId.value = reqHeaderObj.id
        return reqHeaderObj.id
    }
    function handleUpdateCurrentTabId(id: string) {
        currentRequestId.value = id
        router.push({ query: { t: id } })
        currentTabId.value = id
    }
    function removeTabFromTabs(id: string, requestTabType: 'new' | 'old') {
        if (requestTabType === 'new') {
            newRequestsTabs.splice(0, 1)
            let lastItem = requestTabs.value[requestTabs.value.length - 1]
            if (lastItem) {
                handleUpdateCurrentTabId(lastItem.id)
            }
        }
        else {
            const index = requestTabs.value.findIndex(tab => tab.id === id)
            requestTabs.value.splice(index, 1)
            if (requestTabs.value.length === 0) {
                handleUpdateCurrentTabId("")
                return
            }
            handleUpdateCurrentTabId(requestTabs.value[index - 1].id || requestTabs[requestTabs.length - 1].id)
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
        requestTabs.value.push(reqHeaderObj)
        console.log({ requestId }, requestTabs)
    }
    function handleUpdateCurrentInnerTab(tab: requestInnerTabs) {
        const index = requestTabs.value.findIndex(tab => tab.id === currentRequestId.value)
        if (index === -1) return
        requestTabs.value[index].current_req_tab_model = tab
    }
    function handleUpdateTabHeaderRequestType(reqId: string,type: requestType) {
        console.log({reqId,type})
        const index = requestTabs.value.findIndex(tab => tab.id === reqId)
        if (index === -1) return
        requestTabs.value[index].type = type
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