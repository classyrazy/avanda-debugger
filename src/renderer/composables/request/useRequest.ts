import { Ref, computed, onMounted, reactive, ref } from "vue"
import { mainRequestType } from "../../types/mainRequestType"
import { useFolder } from "../useFolder"
import { useRequestTabs, newRequestsTabs, currentTab } from "./useRequestTabs"
import { useRoute, useRouter } from "vue-router"
import requestType from "../../types/requestType"

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


export const requests = reactive<mainRequestType[]>([
    {
        project_id: "project-1-id",
        id: "jikfkf",
        params: [
            {
                key: "username",
                value: "classyrazy",
                description: "username param of the user",
                active: true
            }
        ],
        headers: [
            {
                key: "Content-Type",
                value: "application/json",
                description: "content type of the request",
                active: true
            }
        ],
        body: [
            {
                key: "username",
                value: "classyrazy",
                description: "This is the username of the user",
                active: true,
                file: false
            },
            {
                key: "profile_picture",
                value: "",
                description: "This is the profile picture of the user",
                active: false,
                file: true,
                fileName: "profile_picture.png"
            }
        ],
        authorisation: {
            type: "bearer",
        },
        requestData: {
            type: "get",
            name: "request-1",
            serviceName: "",
        },
        responseData: {
            type: "json",
            data: {
                test: "hbsfkjbsugfkjbs"
            },
            loading: false
        },
        columns: [
            { key: "username", active: true },
            { key: "id", active: true },
        ],
        nestedFunction: null
    },
])
export const currentRequestId = computed(() => {
    return useRoute().query.t as string
})
export const currentRequest = computed(() => {
    return requests.find(req => req.id === currentRequestId.value) || null
})
export const useRequest = () => {
    const { createNewFolder } = useFolder()
    const { addTabToRequestTabs, removeTabFromTabs,handleUpdateTabHeaderRequestType,handleUpdateCurrentInnerTab } = useRequestTabs()
    const router = useRouter()
    const currentRequestTest = ref<mainRequestType |null>(null)

    currentRequestTest.value = requests.find(req => req.id === currentRequestId.value) as mainRequestType

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
                description: "",
                active: true,
                file: false
            }],
            authorisation: {
                type: "bearer"
            },
            requestData: {
                type: "get",
                name: name,
                serviceName: "",
            },
            responseData: {
                type: "json",
                data: null,
                loading: false
            },
            columns: [
                { key: "", active: true },
            ],
            nestedFunction: null
        }
        requests.push(reqToPush)
        router.push({ query: { t: reqCreated.id } })
    }
    
    function createNewColumn(reqId: string) {
        if(!reqId) return
        const req = requests.find(req => req.id === reqId)
        if (req) {
            req.columns.push({ key: "", active: true })
        }
        console.log({reqId} ,"creating new column", req)
    }
    function createNewParam(reqId: string) {
        if(!reqId) return
        const req = requests.find(req => req.id === reqId)
        if (req) {
            req.params.push({ key: "", value: "", description: "", active: true })
        }
    }
    function updateRequestType(reqId: string, type: requestType) {
        const req = requests.find(req => req.id === reqId)
        if (req) {
            if(type == "post" && currentTab.value?.current_req_tab_model == "columns"){
                handleUpdateCurrentInnerTab("params")
            }else if(type !== "post" && currentTab.value?.current_req_tab_model == "body"){
                handleUpdateCurrentInnerTab("columns")
            }
            req.requestData.type = type
        }
        handleUpdateTabHeaderRequestType(reqId,type)
    }


    return {
        createNewRequest,
        createNewColumn,
        currentRequestTest,
        createNewParam,
        updateRequestType
    }
}