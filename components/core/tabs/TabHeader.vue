<template>
    <div class="border-r border-l inline-block py-1 px-2 flex items-center gap-4 cursor-pointer">
        <div class="flex items-center gap-2">
            <span class="text-get-request-green text-md font-semibold">GET</span>
            <span class="text-xl">·</span>
            <span class="text-md font-medium">ServiceNameOne</span>
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
    title: string;
    requestType: requestType;
    active: boolean;
}

const props = defineProps<TabProps>()
const active = ref(props.active)
let computedRequestType = computed(() => {
    switch (props.requestType) {
        case "get":
            return "GET"
        case "post":
            return "POST"
    }
})
</script>

<style scoped>

</style>