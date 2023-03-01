<template>
    <div class="max-h-screen bg-avanda-grey overflow-x-hidden">
        <div class="">
            <router-link to="/">
                <div class="flex items-center mt-6 ml-4">
                    <img src="../../assets/images/avanda-logo.svg" alt="Logo" class="max-w-[30px] lg:max-w-[70px]">
                    <h2 class="grad-text-1 text-lg lg:text-2xl font-bold">Debugger</h2>
                </div>
            </router-link>
            <div class="">
                <div class="flex justify-between my-2">
                    <h3 class="text-md font-semibold text-avanda-grey-dark leading-tight">{{storeData.projectDetails?.name?? ''}}</h3>
                    <div class="flex gap-2 ">
                        <add-request-icon text-color="rgba(0, 0, 0, 0.44)" :size="20" class="cursor-pointer"
                            @click="handleNewParentRequest"></add-request-icon>
                        <add-collection-icon text-color="rgba(0, 0, 0, 0.44)" :size="20" class="cursor-pointer"
                            @click="handleNewParentFolder"></add-collection-icon>
                    </div>
                </div>
                <form @submit.prevent="createFolderOrRequest(createType)">
                    <v-input :placeholder="`New ${createType}`" v-if="displayCreateFolderOrRequestInput"
                        v-click-outside="closeCreateInput" :value="fileName" class="text-sm rounded-sm" autofocus type="text" size="small" full
                        style-type="avanda-create-file-input"></v-input>
                </form>
            </div>
            <div class="max-h-[80vh] h-[80vh] overflow-y-auto">
                <side-tree :tree-items="storeData.computedAllFolders"></side-tree>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VInput from '../core/forms/v-input.vue'
import SideTree from './SidebarTree/SideTree.vue'
import AddRequestIcon from '../icons/add-request-icon.vue'
import AddCollectionIcon from '../icons/add-collection-icon.vue'
import { useHandleFolder } from '~~/composables/useHandleFolder';
import { useAppStore } from "~~/store/app";

const { allFolders: testTree, createNewFolderOrRequest } = useHandleFolder()

type createType = "folder" | "request"
let createType = ref<createType>("folder")
let displayCreateFolderOrRequestInput = ref(false)
const storeData = useAppStore();

const handleNewParentFolder = () => {
    toggleOpenInput()
    createType.value = "folder"
    // console.log("handleNewParentFolder")
}
const handleNewParentRequest = () => {
    toggleOpenInput()
    createType.value = "request"
    // console.log("handleNewParentRequest")
}
const closeCreateInput = () => {
    displayCreateFolderOrRequestInput.value = false
}
const toggleOpenInput = () => {
    displayCreateFolderOrRequestInput.value = !displayCreateFolderOrRequestInput.value
}
let fileName = reactive({
    value: "",
    error: null
})
const createFolderOrRequest = (type: createType) => {
    // console.log("createFolderOrRequest", type)
    createNewFolderOrRequest(fileName.value, type)
    fileName.value = ""
    closeCreateInput()
}

// let testTree2 = reactive([
//     {
//         name: "folde`r 1",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 2",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 3",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 4",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 5",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 6",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     },
//     {
//         name: "folder 7",
//         children: [
//             {
//                 name: "sub-folder 1",
//                 children: [
//                     { name: "sub-sub-folder 1" },
//                     { name: "sub-sub-folder 2" }
//                 ]
//             },
//             { name: "sub-folder 2" }
//         ]
//     }
// ])
</script>

<style scoped>

</style>