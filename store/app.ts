import { defineStore } from "pinia";
import { useHandleFolder } from "~~/composables/useHandleFolder"
import { useCreateNewRequest } from "~~/composables/useCreateNewrequest";
import TreeItem from '~~/utils/types/TreeItem';
import { v4 as uuidv4 } from 'uuid'
import { fileStruct } from "~~/utils/types/fileStruct";
type projectDetailType = {
    id: string,
    name: string,
    baseurl: string,
    description: string,
    environs: {
        key: string,
        value: string
    }[]
}
const store = () => {
    const currentFolderId = ref('')
    const currentProjectId = ref('')
    const allFolders = reactive<TreeItem[]>([
        {
            project_id: "project-1-id",
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
    const allProjects = reactive<projectDetailType[]>([{
        id: "project-1-id",
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
    }])
    const projectDetails = computed(() => {
        // console.log(allProjects, currentProjectId.value)
        return allProjects.find(project => project.id == currentProjectId.value)
    })
    // const projectDetails = ref<projectDetailType | null>(null)
    function addToEnvironment() {
        projectDetails.value?.environs.push({
            key: "",
            value: ""
        })
    }
    // function setProjectDetails(project: projectDetailType) {
    //     projectDetails.value = project
    // }
    function updateCurrentFolder(id: string) {
        // console.log(findFolderById(id, computedAllFolders.value), { id, allFolders })
        currentFolderId.value = id
    }

    const computedCurrentFolder = computed<TreeItem>(() => {
        if (!currentFolderId.value) return "Root"
        return findFolderById(currentFolderId.value, computedAllFolders.value)

    })
    const computedAllFolders = computed(() => {
        return allFolders.filter(folder => folder.project_id === currentProjectId.value) ?? []
    })
    function  createFolderOrRequest (objectTosave: TreeItem, whereId: string = currentFolderId.value, type: fileStruct) {
        const folderOrRequestId = uuidv4()
        if (whereId) {
            let locationFolder = findFolderById(whereId, computedAllFolders.value)
            // console.log(locationFolder)
            locationFolder?.children?.push(objectTosave)

        } else {
            allFolders.push(objectTosave)
        }
        // console.log(allFolders)
        if (type === "folder") {
            updateCurrentFolder(objectTosave.id ?? '')
        } else {
            addRequestTabHeader(objectTosave.id ?? '')
            useRouter().push({ query: { t: objectTosave.id } })
        }
    }
    function openSideBarRequestAsTab  (id: string) {
        useRouter().push({ query: { t: id } })
    }
    function createANewProject (projectName: string) {
        const projectId = uuidv4()
        let projObjToPush = {
            id: projectId,
            name: projectName,
            baseurl: "",
            description: "",
            environs: []
        }
        allProjects.push(projObjToPush)
        currentProjectId.value = projObjToPush.id
    }
    return {
        updateCurrentFolder,
        currentFolderId,
        computedCurrentFolder,
        allFolders,
        createFolderOrRequest,
        projectDetails,
        addToEnvironment,
        currentProjectId,
        createANewProject,
        computedAllFolders,
        allProjects
    }
}
export const useAppStore = defineStore("app", store, {persist: true})