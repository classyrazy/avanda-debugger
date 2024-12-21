
export interface Environ {
    key: string;
    value: string;
}

type requestInnerTabs = "params" | "body" | "authorization" | "headers" | "response" | "test" | "history" | "nested Function" | "columns";
export interface ProjectDetailType {
    id: string,
    name: string,
    baseurl: string,
    description: string,
    environs: Environ[]
}
export  {
    requestInnerTabs
};