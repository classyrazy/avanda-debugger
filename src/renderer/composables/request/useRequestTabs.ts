import { reactive } from "vue"
import RequestTabType from "../../types/requestTab"


export const requestTabs = reactive<RequestTabType[]>([
    {
        type: "get",
        name: "test",
        id: "517bd9d1-e8a8-4e8e-9804-76d228a6d0ba",
        current_req_tab_model: "params"
    },
    {
        type: "get",
        name: "test",
        id: "db150939-7c44-41d0-9c6c-9d8d1f653f74",
        current_req_tab_model: "params"
    }

])
export const newRequestsTabs = reactive<RequestTabType[]>([
    {
        type: "get",
        name: "",
        id: "new-cf0f6d00-f8bd-4ab8-8b80-865a14cafba2"
    }
])
export const useRequestTabs = () => {

}