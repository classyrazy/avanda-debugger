import { defineStore } from "pinia";
import { useHandleFolder } from "~~/composables/useHandleFolder"
import TreeItem from '~~/utils/types/TreeItem';
import RequestTabheadeType  from "~~/utils/types/requestTabHeadertype";
import { requestInnerTabs } from "~~/utils/types/appStyleTypes";
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "~~/utils/types/fileStruct";
import requestType from "@/utils/types/requestType";


const store = () => {
   
    const requestsHeaderTabs = reactive<RequestTabheadeType[]>([
        {
            type: "get",
            fileName: "request-1",
            name: '',
            id: "jikfkf",
            current_req_tab_model: "authorization"
        },
        {
            type: "post",
            fileName: "request-2",
            name: '',
            id: "jikffhjdkfbjdfdbkf",
            current_req_tab_model: "body"
        },

    ]);
    const requests = reactive
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
    const changeCurrentRequestTabModel = (tab:requestInnerTabs, requestId: string = currentRequestheaderId.value ) => {
        const request = requestsHeaderTabs.find((request) => request.id === requestId)
        if (request) {
            request.current_req_tab_model = tab
        }
    }
    return{
        requestsHeaderTabs,
        newRequestHeaderstab,
        addToRequestHeaderTabs,
        addToNewRequestHeaderTabs,
        removeRequestFromHeaderTabs,
        currentRequestheaderId,
        setcurrentRequestheaderId,
        removeRequestFromNewHeaderTabs,
        computedCurrentRequestHeader,
        changeCurrentRequestTabModel
    }
}

export const useRequestStore = defineStore("request", store)


