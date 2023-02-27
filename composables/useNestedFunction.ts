import {useRequestStore} from "~~/store/request"
import { nestedFunctionType } from "~~/utils/types/nestedFunctionType";
import { v4 as uuidv4 } from 'uuid'

export const useNestedFunction = () => {
    const requestStore = useRequestStore()
    const findNestedById = (id: string, arr: nestedFunctionType[] | null): any | null => {
        if(!arr) return null
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
            if (arr[i].nestedFunction) {
                let res = findNestedById(id, arr[i].nestedFunction);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    }
    const editNestedFunction = (nestedFunctionId:string, editKey: string, value: string | object) => {
        const requestToEdit = findNestedById(nestedFunctionId, requestStore.computedCurrentMainRequest?.nestedFunction  ?? null)
        if(requestToEdit){
            requestToEdit[editKey] = value
            console.log("Request to edit", requestToEdit, requestStore.computedCurrentMainRequest?.nestedFunction)
        }
    }
    const createNewNestedFunction = (nestedFunctionId: string|null) => {
        if(!requestStore.computedCurrentMainRequest) return
        if(nestedFunctionId){
            const requestToEdit = findNestedById(nestedFunctionId, requestStore.computedCurrentMainRequest?.nestedFunction  ?? null)
            if(requestToEdit){
                requestToEdit.nestedFunction.push({
                    id: uuidv4(),
                    name: "",
                    service: "",
                    params: [],
                    columns: [],
                    nestedFunction: []
                })
            }
        }else{
            if(!requestStore.computedCurrentMainRequest.nestedFunction) requestStore.computedCurrentMainRequest.nestedFunction = []
            requestStore.computedCurrentMainRequest.nestedFunction.push({
                id: uuidv4(),
                name: "",
                service: "",
                params: [],
                columns: [],
                nestedFunction: []
            })
        }
    }
    return {
        findNestedById,
        editNestedFunction,
        createNewNestedFunction
    }
}
