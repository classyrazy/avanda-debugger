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
                }
            }
        },
        {
            id: "yo",
            params: [
                {
                    key: "yo-usernanr",
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
                    key: "yo-test",
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
                type: "post",
                name: "request-yo",
                serviceName: "",
            },
            responseData: {
                type: "json",
                data: {
                    test: "hbsfkjbsugfkjbs"
                }
            }
        },
    ])
    const newRequestHeaderstab = reactive<RequestTabheadeType[]>([])
    const currentRequestheaderId = ref('')
    const setcurrentRequestheaderId = (id: string) => {
        currentRequestheaderId.value = id
    }
    const computedCurrentRequestHeader = computed(() => {
        return requestsHeaderTabs.find((request) => request.id === currentRequestheaderId.value)
    })
    const addToRequestHeaderTabs = (request: RequestTabheadeType) => {
        requestsHeaderTabs.push(request)
    }
    const addToNewRequestHeaderTabs = (request: RequestTabheadeType) => {
        newRequestHeaderstab.push(request)

    }
    const removeRequestFromHeaderTabs = (requestId: string) => {
        const index = requestsHeaderTabs.findIndex((request) => request.id === requestId)
        requestsHeaderTabs.splice(index, 1)
    }
    const removeRequestFromNewHeaderTabs = (requestId: string) => {
        const index = newRequestHeaderstab.findIndex((request) => request.id === requestId)
        newRequestHeaderstab.splice(index, 1)
    }
    const changeCurrentRequestTabModel = (tab: requestInnerTabs, requestId: string = currentRequestheaderId.value) => {
        const request = requestsHeaderTabs.find((request) => request.id === requestId)
        if (request) {
            request.current_req_tab_model = tab
        }
    }
    const computedCurrentMainRequest = computed(() => {
        return requests.find((request) => request.id === currentRequestheaderId.value)
    })
    const changeRequestTypeOnHeader = (requestToChangeTo : requestType) => {
        const request = computedCurrentRequestHeader.value
        if (request) {
            request.type = requestToChangeTo
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
        changeRequestTypeOnHeader
    }
}

export const useRequestStore = defineStore("request", store)


