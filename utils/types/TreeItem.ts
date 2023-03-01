import requestType from "./requestType"
type TreeItem = {
    project_id?: string,
    id?: string,
    name?: string,
    children?: TreeItem[],
    isFolderEmpty?: boolean,
    fileName?: string,
    parentFolderId?: string | null,
    type: "folder" | "request",
    req_type?: requestType ,
}
export default TreeItem