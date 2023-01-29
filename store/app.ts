import { defineStore } from "pinia";
import {useHandleFolder} from "~~/composables/useHandleFolder"
const store = () => {
    const currentFolderId = ref('')
    const {allFolders, findFolderById} = useHandleFolder()
    function updateCurrentFolder (id: string) {
        console.log(findFolderById(id, allFolders), {id})
        currentFolderId.value = id
    }
    const computedCurrentFolder = computed(() => {
        if(!currentFolderId.value) return "Root"
        return findFolderById(currentFolderId.value, allFolders)

    })
    return {
        updateCurrentFolder,
        currentFolderId,
        computedCurrentFolder
    }
}
export const useAppStore = defineStore("app", store)