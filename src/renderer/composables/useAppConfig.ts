import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";
import { ProjectDetailType } from "../types/appStyleTypes";
import Graph from "@avanda/avandajs";

export const currentProjectId = ref<string | null>("project-1-id")

export const allProjects = useStorage<ProjectDetailType[]>('all-projects', [
    {
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
    }
])

// export const projectDetails = computed(() => 
//   allProjects.value.find(project => project.id === currentProjectId.value) ?? null
// )

export const projectDetails = ref<ProjectDetailType>(allProjects.value.find(project => project.id == currentProjectId.value) ?? {
    id: "",
    name: "",
    baseurl: "",
    description: "",
    environs: []
})
export const allEnvironValues = computed(() => {
    // i want it in the form key: value
    let environs = {} as any
    for (let env of projectDetails.value.environs) {
        environs[env.key] = env.value
    }

    return environs
})

export const resetConfigInAvanda = () => {
    Graph.setAvandaConfig({
        rootUrl: projectDetails.value.baseurl
    })
    Graph.setAxiosRequestConfig({
        baseURL: projectDetails.value.baseurl,
        withCredentials: true
    })
    console.log('baseUrl', projectDetails.value.baseurl)
}