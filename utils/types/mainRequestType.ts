import requestType from "./requestType"
type mainRequestType = {
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
    requestData: {
        type: requestType
        name: string,
        functionName: string,
    },
    responseData:{
        type: string,
        data: any
    }
}

export{
    mainRequestType
}