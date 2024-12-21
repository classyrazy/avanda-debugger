import { computed, reactive, ref } from "vue"
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "../types/fileStruct"
import TreeItem from "../types/TreeItem"
import { useStorage } from "@vueuse/core"
import { newRequestsTabs, useRequestTabs } from "./request/useRequestTabs"
import { useRouter } from "vue-router"
import { requests, useRequest } from "./request/useRequest"

// export const allFolders.value = reactive<TreeItem[]>([])
export const allFolders = useStorage<TreeItem[]>("allFolders.value", [])
export const folderOptions = ref([
    {
        label: "New Request",
        value: "request"
    },
    {
        label: "New Folder",
        value: "folder"
    },
    // {
    //     label: "Copy",
    //     value: "copy"
    // },
    {
        label: "Paste",
        value: "paste"
    },
    {
        label: "Rename",
        value: "rename"
    },
    {
        label: "Delete",
        value: "delete",
        color: "red-500"
    },
])

export const requestOptions = ref([
    {
        label: "Copy",
        value: "copy",
    },
    {
        label: "Paste",
        value: "paste",
    },
    {
        label: "Rename",
        value: "rename",
    },
    {
        label: "Delete",
        value: "delete",
        color: "red-500"
    }
])

export const clipboard = ref<TreeItem | null>(null)
export const currentFolderId = ref("")

export const fileName = reactive({
    value: "",
    error: null as string | null,
})
export const displayCreateFolderInput = ref(false)
export const closeCreateInput = () => {
    displayCreateFolderInput.value = false
}
export const toggleOpenInput = () => {
    displayCreateFolderInput.value = !displayCreateFolderInput.value
}
export const handleFolderIconClick = (type: fileStruct) => {
    fileName.value = ""
    toggleOpenInput()
}
export const useFolder = () => {
    const router = useRouter()
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
                    console.log("Creating new sub request", { folders: allFolders.value })
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
    
    const deleteNodeById = (id: string) => {
    const {deleteRequest} = useRequest()
        const deleteFromFolders = (folders: any[]) => {
            for (let i = 0; i < folders.length; i++) {
                if (folders[i].id === id) {
                    for (const request of folders[i].children) {
                        console.log('request in deleted', request)
                        if(request.type === "request"){
                            deleteRequest(request.id)
                        }
                    }
                   folders.splice(i, 1);

                    // check if there is a request with inside the folder and delete it from the requests and requesttabs
                    // if(folders[i].type === "request"){
                    //     deleteRequest(folders[i].id)
                    // }
                    console.log("Deleted request", { folders: allFolders.value });
                    return true; // Return true to indicate the item was found and deleted
                } else if (folders[i].children?.length) {
                    if (deleteFromFolders(folders[i].children)) {
                        return true; // If the item was found and deleted in the children, return true
                    }
                }
            }
            return false; // Return false if the item was not found in the current level
        };

        console.log("Deleting request in folders", { folders: allFolders.value });
        deleteFromFolders(allFolders.value);
        handleUpdateCurrentFolderId("")
    };
    const copyItem = (id: string) => {
        const itemToCopy = findFolderById(id, allFolders.value)
        console.log("Copied item", itemToCopy)
        if (itemToCopy) {
            clipboard.value = { ...itemToCopy} // Create a deep copy with a new ID
        }
    }
    const pasteItem = (parentFolderId: string | null = currentFolderId.value) => {
    const {createExistingRequest} = useRequest()
        if (!clipboard.value) return

        const itemToPaste = { ...clipboard.value, id: uuidv4(), name: clipboard.value.name + "-Copy"} // Create a deep copy with a new ID
        if (parentFolderId) {
            const parentFolder = findFolderById(parentFolderId, allFolders.value)
            if (parentFolder) {
                parentFolder.children?.push(itemToPaste)
                console.log("Pasted item into sub folder", { folders: allFolders.value })
            }
        } else {
            allFolders.value.push(itemToPaste)
            console.log("Pasted item into root folder", { folders: allFolders.value })
        }
        if (clipboard.value.type === "request") {
            console.log("Pasting request", { clipboard: clipboard.value })
            const req = requests.value.find(req => req.id === clipboard.value?.id)
            console.log({req})
            if (!req) return
            const nReq = {...req, id: itemToPaste.id}
            createExistingRequest(clipboard.value.name + "-Copy", nReq)
            // const requestId = createNewRequestTab()
            // router.push({ query: { t: requestId } })

        }
        clipboard.value = null // Clear clipboard after pasting
    }
    const renameFolderOrRequest = (id: string, newName: string) => {
        const folderToRename = findFolderById(id, allFolders.value)
        if (folderToRename) {
            folderToRename.name = newName
        }
    }
    const updateRequestTypeInfolder = (id: string, type: string) => {
        const folderToRename = findFolderById(id, allFolders.value)
        if (folderToRename) {
            folderToRename.req_type = type
        }
    }
    const handleCreateFolder = (type: fileStruct) => {
        createNewFolder(fileName.value, type)
        fileName.value = ""
        closeCreateInput()
    }
    const handleCreateNewRequestTab = () => {
        const { createNewRequestTab } = useRequestTabs()
        if(newRequestsTabs.length !== 0) return
        const requestId = createNewRequestTab()
        router.push({ query: { t: requestId } })
    }

    return {
        createNewFolder,
        findFolderById,
        generatePath,
        handleUpdateCurrentFolderId,
        computedCurrentFolder,
        deleteNodeById,
        renameFolderOrRequest,
        updateRequestTypeInfolder,
        handleCreateNewRequestTab,
        handleCreateFolder,
        copyItem,
        pasteItem
    }

}

