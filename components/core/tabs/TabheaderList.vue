<template>
    <div class="flex border">
        <div class="flex max-w-[65vw] overflow-x-auto my-auto tab-wrapper">
            <tab-header v-for="request in requests" :key="request.id" :request-type="request.type" :name="request.name" :id="request.id"></tab-header>
            <tab-header v-for="newRequest in newRequests" :key="newRequest.id" :request-type="newRequest.type" :name="newRequest.name" :id="newRequest.id" newTab></tab-header>
        </div>
        <div class="ml-auto pl-4 flex gap-4 items-center">
            <div class="w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-gray-200 rounded-full">
                <add-icon></add-icon>
            </div>
            <div class="config border-l px-2 flex items-center gap-4 cursor-pointer">
                <p class="text-md">Corep - (config)</p>
                <down-icon :size="16"></down-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DownIcon from '../../icons/down-icon.vue'
import AddIcon from '../../icons/add-icon.vue'
import TabHeader from './TabHeader.vue'


let {requests, newRequests} = useCreateNewRequest()

</script>

<style scoped>
.tab-wrapper::-webkit-scrollbar{
    height: 0.1rem !important;
    opacity: 0;
    display: none;
}
</style>