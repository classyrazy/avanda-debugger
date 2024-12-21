import requestType from "./requestType";
import { nestedFunctionType } from "./nestedFunctionType";

export interface Param {
    key: string;
    value: string;
    description: string;
    active: boolean;
}

interface Header {
    key: string;
    value: string;
    description: string;
    active: boolean;
}

export interface Body {
    key: string;
    value: string | File;
    active: boolean;
    file?: boolean;
    fileName?: string;
}

interface Authorisation {
    type: string;
    token: string | { key: string};
    isVariable?: boolean;
}

export interface Column {
    key: string;
    active: boolean;
}

export interface RequestData {
    type: requestType;
    name: string;
    serviceName: string;
}

interface ResponseData {
    type: string;
    data: any;
    loading: boolean;
}

type mainRequestType = {
    project_id: string;
    id: string;
    params: Param[];
    headers: Header[];
    body: Body[];
    post: {
        bodyType: {
            name: string;
            value: string;
        };
        jsonData: {
            text: ""
        };
    }
    authorisation: Authorisation;
    columns: Column[];
    requestData: RequestData;
    responseData: ResponseData;
    nestedFunction: nestedFunctionType[];
    snippet: string | null;
};

export {
    mainRequestType
};