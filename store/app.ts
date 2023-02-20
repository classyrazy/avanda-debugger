import { defineStore } from "pinia";
import { useHandleFolder } from "~~/composables/useHandleFolder"
import { useCreateNewRequest } from "~~/composables/useCreateNewrequest";
import TreeItem from '~~/utils/types/TreeItem';
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "~~/utils/types/fileStruct";

const store = () => {
    const currentFolderId = ref('')
    const allFolders = reactive<TreeItem[]>([
        {
            id: "hjebjkjsf",
            name: "Authentication",
            type: "folder",
            children: [
                {
                    id: "jikfdbkf",
                    name: "Signup",
                    children: [
                        {
                            id: "jikfkf",
                            fileName: "Signup Admin",
                            parentFolderId: "jikfdbkf",
                            type: "request",
                            req_type: "get"
                        },
                    ],
                    parentFolderId: "hjebjkjsf",
                    type: "folder"

                },
                {
                    id: "omooo",
                    name: "Login",
                    children: [
                        {
                            id: "yo",
                            fileName: "Login Admin",
                            parentFolderId: "omooo",
                            type: "request",
                            req_type: "post"

                        }
                    ],
                    parentFolderId: "hjebjkjsf",
                    type: "folder"
                }
            ],
            parentFolderId: null
        }
    ])
    const { findFolderById } = useHandleFolder()
    const { addRequestTabHeader } = useCreateNewRequest()

    const projectDetails = reactive<{
        name: string,
        baseurl: string,
        description: string,
        environs: {
            key: string,
            value: string
        }[]
    }>({
        name: "Corep",
        baseurl: "http://192.168.43.133:4000/",
        description: "This is the server documentation for the corep project",
        environs: [
            {
                key: "token",
                value: "fkddfdkggfbglk;jflbhklfdbl.fjlkbflkbfkl'blkkjflbfl"
            },
            {
                key: "test_token",
                value: "fkddfdkggfbglk;jflbhklfdbl.fjlkbflkbfkl'blkkjflbfl"
            }
        ]
    })
    function addToEnvironment() {
        projectDetails.environs.push({
            key: "",
            value: ""
        })
    }
    function updateCurrentFolder(id: string) {
        console.log(findFolderById(id, allFolders), { id, allFolders })
        currentFolderId.value = id
    }

    const computedCurrentFolder = computed<TreeItem>(() => {
        if (!currentFolderId.value) return "Root"
        return findFolderById(currentFolderId.value, allFolders)

    })
    const createFolderOrRequest = (objectTosave: TreeItem, whereId: string = currentFolderId.value, type: fileStruct) => {
        const folderOrRequestId = uuidv4()
        if (whereId) {
            let locationFolder = findFolderById(whereId, allFolders)
            console.log(locationFolder)
            locationFolder?.children?.push(objectTosave)

        } else {
            allFolders.push(objectTosave)
        }
        console.log(allFolders)
        if (type === "folder") {
            updateCurrentFolder(objectTosave.id ?? '')
        } else {
            addRequestTabHeader(objectTosave.id ?? '')
            useRouter().push({ query: { t: objectTosave.id } })
        }
    }
    const openSideBarRequestAsTab = (id: string) => {
        useRouter().push({ query: { t: id } })
    }
    return {
        updateCurrentFolder,
        currentFolderId,
        computedCurrentFolder,
        allFolders,
        createFolderOrRequest,
        projectDetails,
        addToEnvironment
    }
}
export const useAppStore = defineStore("app", store)