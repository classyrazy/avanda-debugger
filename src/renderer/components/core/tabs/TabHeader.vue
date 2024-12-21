<template>
    <div class="border-r first-of-type:border-l-0 border-l py-2 px-2 flex items-center gap-4 cursor-pointer" :class="currentRequestId == id ? 'border-t-[2px] border-t-main-purple':''" @click="router.push({query:{t: `${id}`}})">
        <div class="flex items-center gap-2">
            <span class="text-md font-semibold" :class="`text-${computedRequestType?.color}`">{{computedRequestType?.name}}</span>
            <span class="text-xl">·</span>
           <form @submit.prevent="handleSaveAfterRenaming(id, currentTab.name)" v-if="iseEditingName && currentTab">
            <input type="text" class="text-md bg-tranparent font-medium break-normal whitespace-nowrap focus:border-none outline-none max-w-[100px]" v-model="currentTab.name" v-click-outside="closeIsEditting">
           </form>
            <span class="text-md font-medium break-normal whitespace-nowrap" @dblclick="handleRenameRequest()" v-else>{{name}}</span>
        </div>
        <div class="w-5 h-5 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-md" @click.stop="removeTabFromTabs(id, newTab? 'new': 'old')">
            <close-icon></close-icon>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import CloseIcon from '../../icons/close-icon.vue'
import {useRouter, useRoute} from "vue-router";
import { useRequestTabs, currentTab } from '../../../composables/request/useRequestTabs';
import { currentRequestId } from '../../../composables/request/useRequest';
import { useAlert } from '../../../composables/core/useAlert';
import requestType from '../../../types/requestType';
import { useFolder } from '../../../composables/useFolder';
interface TabProps {
    id: string;
    name: string;
    requestType: requestType;
    newTab: boolean;
}


const props = defineProps<TabProps>()
const router = useRouter()
const {removeTabFromTabs} = useRequestTabs()
const {renameFolderOrRequest}  = useFolder()
const {openAlert} = useAlert()
const iseEditingName = ref(false)
let computedRequestType = computed(() => {
    switch (props.requestType) {
        case "get":
            return {name: "GET", color: "get"}
        case "post":
            return {name: "POST", color: "post"}
        case "delete":
            return {name: "DELETE", color: "delete"}
        case "watchable":
            return {name: "WATCH", color: "watchable"}
    }
})
const currentTabId = computed(() => {
    return useRoute().query.t
})
const handleRenameRequest = () => {
    iseEditingName.value = true
}
const closeIsEditting = () => {
    if (currentTab.value){
        currentTab.value.name = props.name
    }
    iseEditingName.value = false
}
const handleSaveAfterRenaming = (ide: string, name: string) => {
    if (!name || name.trim() == '') {
        openAlert({msg: "Request name cannot be empty", type: "ERROR"})
        return
    }
    renameFolderOrRequest(ide, name)
    iseEditingName.value = false
}
</script>

<style scoped>



</style>