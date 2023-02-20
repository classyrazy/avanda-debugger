<template>
    <div class="border w-[70%] my-4 rounded-md  pb-10 mx-8">
        <div class="title-input-and-dropdown-icon flex justify-between  px-4">
            <div class="grid grid-cols-8">
                <div class="border-r w-full col-span-3">
                    <input placeholder="Name e.g blog"
                        class="text-sm rounded-lg my-auto w-full bg-transparent border-none inline-block outline-none py-2 max-w-[400px] px-2 border-r border-2"
                        type="text" v-model="item.name">
                </div>
                <div class="w-full col-span-5">
                    <input placeholder="Nexted request's Controller/ServiceName"
                        class="text-sm rounded-lg my-auto w-full bg-transparent border-none inline-block outline-none py-2 max-w-[400px] px-2"
                        type="text" v-model="item.service">
                </div>
            </div>
            <div class="flex gap-2   items-center flex-row-reverse">
                <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                    title="Open dropdown">
                    <down-icon class=""></down-icon>
                </div>
                <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                    title="Create a new nested Function">
                    <add-icon></add-icon>
                </div>
            </div>
        </div>
        <div class="w-full h-[1px] bg-gray-200"></div>
        <div class="dropdown-nested-details mt-2">
            <ul
                class="params-and-request-options requestoption flex gap-8  text-avanda-grey-dark font-medium text-sm nav-links mx-2">
                <li class="cursor-pointer nav-link capitalize" v-for="tab in nestedTabArray" :key="tab"
                    :class="currentTab == tab ? 'active' : ''" @click="handleClickOnInnerTab(tab)">
                    {{ tab }}</li>
            </ul>
            <keep-alive>
                <component :is="nestedFunctInnerTabs[currentTab]" />
            </keep-alive>
        </div>
    </div>
    <div class="ml-4" v-if="item.nestedFunction">
        <nested-function v-for="(nestedItem, idx) in item.nestedFunction" :key="nestedItem?.name ?? idx" :item="nestedItem??{}" />
    </div>
</template>

<script setup lang="ts">
import DownIcon from '../../../icons/down-icon.vue'
import AddIcon from '../../../icons/add-icon.vue'
import { nestedFunctionType } from '~~/utils/types/nestedFunctionType';

const props = defineProps<{
    item: nestedFunctionType
}>()
let nestedFunctInnerTabs = {
    columns: "",
    params: "",
    nestedFunction: ""
}
let currentTab = ref("params")
let nestedTabArray = Object.keys(nestedFunctInnerTabs)
const handleClickOnInnerTab = (tab: string) => {
    currentTab.value = tab
}
</script>

<style scoped></style>