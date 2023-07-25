<template>
    <div class="pt-6">
        <h3 class="text-md font-semibold text-avanda-grey-dark mb-3 mx-4 my-2">Query Params</h3>
        <div class="param-table border-t">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-1 border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase">Key</p>
                        </li>
                        <li class="py-1 border-r">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Value</p>
                        </li>
                        <li class="py-1">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Description</p>
                        </li>
                    </ul>
                </div>
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in paramForm" :key="idx">
                    <div class="absolute left-[0] top-3">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2">
                            <input placeholder="Key"
                                class="text-sm bg-transparent border-none w-full inline-block appearance-none outline-none pr-2"
                                type="text" size="small" full style-type="avanda-grey-input" v-model="paramForm[idx].key"
                                @input="handleCreateParams" />
                        </li>
                        <li class="border-r py-2">
                            <input placeholder="Value"
                                class="text-sm bg-transparent border-none w-full inline-block appearance-none outline-none pr-2"
                                type="text" size="small" full style-type="avanda-grey-input" v-model="paramForm[idx].value"
                                @input="handleCreateParams" />
                        </li>
                        <li>
                            <textarea placeholder="Description"
                                class="text-sm w-full flex items-center justify-center bg-transparent border-none appearance-none outline-0 text-gray-400 focus:text-black resize-none max-h-10 py-2"
                                v-model="paramForm[idx].description"></textarea>
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



const { createNewParam } = useRequest()
const paramForm = computed(() => {
    return currentRequest.value?.params || []
})
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = paramForm.value.every(eachForm => eachForm.key) || paramForm.value.length === 0
    console.log({ isAllFull })
    if (isAllFull) {
        createNewParam(currentRequest.value?.id ?? '')
    }
}

const handleCreateParams =() => {
    addNewBodyFormWhenOthersAreFull()
}
</script>

<style scoped></style>