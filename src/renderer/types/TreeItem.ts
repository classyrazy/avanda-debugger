import requestType from "./requestType"
import { fileStruct } from "./fileStruct"
type TreeItem = {
    project_id: string,
    id: string,
    name: string,
    children?: TreeItem[],
    isFolderEmpty?: boolean,
    parentFolderId?: string | null,
    type: fileStruct,
    req_type?: requestType ,
}
export default TreeItem