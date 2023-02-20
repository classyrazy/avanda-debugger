// import Graph from "../libs/avanda";
import { Graph } from "@avanda/avandajs";
import { useRequestStore } from "~~/store/request";
import { mainRequestType } from "~~/utils/types/mainRequestType";

export const useMakerequest = () => {
    const requestStore = useRequestStore()
    const setRequestConfig = (config: any) => {
        Graph.setRequestConfig({
            baseURL: config.baseurl,
            withCredentials: true,
        })
        console.log(Graph)
    }
    const testGetRequest = async (service: string, requestId: string) => {
        let req = new Graph().service(service)
        let reqData = await req.get()
        requestStore.findRequestById(requestId, (data: mainRequestType) => {
            data.responseData.data = reqData
            console.log(reqData)

        })
        return reqData

    }
    const testGetNestedRequestFunction = async (service: string, requestId: string) => {
        if (!validateService(service)) return

        let req = await new Graph().service(service).fetch(
            "username", "uuid",
            new Graph().service("Blog/getUserBlog").as("blog")
        ).get()

        requestStore.findRequestById(requestId, (data: mainRequestType) => {
            data.responseData.data = req
            console.log(req)

        })
        return req

    }
    const validateService = (service: string) => {
        // create regex to validate service
        // a pattern that follows this string "Controller/Function"
        let regex = new RegExp("^[a-zA-Z]+/[a-zA-Z]+$")

        if (service.trim() === "") {
            return false
        } else if (!regex.test(service)) {
            return false
        }
        return true
    }
    const makeMainGetRequest = async (requestId: string, service: string) => {
        if (!validateService(service)) return
        try {
            let currentRequesttab = requestStore.computedCurrentMainRequest
            let filteredParams = currentRequesttab?.params.filter(eachParam => eachParam.key.trim() !== "" && eachParam.active).map(eachParam => {
                return {
                    [eachParam.key]: eachParam.value
                }
            })
            let filteredColumns = currentRequesttab?.columns.filter(eachColumn => eachColumn.key.trim() !== "" && eachColumn.active).map(eachColumn => {
                return eachColumn.key
            })
            console.log(Object.assign({}, ...filteredParams) ?? {}, filteredColumns.join(", "))

            let req = new Graph().service(service).fetch(...filteredColumns).params(Object.assign({}, ...filteredParams) ?? {})
            let reqData = await req.get()
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = reqData
                console.log(reqData)

            })
            return reqData
        } catch (error) {

            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = error
                console.log(error)

            })
        }
    }
    const makemainPostRequest = async (requestId: string, service: string) => {
        if (!validateService(service)) return
        try {

            let currentRequestTab = requestStore.computedCurrentMainRequest
            let filteredParams = currentRequestTab?.params.filter(eachParam => eachParam.key.trim() !== "" && eachParam.active).map(eachParam => {
                return {
                    [eachParam.key]: eachParam.value
                }
            })
            let filteredColumns = currentRequestTab?.columns.filter(eachColumn => eachColumn.key.trim() !== "" && eachColumn.active).map(eachColumn => {
                return eachColumn.key
            })
            let filteredBody = currentRequestTab?.body.filter(eachBody => eachBody.key.trim() !== "" && eachBody.active).map(eachBody => {
                return {
                    [eachBody.key]: eachBody.value
                }
            })
            let req = new Graph().service(service).fetch(...filteredColumns).params(Object.assign({}, ...filteredParams) ?? {}).post(Object.assign({}, ...filteredBody) ?? {})
            let reqData = await (await req).getData()
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = reqData
                console.log(reqData)

            })
            return reqData
        } catch (error) {
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = error
                console.log(error)

            })
        }
    }
    const chooseFunctionToRun = (requestId: string, service: string, type: string) => {
        console.log("chooseFunctionToRun", requestId, service, type)
        if (type === "get") {
            makeMainGetRequest(requestId, service)
        } else if (type === "post") {
            makemainPostRequest(requestId, service)
        }
    }
    return {
        setRequestConfig,
        testGetRequest,
        testGetNestedRequestFunction,
        makeMainGetRequest,
        chooseFunctionToRun
    }
}