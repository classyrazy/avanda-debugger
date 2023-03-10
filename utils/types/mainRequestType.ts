import requestType from "./requestType"
import { nestedFunctionType } from "./nestedFunctionType"
type mainRequestType = {
    project_id: string,
    id: string,
    params: {
        key: string,
        value: string,
        description: string,
        active: boolean,
    }[],
    headers: {
        key: string,
        value: string,
        description: string,
        active: boolean 
    }[],
    body: {
        key: string,
        value: string | File,
        description: string,
        active: boolean,
        file: boolean,
        fileName?: string
    }[],
    authorisation:{
        type: string,
    },
    columns:{key: string, active: boolean}[],
    requestData: {
        type: requestType
        name: string,
        serviceName: string,
    },
    responseData:{
        type: string,
        data: any,
        loading:boolean 
    },
    nestedFunction: nestedFunctionType[] | null
}

export{
    mainRequestType
}