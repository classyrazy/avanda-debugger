import { Column, mainRequestType, RequestData, Params, Param } from "../../types/mainRequestType"
import Graph from '../../libs/avanda'
import { currentRequest, requests } from "./useRequest"
import { useAlert } from "../core/useAlert"
import { nestedFunctionType } from "../../types/nestedFunctionType"
const {openAlert} = useAlert()
export const handleCallService = async (request: mainRequestType) => {
    let reqId = request.id
    const reqInDirectory = requests.value.find(req => req.id === reqId)
    const reqString = ''
    if (!reqInDirectory){
        openAlert({
            type: 'ERROR',
            msg: 'Request not found'
        })
        return
    }
    reqInDirectory.responseData.loading = true
    let data = {} as any
    switch (request.requestData.type) {
        case "get":
            data = await useGetRequest({
                requestFromHandler: request.requestData,
                paramsFromHamndler: request.params,
                columnsFromHandler: request.columns,
                nestedReqFromHandler: request.nestedFunction
            })
        default:
    }
    if (reqInDirectory) {
        reqInDirectory.responseData.data = data
        reqInDirectory.responseData.loading = false
    }
    console.log('data', requests.value)
}
const stringifyGraphRequest = (graph: any, indent = 0): string => {
    // Get service name
    let result = `${" ".repeat(indent)}new Graph().service("${graph.serviceName}")`;
    console.log('graph', graph)
    // Add fetch columns or "*"
    const columnsOrDefault = graph.fetchFields.filter((field: any) => typeof field === "string").join(", ") || "*";
    result += `.fetch(${columnsOrDefault}`;

    // Add nested Graph requests
    graph.fetchFields.forEach((field: any) => {
        if (typeof field.graph !== "undefined") {
            // Recursively convert nested Graph requests to strings
            const nestedGraphStr = stringifyGraphRequest(field.graph, indent + 2);
            result += `, ${field.alias ? nestedGraphStr + `.as("${field.alias}")` : nestedGraphStr}`;
        }
    });

    result += `)`;

    // Add parameters if available
    if (Object.keys(graph.parameters).length > 0) {
        const paramsStr = JSON.stringify(graph.parameters, null, indent + 2);
        result += `.params(${paramsStr})`;
    }

    return result;
};
export const useGetRequest = async (reqInstance: { 
    requestFromHandler: RequestData, 
    paramsFromHamndler?: Param[], 
    columnsFromHandler?: Column[], 
    nestedReqFromHandler?: nestedFunctionType[] 
}) => {
    console.log('requestFromHandler', reqInstance);

    // Initialize the main Graph instance with service name and columns
    console.log('columns', {test: buildColumnString(reqInstance.columnsFromHandler || [])})
    const req = new Graph()
        .service(reqInstance.requestFromHandler?.serviceName || '')
        .fetch(...buildColumnString(reqInstance.columnsFromHandler || []) || '*');
        console.log('serviceColumns', reqInstance.columnsFromHandler)

    // Build the parameters object and attach if available
    const paramsAvailable = buildParamObject(reqInstance.paramsFromHamndler || []);
    if (paramsAvailable) {
        req.params(paramsAvailable);
    }

    console.log('req before', req);

    // Function to recursively build nested requests
    const buildNestedRequest = (nestedRequests: nestedFunctionType[]): any[] => {
        return nestedRequests.map(nestedReq => {
            // Create the nested Graph instance
            const nestedGraph = new Graph()
                .service(nestedReq.service)
                .fetch(...buildColumnString(nestedReq.columns || []) || '*'); // Add columns or "*"

            // Add parameters to the nested graph if available
            const nestedParams = buildParamObject(nestedReq.params || []);
            if (nestedParams) {
                nestedGraph.params(nestedParams);
            }

            // If there are further nested requests, build them recursively
            if (nestedReq.nestedFunction && nestedReq.nestedFunction.length > 0) {
                const nestedFetch = buildNestedRequest(nestedReq.nestedFunction);
                // Include columns or "*" along with nested functions in the fetch call
                nestedGraph.fetch(...buildColumnString(nestedReq.columns || []) || "*", ...nestedFetch);
            }

            // Attach an alias if it exists
            return nestedReq.name ? nestedGraph.as(nestedReq.name) : nestedGraph;
        });
    };

    // If there are nested requests, handle them
    if (reqInstance.nestedReqFromHandler && reqInstance.nestedReqFromHandler.length > 0) {
        const nestedRequests = buildNestedRequest(reqInstance.nestedReqFromHandler);
        console.log('nestedRequests', nestedRequests);
        req.fetch(...buildColumnString(reqInstance.columnsFromHandler || []) || '*', ...nestedRequests);
        const graphStringRepresentation = stringifyGraphRequest(await req.get());
        console.log('graphStringRepresentation', graphStringRepresentation);
        console.log('req after', req);
    }

    // Execute the request
    const res = await req.get();
    return res;
};

export const buildColumnString = (columns: Column[]) => {
    let columnString = [] as string | string[]
    if(columns.length > 0) {
        for (let column of columns) {
            if (column.key.trim() !== '' && column.active) {
                // if (columnString !== '') {
                //     columnString += ',';
                // }
                // columnString += column.key;
                if (typeof columnString !== 'string') {
                    columnString.push(column.key)
                }
            }
        }
    }else {
        columnString = '*'
    }
    console.log('columnString', {columnString})
    return columnString
}
export const buildParamObject = (params: Params[]) => {
    if (params.length === 0) return null
    const paramsAVailable = []
        for (let param of params) {
            if (param.key.trim() !== '' && param.active) {
                paramsAVailable.push({
                    [param.key]: param.value
                })
            }
        }
    return Object.assign({}, ...paramsAVailable)
}