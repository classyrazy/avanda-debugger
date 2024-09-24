import { currentRequest } from "./useRequest"

export const createNewColumn = () => {
    currentRequest.value?.columns.push({ key: "", active: true })
}
export const handleDeleteColumns = (idx: number) =>{
    if (currentRequest.value?.columns.length && currentRequest.value?.columns.length < 2) {
        currentRequest.value?.columns.splice(idx, 1)
        createNewColumn()
        return
    }
    currentRequest.value?.columns.splice(idx, 1)
}