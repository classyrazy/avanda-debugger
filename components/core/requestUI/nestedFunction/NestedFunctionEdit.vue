<template>
    <div>
        <div class="w-[60%] items-center mt-4  flex justify-between">
            <h2 class="mx-4">Nested Functions</h2>
            <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                title="Add a new root nested function" @click="createNewNestedFunction(null)">
                <add-icon></add-icon>
            </div>
        </div>
        <div class="nested-function-list">
            <nested-function v-for="(nestedItem, idx) in nestedFunctions" :key="idx" :item="nestedItem"
                @update-model="handleEditNestedFunction($event, idx)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AddIcon from '../../../icons/add-icon.vue'
import NestedFunction from './NestedFunction.vue'
import { nestedFunctionType } from "~~/utils/types/nestedFunctionType"
import { useRequestStore } from "~~/store/request"
import { useNestedFunction } from "~~/composables/useNestedFunction"
const requestStore = useRequestStore()
const { createNewNestedFunction, editNestedFunction } = useNestedFunction()
const nestedFunctions = computed(() => {
    return requestStore.computedCurrentMainRequest?.nestedFunction ?? []
})
// const testNestedArray = reactive<nestedFunctionType[]>([
//     {
//         id: "nested-id-1",
//         name: "blog",
//         service: "Blog/getUserBlog",
//         params: [
//             {
//                 key: "id",
//                 value: "1",
//                 active: true
//             },
//             {
//                 key: "id",
//                 value: "2",
//                 active: true
//             }
//         ],
//         columns: [
//             {
//                 key: "id",
//                 active: true
//             },
//             {
//                 key: "title",
//                 active: true
//             },
//             {
//                 key: "description",
//                 active: true
//             }
//         ],
//         nestedFunction: null
//     },
//     {
//         id: "nested-id-2",
//         name: "blog",
//         service: "Blog/getUserBlog",
//         params: [
//             {
//                 key: "id",
//                 value: "1",
//                 active: true
//             },
//             {
//                 key: "id",
//                 value: "2",
//                 active: true
//             }
//         ],
//         columns: [
//             {
//                 key: "id",
//                 active: true
//             },
//             {
//                 key: "title",
//                 active: true
//             },
//             {
//                 key: "description",
//                 active: true
//             }
//         ],
//         nestedFunction: [
//             {
//                 id: "nested-id-nested-1",
//                 name: "blog",
//                 service: "Blog/getUserBlog",
//                 params: [
//                     {
//                         key: "id",
//                         value: "1",
//                         active: true
//                     },
//                     {
//                         key: "id",
//                         value: "2",
//                         active: true
//                     }
//                 ],
//                 columns: [
//                     {
//                         key: "id",
//                         active: true
//                     },
//                     {
//                         key: "title",
//                         active: true
//                     },
//                     {
//                         key: "description",
//                         active: true
//                     }
//                 ],
//                 nestedFunction: null
//             }
//         ]
//     }

// ])

const handleEditNestedFunction = (item: nestedFunctionType, idx: number) => {
    let currentFuncToEdit = nestedFunctions.value[idx]
    currentFuncToEdit.name = item.name
    currentFuncToEdit.service = item.service
    currentFuncToEdit.params = item.params
    currentFuncToEdit.columns = item.columns
    currentFuncToEdit.nestedFunction = item.nestedFunction
    // console.log(requestStore.computedCurrentMainRequest)
    // editNestedFunction(currentFuncToEdit.id, 'name', currentFuncToEdit.name)
    // console.log(item, nestedFunctions)
}
</script>

<style scoped></style>