<template>
    <div class="flex flex-col justify-center items-center gap-4 p-4">
        <img src="~~/assets/images/core/http.png" alt="" class="w-[300px]">
        <p class="">
            You are creating a New Untitled Request in the {{ computedFolderString? computedFolderString: 'Root' }}
            folder  
        </p>
        <form @submit.prevent="createFolderOrRequest('request')" class="w-[70%]">
            <v-input class="" style-type="avanda-create-file-name-input" :value="fileName"
                placeholder="Enter Request Name" autofocus size="medium" full />
        </form>

    </div>
</template>

<script setup lang="ts">
import VInput from '../forms/v-input.vue'
import { useAppStore } from "~~/store/app";
import { useRequestStore } from "~~/store/request";
import TreeItem from '~~/utils/types/TreeItem';
import { useHandleFolder } from "~~/composables/useHandleFolder";
import { fileStruct } from "@/utils/types/fileStruct";

const storeData = useAppStore();
const requestStore = useRequestStore();
const { allFolders, findFolderById, createNewFolderOrRequest } = useHandleFolder();
const computedFolderString = computed(() => {
    let result = 'Root'
    if (storeData.computedCurrentFolder) {
        result = generatePath(storeData.computedCurrentFolder)
    }
    return result
})
let fileName = reactive({
    value: "",
    error: null
})
function generatePath(object: TreeItem, folders: string[] = []) {
    if (!object.parentFolderId) {
        folders.unshift(object.name);
        return folders.join("-->");
    }
    folders.unshift(object.name);
    const parent = findFolderById(object.parentFolderId, storeData.computedAllFolders);
    // console.log({ parent })
    generatePath(parent, folders);
    // console.log(folders)
    return folders.join("-->");
}
const createFolderOrRequest = (type: fileStruct) => {
    createNewFolderOrRequest(fileName.value, type)
    fileName.value = ""
    requestStore.removeRequestFromNewHeaderTabs(requestStore.currentRequestheaderId)

}

</script>

<style scoped>

</style>