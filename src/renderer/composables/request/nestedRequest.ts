import { nestedFunctionType } from "../../types/nestedFunctionType";
import { currentRequest, requests } from "./useRequest"
import { v4 as uuidv4 } from 'uuid'

export const findNestedById = (id: string, arr: nestedFunctionType[] | null): any | null => {
    if (!arr) return null
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

export const findParentNestedById = (id: string, arr: nestedFunctionType[] | null): any | null => {
    if (!arr) return null
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nestedFunction) {
            let res = findNestedById(id, arr[i].nestedFunction);
            if (res) {
                return arr[i];
            }
        }
    }
    return null;
}
function findImmediateParent(array: nestedFunctionType[], targetId: string, parent : nestedFunctionType | null = null) {
    for (const element of array) {
      // Check if the current element is the target
      if (element.id === targetId) {
        return parent; // Return the immediate parent
      }
      
      // If the element has a nested array, recursively search in it
      if (element.nestedFunction && element.nestedFunction.length > 0) {
        const foundParent = findImmediateParent(element.nestedFunction, targetId, element) as nestedFunctionType;
        if (foundParent) return foundParent;
      }
    }
    
    return null; // Return null if not found
  }

export const createNewNestedFunction = (id?: string) => {
    console.log('currentRequest.value', id)
    if (id) {
        const nestedReqFound = findNestedById(id, currentRequest.value?.nestedFunction ?? null)
        console.log('nestedReqFound', nestedReqFound)
        if (nestedReqFound) {
            if(!nestedReqFound.nestedFunction) nestedReqFound.nestedFunction = []
            nestedReqFound.nestedFunction?.push({ id: uuidv4(), name: "", service: "", params: [{ key: "", value: "", active: true }], columns: [{ key: "", active: true }], nestedFunction: null })
        }
        // currentRequest.value?.nestedFunction[index].nestedFunction?.push({ id: uuidv4(), name: "", service: "", params: [{ key: "", value: "", active: true }], columns: [{ key: "", active: true }], nestedFunction: null })
    } else {
        currentRequest.value?.nestedFunction?.push({ id: uuidv4(), name: "", service: "", params: [{ key: "", value: "", active: true }], columns: [{ key: "", active: true }], nestedFunction: null })
    }
    console.log('currentRequest.value', currentRequest.value)
}

export const deleteNestedFunction = (id: string) => {
    // currentRequest.value?.nestedFunction.splice(index, 1)
    if(!currentRequest.value) return
    const nestedReqFound = findNestedById(id, currentRequest.value?.nestedFunction ?? null)
    console.log('nestedReqFound', nestedReqFound)
    if (nestedReqFound) {
        // const parent = findParentNestedById(nestedReqFound.id, currentRequest.value?.nestedFunction ?? null)
        const parent = findParentNestedById(id, currentRequest.value?.nestedFunction ?? null)
        const immediateParent = findImmediateParent(currentRequest.value?.nestedFunction ?? [], id)
        console.log('parent', parent, "immediateParent", immediateParent)
        if (immediateParent) {
        //    parent.nestedFunction?.filter((nested: any) => nested.id !== id)
        immediateParent.nestedFunction = (immediateParent.nestedFunction ?? []).filter((nested: any) => nested.id !== id )
        } else {
            console.log("Runnong when parent is null", id, currentRequest.value?.nestedFunction)
            currentRequest.value.nestedFunction = currentRequest.value?.nestedFunction?.filter((nested: any) => nested.id !== id)
        }
    }
    console.log('currentRequest.value?.nestedFunction', currentRequest.value?.nestedFunction)
}