import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "@/utils/types/fileStruct";

export const useHandleFolder = () => {
    type TreeItem = {
        id?: string,
        name: string,
        children?: TreeItem[],
        isFolderEmpty?: boolean,
        parentFolderId?: string | null
    }
    const currentFolder = ref<string | undefined | null>('')
    const allFolders = reactive<TreeItem[]>([
        {
            id: "hjebjkjsf",
            name: "Authentication",
            children: [
                {
                    id: "jikfdbkf",
                    name: "Signup",
                    children: [
                        {
                            id: "jikfkf",
                            name: "Signup Admin",
                            parentFolderId: "jikfdbkf"
                        },
                        {
                            id: "hi",
                            name: "Signup User",
                            parentFolderId: "jikfdbkf"
                        }
                    ],
                    parentFolderId: "hjebjkjsf"
                },
                {
                    id: "omooo",
                    name: "Login",
                    children: [
                        {
                            id: "yo",
                            name: "Login Admin",
                            parentFolderId: "omooo"

                        },
                        {
                            id: "niboo",
                            name: "Login User",
                            parentFolderId: "omooo"
                        }
                    ],
                    parentFolderId: "hjebjkjsf",
                }
            ],
            parentFolderId: null
        },
        {
            id: "jikffhjdkfbjdfdbkf",
            name: "Login Admin",
            parentFolderId: null
        }
    ])


    const createNewFolderOrRequest = (name: string, type: fileStruct) => {
        const folderOrRequestId = uuidv4()
        let objTopush: TreeItem
        if (type === "folder") {
            objTopush = {
                id: folderOrRequestId,
                name: name,
                children: [],
                isFolderEmpty: true
            }
        } else {
            objTopush = {
                id: folderOrRequestId,
                name: name,
            }
        }
        allFolders.push(objTopush)
        console.log({ allFolders })
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
        console.log(findFolderById(id, allFolders), {id})
        currentFolder.value = id
    }
    const computedCurrentFolder = computed(() => {
        if(!currentFolder.value) return "Root"
        return findFolderById(currentFolder.value, allFolders)

    })
    return {
        allFolders,
        createNewFolderOrRequest,
        currentFolder,
        findFolderById,
        updateCurrentFolder,
        computedCurrentFolder
    }
}