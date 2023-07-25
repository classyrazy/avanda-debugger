<template>
    <div class="flex border-b">
        <div class="flex max-w-[65vw] overflow-x-auto my-auto tab-wrapper">
            <tab-header v-for="request in requestTabs" :key="request.id" :request-type="request.type" :name="request.name"
                :id="request.id"></tab-header>
            <tab-header v-for="newRequest in newRequestsTabs" :key="newRequest.id" :request-type="newRequest.type"
                :name="newRequest.name" :id="newRequest.id" newTab></tab-header>
        </div>
        <div class="ml-auto pl-4 flex gap-4 items-center">
            <div class="w-8 h-8 flex justify-center items-center cursor-pointer bg-avanda-grey hover:bg-gray-200 rounded-md"
                @click="handleCreateNewRequestTab">
                <add-icon class="text-gray-7"></add-icon>
            </div>
            <div class="config border-l px-2 flex items-center gap-4 cursor-pointer" @click="handleClickOnAppConfig">
                <p class="text-md">Test - (config)</p>
                <down-icon :size="16"></down-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DownIcon from '../../icons/down-icon.vue'
import AddIcon from '../../icons/add-icon.vue'
import TabHeader from './TabHeader.vue'

import { newRequestsTabs, requestTabs, useRequestTabs } from "../../../composables/request/useRequestTabs"
import { useRoute, useRouter } from 'vue-router'



const router = useRouter()
const route = useRoute()
const { createNewRequestTab } = useRequestTabs()
function handleCreateNewRequestTab() {
    if(newRequestsTabs.length !== 0) {
        router.push({ query: { t: newRequestsTabs[0].id } })
        return
    }
    const requestId = createNewRequestTab()
    router.push({ query: { t: requestId } })
}
// async function handleClickOnAppConfig() {
//     let appConfig = await useModal(AppConfigModal, {
//         options: {
//             background: 'white',
//             width: 1000,
//             type: "modal",
//             blur: false
//         }
//     })
//     if(appConfig) {
//         setRequestConfig({baseurl: appConfig})
//     }
// }
</script>

<style scoped>
.tab-wrapper::-webkit-scrollbar {
    height: 0.1rem !important;
    opacity: 0;
    display: none;
}
</style>