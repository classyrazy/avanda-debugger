import { computed, reactive, ref } from "vue"
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "../types/fileStruct"
import TreeItem from "../types/TreeItem"
import { useStorage } from "@vueuse/core"

// export const allFolders.value = reactive<TreeItem[]>([])
export const allFolders = useStorage<TreeItem[]>("allFolders.value", [])
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
export const currentFolderId = ref("")

export const useFolder = () => {

    const createNewFolder = (name: string, type: fileStruct) => {
        let objTopush: TreeItem
        const folderOrRequestId = uuidv4()
        if (type === "folder") {
            objTopush = {
                project_id: "test-project-id",
                id: folderOrRequestId,
                name: name,
                children: [],
                isFolderEmpty: true,
                parentFolderId: currentFolderId.value,
                type: "folder"
            }
            if (currentFolderId.value) {
                const parentFolder = findFolderById(currentFolderId.value, allFolders.value)
                if (parentFolder) {
                    parentFolder.children?.push(objTopush)
                    console.log("Creating new sub folder", { folders: allFolders.value })
                }
            } else {
                allFolders.value.push(objTopush)
                console.log("Creating new folder", { folders: allFolders.value })
            }
            handleUpdateCurrentFolderId(objTopush.id)
        } else {
            objTopush = {
                project_id: "test-project-id",
                id: folderOrRequestId,
                name: name,
                parentFolderId: currentFolderId.value,
                type: "request",
                req_type: "get"
            }
            if (currentFolderId.value) {
                const parentFolder = findFolderById(currentFolderId.value, allFolders.value)
                if (parentFolder) {
                    parentFolder.children?.push(objTopush)
                    console.log("Creating new sub request", {folders: allFolders.value })
                }
            } else {
                allFolders.value.push(objTopush)
                console.log("Creating new request", { folders: allFolders.value })
            }
        }
        return objTopush
    }
    const findFolderById = (id: string, arr: any[] | null): any | null => {
        // @ts-ignore
        for (let i = 0; i < arr.length; i++) {
            // @ts-ignore
            if (arr[i].id === id) {
                // @ts-ignore

                return arr[i];
            }
            // @ts-ignore

            if (arr[i].children) {
                // @ts-ignore

                let res = findFolderById(id, arr[i].children);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    }
    function generatePath(object: TreeItem | 'Root', folders: string[] = []) {
        if (object === 'Root') return 'Root'
        if (!object.parentFolderId) {
            folders.unshift(object.name);
            return folders.join("-->");
        }
        folders.unshift(object.name);
        const parent = findFolderById(object.parentFolderId, allFolders.value);
        // console.log({ parent })
        generatePath(parent, folders);
        // console.log(folders)
        return folders.join("-->");
    }
    const computedCurrentFolder = computed(() => {
        if (!currentFolderId.value) return "Root"
        const foundFolder = findFolderById(currentFolderId.value, allFolders.value)
        return foundFolder as TreeItem | 'Root'
    })
    function handleUpdateCurrentFolderId(id: string) {
        console.log("Updating current folder id", id)
        currentFolderId.value = id
    }

    return {
        createNewFolder,
        findFolderById,
        generatePath,
        handleUpdateCurrentFolderId,
        computedCurrentFolder
    }

}