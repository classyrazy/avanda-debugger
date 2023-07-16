type nestedFunctionType = {
    id: string,
    name: string,
    service: string,
    params: {
        key: string,
        value: string,
        active: boolean
    }[],
    columns: {
        key: string,
        active: boolean
    }[],
    nestedFunction: nestedFunctionType[] | null
}

export{
    nestedFunctionType
}