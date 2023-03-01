import requestType from "@/utils/types/requestType";
import { stringify, v4 as uuidv4 } from 'uuid'
import { useAppStore } from "~~/store/app"
import { useRequestStore } from "~~/store/request"
import TreeItem from "~~/utils/types/TreeItem";
import RequestTabheadeType  from "~~/utils/types/requestTabHeadertype";
import { useHandleFolder } from "./useHandleFolder";
export const useCreateNewRequest = () => {
    const storeData = useAppStore()
    const requestStore = useRequestStore()
    const { findFolderById } = useHandleFolder()
    const appData = reactive({
        currentTab: ""
    })

    const createNewRequest = (name: string, type: requestType, whereId: string) => {
        const requestId = uuidv4()
        let reqHeaderObj: RequestTabheadeType
        reqHeaderObj = {
            type: type,
            name: '',
            fileName: name,
            id: `new-${requestId}`,
        }
        requestStore.addToNewRequestHeaderTabs(reqHeaderObj)
        useRouter().push({ query: { t: `new-${requestId}` } })
        // console.log(requestStore.requestsHeaderTabs, requestStore.newRequestHeaderstab)

    }
    const addRequestTabHeader = (id: string) => {
        const requestFetchToAdd: TreeItem = findFolderById(id, storeData.computedAllFolders)
        if (requestFetchToAdd)
            if (!checkIfRequestheaderExist(id, requestStore.requestsHeaderTabs)) {
                requestStore.addToRequestHeaderTabs({
                    type: requestFetchToAdd.req_type ?? "get",
                    fileName: requestFetchToAdd.fileName ?? 'New Folder',
                    name: requestFetchToAdd.name ?? '',
                    id: requestFetchToAdd.id ?? '',
                    current_req_tab_model: "params"
                })
                // console.log(requestStore.requestsHeaderTabs, requestStore.newRequestHeaderstab)
            }

    }
    const checkIfRequestheaderExist = (id: string, reqTabsArr: RequestTabheadeType[]) => {
        const request = reqTabsArr.find((req) => req.id === id)
        if (request) {
            return true
        } else {
            return false
        }
    }
    return { createNewRequest, addRequestTabHeader }
}