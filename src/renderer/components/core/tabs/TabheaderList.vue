<template>
    <div class="flex border-b">
        <div class="flex max-w-[65vw] overflow-x-auto my-auto tab-wrapper">
            <tab-header v-for="request in requestTabs" :key="request.id" :request-type="request.type"
                :name="request.name" :id="request.id"></tab-header>
            <tab-header v-for="newRequest in newRequestsTabs" :key="newRequest.id"
                :request-type="newRequest.type" :name="newRequest.name" :id="newRequest.id" newTab></tab-header>
        </div>
        <div class="ml-auto pl-4 flex gap-4 items-center">
            <div class="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full"
                @click="createNewRequest('New Request', 'get', storeData.currentFolderId)">
                <add-icon></add-icon>
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

import {newRequestsTabs, requestTabs} from "../../../composables/request/useRequestTabs"


// import AppConfigModal from '../../modals/app-config-modal.vue'
// import DownIcon from '../../icons/down-icon.vue'
// import AddIcon from '../../icons/add-icon.vue'
// import TabHeader from './TabHeader.vue'
// import { useRequestStore } from "~~/store/request";
// import { useAppStore } from "~~/store/app";
// import { useCreateNewRequest } from '~~/composables/useCreateNewrequest';
// import { useModal } from "vue-modally-v3";
// import { useMakerequest } from '~~/composables/useMakerequest';
// const requestStore = useRequestStore();
// const storeData = useAppStore();
// const {setRequestConfig}  = useMakerequest()
// let { createNewRequest } = useCreateNewRequest()

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
}</style>