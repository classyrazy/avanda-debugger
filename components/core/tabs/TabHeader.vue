<template>
    <div class="border-r border-l py-1 px-2 flex items-center gap-4 cursor-pointer" :class="currentTabId == id ? 'border-t-4 border-t-main-purple':''" @click="useRouter().push({query:{t: `${id}`}})">
        <div class="flex items-center gap-2">
            <span class="text-md font-semibold" :class="`text-${computedRequestType?.color}`">{{computedRequestType?.name}}</span>
            <span class="text-xl">·</span>
            <span class="text-md font-medium break-normal whitespace-nowrap">{{name}}</span>
        </div>
        <div class="w-5 h-5 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-md">
            <close-icon :size="16"></close-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import CloseIcon from '../../icons/close-icon.vue'
import requestType from "~/utils/types/requestType"
interface TabProps {
    id: string;
    name: string;
    requestType: requestType;
    newTab: boolean;
}

const props = defineProps<TabProps>()
let computedRequestType = computed(() => {
    switch (props.requestType) {
        case "get":
            return {name: "GET", color: "get"}
        case "post":
            return {name: "POST", color: "post"}
    }
})
const currentTabId = computed(() => {
    return useRoute().query.t
})
</script>

<style scoped>

</style>