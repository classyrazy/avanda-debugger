<template>
    <div>
        <div class="w-[60%] items-center mt-4  flex justify-between">
            <h2 class="mx-4">Nested Functions</h2>
            <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                title="Add a new root nested function" @click="createNewNestedFunction()">
                <add-icon></add-icon>
            </div>
        </div>
        <div class="nested-function-list">
            <nested-function v-for="(nestedItem, idx) in currentRequest?.nestedFunction" :key="idx" :item="nestedItem" :currId="idx"
                @update-model="handleEditNestedFunction($event, idx)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AddIcon from '../../icons/add-icon.vue'
import { currentRequest } from '../../../composables/request/useRequest';
import NestedFunction from './NestedFunction.vue'
import { nestedFunctionType } from "../../../types/nestedFunctionType"
import { computed } from 'vue';
import { createNewNestedFunction } from '../../../composables/request/nestedRequest';
// const nestedFunctions = computed(() => {
//     return currentRequest.value?.nestedFunction || []
// })

// const handleEditNestedFunction = (item: nestedFunctionType, idx: number) => {
//     let currentFuncToEdit = nestedFunctions.value[idx]
//     currentFuncToEdit.name = item.name
//     currentFuncToEdit.service = item.service
//     currentFuncToEdit.params = item.params
//     currentFuncToEdit.columns = item.columns
//     currentFuncToEdit.nestedFunction = item.nestedFunction
// }
</script>

<style scoped></style>