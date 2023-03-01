// import Graph from "../libs/avanda";
import { Graph } from "@avanda/avandajs";
import { useRequestStore } from "~~/store/request";
import { useAppStore } from "~~/store/app";
import { mainRequestType } from "~~/utils/types/mainRequestType";
import { useAlert } from "./useToast";
import { nestedFunctionType } from "~~/utils/types/nestedFunctionType";
import axios from "axios";
export const useMakerequest = () => {
    const requestStore = useRequestStore()
    const storeData = useAppStore()
    const setRequestConfig = (config: any) => {
        Graph.setRequestConfig({
            baseURL: config.baseurl,
            withCredentials: true,
        })
        
        // console.log(Graph)
    }
    const testGetRequest = async (service: string, requestId: string) => {
        let req = new Graph().service(service)
        let reqData = await req.get()
        requestStore.findRequestById(requestId, (data: mainRequestType) => {
            data.responseData.data = reqData
            // console.log(reqData)

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
            // console.log(req)

        })
        return req

    }
    const validateService = (service: string) => {
        // create regex to validate service
        // a pattern that follows this string "Controller/Function"
        if(storeData.projectDetails?.baseurl.trim() === ""){
            useAlert().openAlert({ type: 'ERROR', msg: `Error: Set your BASEURL in Settings` })
            return 
        }
        let regex = new RegExp("^[a-zA-Z]+/[a-zA-Z]+$")

        if (service.trim() === "") {
            useAlert().openAlert({ type: 'ERROR', msg: `Error: Specify a Service` })
            return false
        } else if (!regex.test(service)) {
            useAlert().openAlert({ type: 'ERROR', msg: `Error: Invalid Service` })
            return false
        }
        return true
    }
    
    const makeMainGetRequest = async (requestId: string, service: string, requestObj: mainRequestType) => {

        try {
            // let currentRequesttab = requestStore.computedCurrentMainRequest
            let currentRequesttab = requestObj
            let filteredParams = filterToKeyValue(currentRequesttab?.params ?? [])
            let filteredColumns = filterColumns(currentRequesttab?.columns ?? [])
            // console.log(Object.assign({}, ...filteredParams) ?? {}, "function", currentRequesttab?.nestedFunction)
            let req = new Graph().service(service)
            // console.log("request befire func", {req})

            function handleInnerNested (el: nestedFunctionType[], req: any, initialColumns: any) {
                if (el) {
                    // console.log(el, "el", req, "req", initialColumns, "initialColumns")
                    for (let j = 0; j < el.length; j++) {
                        let innerEl = el[j]
                        if (j === 0) {
                            req = req.fetch(...filterColumns(initialColumns), new Graph().service(innerEl.service).fetch(...filterColumns(innerEl.columns)).as(innerEl.name))
                        } else {
                            req = req.fetch(new Graph().service(el[j].service).fetch(...filterColumns(innerEl.columns)).as(el[j].name))
                        }
                        if(innerEl.nestedFunction){
                            req = handleInnerNested(innerEl.nestedFunction, req, innerEl.columns)
                        }
                    }

                }
                return req
            }
            // let req = new Graph().service(service).fetch(...filteredColumns).params(Object.assign({}, ...filteredParams) ?? {})
            if (currentRequesttab && currentRequesttab.nestedFunction) {
                // for (let i = 0; i < currentRequesttab?.nestedFunction.length; i++) {
                //     const element = currentRequesttab?.nestedFunction[i];
                //     if(i === 0){
                //         req = req.fetch(...filteredColumns, new Graph().service(currentRequesttab?.nestedFunction[i].service).fetch(...filterColumns(element.columns)).as(currentRequesttab?.nestedFunction[i].name))
                //     }
                //     else{
                //     // req = req.fetch(...filterColumns(currentRequesttab?.nestedFunction[i-1].columns), new Graph().service(element.service).as(element.name))
                //         req = req.fetch(...filterColumns(currentRequesttab?.nestedFunction[i-1].columns), new Graph().service(element.service).fetch(...filterColumns(element.columns)).as(element.name))
                //     }
                //     if(element.nestedFunction){
                //         req = handleInnerNested(element.nestedFunction, req, element.columns)
                //     }
                //     console.log(element, "element", req)
                //     console.log("i", i, req)
                // }
                // console.log("request befire func", {req})
                req = handleInnerNested(currentRequesttab?.nestedFunction, req, currentRequesttab?.columns)
                req = req.params(Object.assign({}, ...filteredParams) ?? {})    
                // console.log(req, "test nested function")
            }else{
                req = req.fetch(...filteredColumns).params(Object.assign({}, ...filteredParams) ?? {})
            }
            let reqData: any = await req.get()
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = reqData
                // console.log(reqData)

            })
            return reqData
        } catch (error) {

            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = error
                // console.log(error)
            })
        } finally {
            requestObj.responseData.loading = false
        }
    }
    const makemainPostRequest = async (requestId: string, service: string, requestObj: mainRequestType) => {
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
            let reqData = await (await req)
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = reqData
                // console.log(reqData)

            })
            return reqData
        } catch (error) {
            requestStore.findRequestById(requestId, (data: mainRequestType) => {
                data.responseData.data = error
                // console.log(error)

            })
        } finally {
            requestObj.responseData.loading = false

        }
    }
    const chooseFunctionToRun = (requestId: string, service: string, type: string) => {
        // console.log("chooseFunctionToRun", requestId, service, type)
        if (!validateService(service)) {
            return
        }
        requestStore.findRequestById(requestId, (data: mainRequestType) => {
            data.responseData.data = null
            if (data.responseData.loading) return;
            data.responseData.loading = true;
            if (type === "get") {
                makeMainGetRequest(requestId, service, data)
            } else if (type === "post") {
                makemainPostRequest(requestId, service, data)
            }
        })
    }
    const handleNestedFunction = (nestedObj: nestedFunctionType) => {
        // console.log({ nestedObj })

    }
    const filterToKeyValue = (array: any[]) => {
        return array.filter(eachParam => eachParam.key.trim() !== "" && eachParam.value.trim() !== "" && eachParam.active).map(eachParam => {
            return {
                [eachParam.key]: eachParam.value
            }
        })
    }
    const filterColumns = (arr: { key: string, active: boolean }[]) => {
        return arr.filter(eachColumn => eachColumn.key.trim() !== "" && eachColumn.active).map(eachColumn => {
            return eachColumn.key
        })
    }
    return {
        setRequestConfig,
        testGetRequest,
        testGetNestedRequestFunction,
        makeMainGetRequest,
        chooseFunctionToRun,
    }
}