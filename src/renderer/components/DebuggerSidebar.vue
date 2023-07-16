<template>
     <aside class="h-[95vh]  bg-avanda-grey overflow-x-hidden py-1">
        <div class="">
                <div class="flex items-center border-b sticky top-0">
                    <img src="../../assets/images/avanda-logo.svg" alt="Logo" class="max-w-[30px] lg:max-w-[50px]">
                    <h2 class="grad-text-1 text-lg font-semibold font-inter">Debugger</h2>
                </div>
            <div class="sticky top-[50px]">
                <div class="flex justify-between my-2 px-2">
                    <h3 class="text-md font-semibold text-avanda-grey-dark leading-tight text-ellipsis overflow-hidden">{{projectDetails?.name?? ''}}</h3>
                    <div class="flex gap-2 ">
                        <add-request-icon text-color="rgba(0, 0, 0, 0.44)" :size="20" class="cursor-pointer"></add-request-icon>
                        <add-collection-icon text-color="rgba(0, 0, 0, 0.44)" :size="20" class="cursor-pointer"
                        @click="handleFolderIconClick('folder')"></add-collection-icon>
                    </div>
                </div>
                <form @submit.prevent="handleCreateFolder('folder')">
                    <v-input :placeholder="`New Request Folder`" v-if="displayCreateFolderInput"
                        v-click-outside="closeCreateInput" :value="fileName" class="text-sm rounded-sm" autofocus type="text" size="small" full
                        style-type="avanda-create-file-input"></v-input>
                </form>
            </div>
            <div class="max-h-[80vh] h-[80vh] overflow-y-auto">
                <side-tree :tree-items="allFolders"></side-tree>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import SideTree from './SidebarTree/SideTree.vue'
import AddCollectionIcon from './icons/add-collection-icon.vue'
import AddRequestIcon from './icons/add-request-icon.vue'
import VInput from './core/forms/v-input.vue'
import {useFolder,allFolders} from "../composables/useFolder"
import { reactive, ref } from 'vue'
import { fileStruct } from '../types/fileStruct'
const projectDetails = {id:"64ade9f7-43c7-4a8b-bae2-cc1b7f7f44e9",name:"new-avanda-test-1",baseurl:"",description:"","environs":[]}
let displayCreateFolderInput = ref(false)
const closeCreateInput = () => {
    displayCreateFolderInput.value = false
}
let fileName = reactive({
    value: "",
    error: null
})
function handleFolderIconClick(type: fileStruct){
    fileName.value = ""
    toggleOpenInput()
}
const {createNewFolderOrRequest} = useFolder()
const toggleOpenInput = () => {
    displayCreateFolderInput.value = !displayCreateFolderInput.value
}
const handleCreateFolder = (type: fileStruct) => {
    createNewFolderOrRequest(fileName.value, type)
    fileName.value = ""
    closeCreateInput()
}
</script>

<style scoped>

</style>