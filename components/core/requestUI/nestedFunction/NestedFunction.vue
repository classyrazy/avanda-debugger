<template>
    <div class="border w-[70%] my-4 rounded-md  mx-8" :class="nestedFunctionOpen ? 'pb-10' : ''">
        <div class="title-input-and-dropdown-icon flex justify-between  px-4">
            <div class="grid grid-cols-8">
                <div class="border-r w-full col-span-3">
                    <input placeholder="Name e.g blog"
                        class="text-sm rounded-lg my-auto w-full bg-transparent border-none inline-block outline-none py-2 max-w-[400px] px-2 border-r border-2"
                        type="text" v-model="modelValues.name" @keyup="emit('updateModel', modelValues)">
                </div>
                <div class="w-full col-span-5">
                    <input placeholder="Nexted request's Controller/ServiceName"
                        class="text-sm rounded-lg my-auto w-full bg-transparent border-none inline-block outline-none py-2 max-w-[400px] px-2"
                        type="text" v-model="modelValues.service" @keyup="emit('updateModel', modelValues)">
                </div>
            </div>
            <div class="flex gap-2   items-center flex-row-reverse">
                <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                    title="Open dropdown" @click="handleToggleNestedFunction">
                    <down-icon class=""></down-icon>
                </div>
                <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                    title="Create a new nested Function" @click="createNewNestedFunction(item.id)">
                    <add-icon></add-icon>
                </div>
            </div>
        </div>
        <div class="w-full h-[1px] bg-gray-200" :class="nestedFunctionOpen ? 'block' : 'hidden'"></div>
        <div class="dropdown-nested-details mt-2" :class="nestedFunctionOpen ? 'block' : 'hidden'">
            <ul
                class="params-and-request-options requestoption flex gap-8  text-avanda-grey-dark font-medium text-sm nav-links mx-2">
                <li class="cursor-pointer nav-link capitalize" v-for="tab in nestedTabArray" :key="tab"
                    :class="currentTab == tab ? 'active' : ''" @click="handleClickOnInnerTab(tab)">
                    {{ tab }}</li>
            </ul>
            <keep-alive>
                <component :is="nestedFunctInnerTabs[currentTab]" :item="computedComponentProps" @update-columns="handleEditedColumns($event)" @update-params="handleEditedParams" />
            </keep-alive>
        </div>
    </div>
    <div class="ml-4" v-if="item.nestedFunction">
        <nested-function v-for="(nestedItem, idx) in item.nestedFunction" :key="idx" :item="nestedItem ?? {}"
            @update-model="handleEditNestedFunction($event, idx)" />
    </div>
</template>

<script setup lang="ts">
import ParamEditSmall from '../params/ParamEditSmall.vue'
import ColumnEditSmall from '../column/ColumnEditSmall.vue'
import DownIcon from '../../../icons/down-icon.vue'
import AddIcon from '../../../icons/add-icon.vue'
import { nestedFunctionType } from '~~/utils/types/nestedFunctionType';
import { useNestedFunction } from "~~/composables/useNestedFunction"
import { useRequestStore } from "~~/store/request"

const { createNewNestedFunction } = useNestedFunction()
const requestStore = useRequestStore()

const props = defineProps<{
    item: nestedFunctionType,
}>()

let modelValues = computed<nestedFunctionType>(() => {
    return {
        id: props.item.id,
        name: props.item.name,
        service: props.item.service,
        params: props.item.params,
        columns: props.item.columns,
        nestedFunction: props.item.nestedFunction,
    }
})
const emit = defineEmits(['updateModel'])
let nestedFunctInnerTabs: { [key: string]: object } = {
    columns: ColumnEditSmall,
    params: ParamEditSmall,
}
type nestedFunctInnerTabsTypes = "params" | "columns"

let nestedFunctionOpen = ref(false)
let currentTab = ref<nestedFunctInnerTabsTypes>("columns")
let computedComponentProps = computed(() => {
    let propsToset = {
        params: modelValues.value.params,
        columns: modelValues.value.columns,
    }
    return propsToset[currentTab.value]
})
let nestedTabArray = Object.keys(nestedFunctInnerTabs)
const handleClickOnInnerTab = (tab: nestedFunctInnerTabsTypes) => {
    currentTab.value = tab
}
const handleToggleNestedFunction = () => {
    nestedFunctionOpen.value = !nestedFunctionOpen.value
}
const handleEditNestedFunction = (item: nestedFunctionType, idx: number) => {
    if (props.item.nestedFunction) {
        let currentFuncToEdit = props.item.nestedFunction[idx]
        currentFuncToEdit.name = item.name
        currentFuncToEdit.service = item.service
        currentFuncToEdit.params = item.params
        currentFuncToEdit.columns = item.columns
    }
}
const handleEditedColumns = (columns: {key: string, active: boolean}[]) => {
    modelValues.value.columns = columns
}
const handleEditedParams = (params: {key: string, value: string, active:boolean, description: string}[]) =>  {
    modelValues.value.params = params
}
</script>

<style scoped></style>