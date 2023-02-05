import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "@/utils/types/fileStruct";
import TreeItem from '~~/utils/types/TreeItem';
import { useAppStore } from "~~/store/app"
export const useHandleFolder = () => {
    let allFolders: TreeItem[] = []
    const storeData = useAppStore()
    const currentFolder = ref<string | undefined | null>('')
    const createNewFolderOrRequest = (name: string, type: fileStruct) => {
        const folderOrRequestId = uuidv4()
        let objTopush: TreeItem
        if (type === "folder") {
            objTopush = {
                id: folderOrRequestId,
                name: name,
                children: [],
                isFolderEmpty: true,
                parentFolderId: storeData.currentFolderId,
                type: "folder"
            }
        } else {
            objTopush = {
                id: folderOrRequestId,
                fileName: name,
                parentFolderId: storeData.currentFolderId,
                type: "request",
                name: '',
                req_type: "get",
            }
        }
        console.log("Obj to push", objTopush)
        storeData.createFolderOrRequest(objTopush,storeData.currentFolderId, type)
    }

    const findFolderById = (id: string, arr: any[] | null): any | null => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
            if (arr[i].children) {
                let res = findFolderById(id, arr[i].children);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    }

    const updateCurrentFolder = (id: string) => {
        console.log(findFolderById(id, allFolders), { id })
        currentFolder.value = id
    }
    // const computedCurrentFolder = computed(() => {
    //     if (!currentFolder.value) return "Root"
    //     return findFolderById(currentFolder.value, allFolders)

    // })
    // const computedAllFolders = computed(() => {
    //     return allFolders
    // })
    return {
        allFolders,
        createNewFolderOrRequest,
        currentFolder,
        findFolderById,
        updateCurrentFolder,
    }
}