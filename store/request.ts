import { defineStore } from "pinia";
import { useHandleFolder } from "~~/composables/useHandleFolder"
import TreeItem from '~~/utils/types/TreeItem';
import RequestTabheadeType from "~~/utils/types/requestTabHeadertype";
import { requestInnerTabs } from "~~/utils/types/appStyleTypes";
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "~~/utils/types/fileStruct";
import requestType from "@/utils/types/requestType";
import { mainRequestType } from "~~/utils/types/mainRequestType";

const store = () => {
    const requestTypeAvailable = reactive<{ name: requestType, color: string }[]>([
        {
            name: "get",
            color: 'get'
        },
        {
            name: "post",
            color: 'post'
        },
    ])
    const requestsHeaderTabs = reactive<RequestTabheadeType[]>([
    ]);
    const requests = reactive<mainRequestType[]>([
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
    const newRequestHeaderstab = reactive<RequestTabheadeType[]>([])
    const currentRequestheaderId = ref('')
    function setcurrentRequestheaderId(id: string) {
        if (!id) {
            useRouter().push('/')
        }
        currentRequestheaderId.value = id
    }
    const computedCurrentRequestHeader = computed(() => {
        return requestsHeaderTabs.find((request) => request.id === currentRequestheaderId.value)
    })
    function addToRequestHeaderTabs(request: RequestTabheadeType) {
        requestsHeaderTabs.push(request)
    }
    function addToNewRequestHeaderTabs(request: RequestTabheadeType) {
        newRequestHeaderstab.push(request)

    }
    function createNewRequest(requestHeader: TreeItem, currentProjectId: string) {
        const request = requests.find((request) => request.id === requestHeader.id)
        if (request) {
            return
        } else {
            requests.push({
                project_id: currentProjectId,
                id: requestHeader.id ?? uuidv4(),
                params: [],
                headers: [],
                body: [],
                authorisation: {
                    type: "bearer",
                },
                requestData: {
                    type: requestHeader.req_type ?? "get",
                    name: requestHeader.fileName ?? '',
                    serviceName: "",
                },
                responseData: {
                    type: "json",
                    loading: false,
                    data: null
                },
                columns: [],
                nestedFunction: null
            })
        }
    }
    function removeRequestFromHeaderTabs(requestId: string) {
        const index = requestsHeaderTabs.findIndex((request) => request.id === requestId)
        requestsHeaderTabs.splice(index, 1)
        if (index - 1 >= 0) {
            setcurrentRequestheaderId(requestsHeaderTabs[index - 1].id)
        } else {
            setcurrentRequestheaderId('')
        }
    }
    function removeRequestFromNewHeaderTabs(requestId: string) {
        const index = newRequestHeaderstab.findIndex((request) => request.id === requestId)
        newRequestHeaderstab.splice(index, 1)
        if (index) {
            if (requestsHeaderTabs.length > 0) {
                setcurrentRequestheaderId(requestsHeaderTabs[requestsHeaderTabs.length - 1].id)
            } else {
                setcurrentRequestheaderId('')
            }
        }
    }
    function changeCurrentRequestTabModel(tab: requestInnerTabs, requestId: string = currentRequestheaderId.value) {
        const request = requestsHeaderTabs.find((request) => request.id === requestId)
        if (request) {
            request.current_req_tab_model = tab
        }
    }
    const computedCurrentMainRequest = computed(() => {
        return requests.find((request) => request.id === currentRequestheaderId.value)
    })
    function changeRequestTypeOnHeader(requestToChangeTo: requestType) {
        const request = computedCurrentRequestHeader.value
        if (request) {
            request.type = requestToChangeTo
        }
    }
    function findRequestById(id: string, cb: Function) {
        let request = requests.find((request) => request.id === id)
        if (request) {
            cb(request)
        }
    }
    function createNewNestedFunction(requestId: string, nestedFunctionId: string | null = null) {
        const request = requests.find((request) => request.id === requestId)
        if (request) {
            const nestedFunction = {
                id: uuidv4(),
                name: "",
                service: "",
                params: [],
                columns: [],
                nestedFunction: []
            }
            if (nestedFunctionId) {
                const nestedFunction = request.nestedFunction?.find((nestedFunction) => nestedFunction.id === nestedFunctionId)
                if (nestedFunction) {
                    nestedFunction.nestedFunction?.push(nestedFunction)
                }
            } else {
                request.nestedFunction?.push(nestedFunction)
            }
        }
    }
    return {
        requestsHeaderTabs,
        newRequestHeaderstab,
        addToRequestHeaderTabs,
        addToNewRequestHeaderTabs,
        removeRequestFromHeaderTabs,
        currentRequestheaderId,
        setcurrentRequestheaderId,
        removeRequestFromNewHeaderTabs,
        computedCurrentRequestHeader,
        changeCurrentRequestTabModel,
        requests,
        computedCurrentMainRequest,
        requestTypeAvailable,
        changeRequestTypeOnHeader,
        findRequestById,
        createNewNestedFunction,
        createNewRequest
    }
}

export const useRequestStore = defineStore("request", store, {persist:true})


