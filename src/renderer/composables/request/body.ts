import { currentRequest } from "./useRequest"

export const createNewBodyValue = () => {
    if (currentRequest.value && !currentRequest.value.body) {
        currentRequest.value.body = [{ key: "", value: "", description: "", active: true, file: false }]
    }
    currentRequest.value?.body.push({ key: "", value: "", description: "", active: true, file: false })
}
export const handleDeleteBodyValue = (idx: number) => {
    if (currentRequest.value?.body.length && currentRequest.value?.body.length < 2) {
        currentRequest.value?.body.splice(idx, 1)
        createNewBodyValue()
        return
    }
    currentRequest.value?.body.splice(idx, 1)
}