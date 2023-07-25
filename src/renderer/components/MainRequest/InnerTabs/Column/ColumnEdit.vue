<template>
    <div class="pt-6">
        <h3 class="text-md font-semibold text-avanda-grey-dark mb-3 mx-4">Columns</h3>
        <p class="mx-4 mb-4 text-sm">Enter The columns you want to fetch</p>

        <div class="param-table border-t">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-1 border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase">Columns</p>
                        </li>
                    </ul>
                </div>
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in columnForm" :key="idx">
                    <div class="absolute left-[0] top-3">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2">
                            <input placeholder="Key" class="text-sm bg-transparent border-none w-full inline-block appearance-none outline-none pr-2" type="text" size="small" full
                                style-type="avanda-grey-input" v-model="columnForm[idx].key" @input="handleCreateColumns"/>
                        </li>
                    </ul>
                    <div class="absolute right-[0] top-2">
                    <button class="text-avanda-grey-dark cursor-pointer" type="button"><delete-icon class="w-6"></delete-icon></button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-ignore
import DeleteIcon from '../../../icons/delete-icon.vue'
import { computed, onMounted } from 'vue';
import { currentRequest, useRequest,currentRequestId } from '../../../../composables/request/useRequest';
const { createNewColumn, currentRequestTest } = useRequest()
const columnForm = computed(() => {
    return currentRequest.value?.columns || []
})
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = columnForm.value.every(eachForm => eachForm.key) || columnForm.value.length === 0
    console.log({ isAllFull })
    if (isAllFull) {
        createNewColumn(currentRequest.value?.id ?? '')
    }
}

const handleCreateColumns =() => {
    addNewBodyFormWhenOthersAreFull()
}
</script>

<style scoped></style>