import { reactive } from "vue"
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "../types/fileStruct"
import TreeItem from "../types/TreeItem"

export const allFolders = reactive<TreeItem[]>([])
export const folderOptions = reactive([
    {
        label: "New Request"
    },
    {
        label: "New Folder"
    },
    {
        label: "Rename"
    },
    {
        label: "Delete"
    },
])

export const requestOptions = reactive([
    {
        label: "New Nested Function"
    },
    {
        label: "Rename"
    }
])
export const useFolder = () => {

    const createNewFolderOrRequest = (name: string, type: fileStruct) => {
        const folderOrRequestId = uuidv4()
        let objTopush : TreeItem
        if (type === "folder") {
            objTopush = {
                project_id: "test-project-id",
                id: folderOrRequestId,
                name: name,
                children: [],
                isFolderEmpty: true,
                parentFolderId: "test-parent-folder-id",
                type: "folder"
            }
            allFolders.push(objTopush)
            console.log("Creating new folder", {allFolders})
        } else {
            console.log("Creating new request")
        }
    }

    return{
        createNewFolderOrRequest
    }

}