<template>
    <div class="flex border-b h-[45px]">
        <div class="flex max-w-[65vw] overflow-x-auto my-auto tab-wrapper">
            <tab-header v-for="request in requestTabs" :key="request.id" :request-type="request.type" :name="request.name"
                :id="request.id" :newTab="false"></tab-header>
            <tab-header v-for="newRequest in newRequestsTabs" :key="newRequest.id" :request-type="newRequest.type"
                :name="newRequest.name" :id="newRequest.id" newTab></tab-header>
        </div>
        <div class="ml-auto pl-4 flex gap-4 items-center">
            <div class="w-8 h-8 flex justify-center items-center cursor-pointer bg-avanda-grey hover:bg-gray-200 rounded-md"
                @click="handleCreateNewRequestTab">
                <add-icon class="text-gray-7"></add-icon>
            </div>
            <div class="config border-l px-2 flex items-center gap-4 cursor-pointer" @click="handleClickOnAppConfig">
                <p class="text-md">Test  another - (config)</p>
                <!-- <down-icon :size="16"></down-icon> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DownIcon from '../../icons/down-icon.vue';
import { useModal } from "vue-modally-v3";
import AppConfigModal from '../../modals/app-config-modal.vue'
import AddIcon from '../../icons/add-icon.vue'
import TabHeader from './TabHeader.vue'
import { newRequestsTabs, requestTabs, useRequestTabs } from "../../../composables/request/useRequestTabs"
import { useRoute, useRouter } from 'vue-router'
import { projectDetails, resetConfigInAvanda } from '../../../composables/useAppConfig';



const router = useRouter()
const route = useRoute()
const { createNewRequestTab } = useRequestTabs()
async function handleCreateNewRequestTab() {
    if(newRequestsTabs.length !== 0) {
        router.push({ query: { t: newRequestsTabs[0].id } })
        return
    }
    createNewRequestTab()
    // router.push({ query: { t: requestId } })
    console.log(newRequestsTabs[0].id, 'newRequestsTabs[0].id', router)
    // router.push({ query: { t: newRequestsTabs[0].id } })
    router.push(`?t=${newRequestsTabs[0].id}`)
    console.log(router.currentRoute)
}
async function handleClickOnAppConfig() {
    let appConfig = await useModal(AppConfigModal, {
        options: {
            background: 'white',
            width: 1000,
            type: "modal",
            blur: false
        }
    })
    if(appConfig) {
        resetConfigInAvanda()
    }
}
</script>

<style scoped>
.tab-wrapper::-webkit-scrollbar {
    height: 0.1rem !important;
    opacity: 0;
    display: none;
}
</style>