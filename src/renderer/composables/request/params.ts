import { currentRequest } from "./useRequest"

export const createNewParam = () => {
    currentRequest.value?.params.push({ key: "", value: "", description: "", active: true })
}
export const handleDeleteParam = (idx: number) => {
    if (currentRequest.value?.params.length && currentRequest.value?.params.length < 2) {
        currentRequest.value?.params.splice(idx, 1)
        createNewParam()
        return
    }
    currentRequest.value?.params.splice(idx, 1)
}