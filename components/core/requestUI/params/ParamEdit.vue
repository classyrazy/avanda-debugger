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
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2"><v-input placeholder="Key" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].key }" @custom-change="updateFormData($event, 'key', idx)"></v-input></li>
                        <li class="border-r py-2"><v-input placeholder="Value" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].value }" @custom-change="updateFormData($event, 'value', idx)"></v-input></li>
                        <li class="py-2"><v-input placeholder="Description" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].description }" @custom-change="updateFormData($event, 'description', idx)"></v-input></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VInput from '../../forms/v-input.vue'
import { useRequestStore } from '~~/store/request';

const requestStore = useRequestStore()
const paramForm = requestStore.computedCurrentMainRequest?.params ?? []
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = paramForm.every(eachForm => eachForm.key)
    console.log({ isAllFull, paramForm })
    if (isAllFull) {
        paramForm.push({
            key: "",
            value: "",
            description: "",
            active: false,
        })
    }

}
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
})

const updateFormData = (data: string, column: [key: string], idx: number) => {

    paramForm[idx][column] = data
    addNewBodyFormWhenOthersAreFull()
    console.log({ paramForm })
}
</script>

<style scoped>

</style>