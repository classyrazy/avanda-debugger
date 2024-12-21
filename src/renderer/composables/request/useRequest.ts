import { Ref, computed, onMounted, reactive, ref } from "vue"
import { mainRequestType } from "../../types/mainRequestType"
import { allFolders, useFolder } from "../useFolder"
import { useRequestTabs, newRequestsTabs, currentTab, requestTabs } from "./useRequestTabs"
import { useRoute, useRouter } from "vue-router"
import requestType from "../../types/requestType"
import { useStorage } from "@vueuse/core"

export const requestsTypeAvailable = reactive<{
    name: requestType,
    color: string
}[]>([
    {
        name: 'get',
        color: "get"

    },
    {
        name: "post",
        color: "post"
    },
    {
        name: "delete",
        color: "delete"
    },
    {
        name: "watchable",
        color: "watchable"
    }
])

// export const requests = reactive<mainRequestType[]>()
export const requests = useStorage<mainRequestType[]>("requests", [])
// export const currentRequestId = ref<string>("")
export const currentRequestId = useStorage<string>("currentRequestId", "")
export const currentRequestIndex = useStorage<number>("currentRequestIndex", 0)
export const currentRequest = computed(() => {
    return requests.value.find(req => req.id === currentRequestId.value) || null
})
export const useRequest = () => {
    const { createNewFolder, deleteNodeById, updateRequestTypeInfolder } = useFolder()
    const { addTabToRequestTabs, removeTabFromTabs,handleUpdateTabHeaderRequestType,handleUpdateCurrentInnerTab } = useRequestTabs()
    const router = useRouter()
    const currentRequestTest = ref<mainRequestType |null>(null)
    currentRequestTest.value = requests.value.find(req => req.id === currentRequestId.value) as mainRequestType
    function createNewRequest(name: string) {
        const reqInNewTab = newRequestsTabs[0]
        const reqCreated = createNewFolder(name, "request")
        addTabToRequestTabs(name, reqCreated.id)
        removeTabFromTabs(reqInNewTab.id, 'new')
        let reqToPush : mainRequestType = {
            project_id: "project-1-id",
            id: reqCreated.id,
            params: [
                {
                    key: "",
                    value: "",
                    description: "",
                    active: true
                }
            ],
            headers: [],
            body: [{
                key: "",
                value: "",
                active: true,
                file: false
            }],
            authorisation: {
                type: "bearer",
                token: "",
                isVariable: false
            },
            requestData: {
                type: "get",
                name: name,
                serviceName: "",
            },
            post:{
                bodyType: {
                    name: "Key-Value",
                    value: "key-value"
                },
                jsonData: {
                    text: ""
                }
            },
            responseData: {
                type: "json",
                data: null,
                loading: false
            },
            columns: [
                { key: "", active: true },
            ],
            nestedFunction: [],
        }
        requests.value.push(reqToPush)
        router.push({ query: { t: reqCreated.id } })
    }
    function createExistingRequest(name: string, req: mainRequestType) {
        console.log("create from existing",{req})
        addTabToRequestTabs(name, req.id)
        requests.value.push(req)
        router.push({ query: { t: req.id } })
    }
    function updateRequestType(reqId: string, type: requestType) {
        const req = requests.value.find(req => req.id === reqId)
        if (req) {
            if(type == "post" && currentTab.value?.current_req_tab_model == "columns"){
                handleUpdateCurrentInnerTab("params")
            }else if(type !== "post" && currentTab.value?.current_req_tab_model == "body"){
                handleUpdateCurrentInnerTab("columns")
            }
            req.requestData.type = type
        }
        handleUpdateTabHeaderRequestType(reqId,type)
        updateRequestTypeInfolder(reqId, type)
    }

    function deleteRequest(reqId: string) {
        console.log({reqId})
        const index = requests.value.findIndex(req => req.id === reqId)
        const requestInTabs = requestTabs.value.findIndex(tab => tab.id === reqId)
        requests.value.splice(index, 1)
        if (requestInTabs !== -1) {
            removeTabFromTabs(reqId, 'old')
        }
        deleteNodeById(reqId)
        
        if (requests.value.length === 0) {
            currentRequestId.value = ""
            return
        }
        currentRequestId.value = requests.value[index - 1].id || requests.value[requests.value.length - 1].id
    }
    function renameRequest(reqId: string, name: string) {
        const req = requests.value.find(req => req.id === reqId)
        if (req) {
            req.requestData.name = name
        }
    }


    return {
        createNewRequest,
        currentRequestTest,
        updateRequestType,
        deleteRequest,
        renameRequest,
        createExistingRequest
    }
}