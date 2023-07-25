<template>
    <div class="border-r first-of-type:border-l-0 border-l py-1.5 px-2 flex items-center gap-4 cursor-pointer" :class="currentRequestId == id ? 'border-t-[1.5px] border-t-main-purple':''" @click="router.push({query:{t: `${id}`}})">
        <div class="flex items-center gap-2">
            <span class="text-md font-semibold" :class="`text-${computedRequestType?.color}`">{{computedRequestType?.name}}</span>
            <span class="text-xl">·</span>
            <span class="text-md font-medium break-normal whitespace-nowrap">{{name}}</span>
        </div>
        <div class="w-5 h-5 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-md" @click.stop="removeTabFromTabs(id, newTab? 'new': 'old')">
            <close-icon :size="16"></close-icon>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import CloseIcon from '../../icons/close-icon.vue'
import {useRouter, useRoute} from "vue-router";
import { useRequestTabs } from '../../../composables/request/useRequestTabs';
import { currentRequestId } from '../../../composables/request/useRequest';
import requestType from '../../../types/requestType';
// import { useRequestStore } from "~~/store/request";
interface TabProps {
    id: string;
    name: string;
    requestType: requestType;
    newTab: boolean;
}
// const requestStore = useRequestStore();


const props = defineProps<TabProps>()
const router = useRouter()
const {removeTabFromTabs} = useRequestTabs()

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
</script>

<style scoped>



</style>