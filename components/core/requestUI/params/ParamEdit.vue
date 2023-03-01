hyuz<template>
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
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].key }"
                                @custom-change="updateFormData($event, 'key', idx)"></v-input></li>
                        <li class="border-r py-2"><v-input placeholder="Value" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].value }"
                                @custom-change="updateFormData($event, 'value', idx)"></v-input></li>
                        <li class="py-2">
                            <!-- <v-input placeholder="Description" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: paramForm[idx].description }"
                                @custom-change="updateFormData($event, 'description', idx)"></v-input> -->
                            <textarea placeholder="Description"
                                class="text-sm w-full flex items-center justify-center bg-transparent border-none appearance-none outline-0 text-gray-400 focus:text-black resize-none max-h-10"
                                v-model="paramForm[idx].description"></textarea>
                        </li>
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
const paramForm = computed(() => {
    return requestStore.computedCurrentMainRequest?.params.length ? requestStore.computedCurrentMainRequest?.params : [{
        key: "",
        value: "",
        description: "",
        active: true,
    }]
})
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = paramForm.value.every(eachForm => eachForm.key)
    // console.log({isAllFull})
    if (isAllFull) {
        paramForm.value.push({
            key: "",
            value: "",
            description: "",
            active: true,
        })
    }
    

}
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
    // console.log(paramForm.value)
})

const updateFormData = (data: string, column: [key: string], idx: number) => {

    paramForm.value[idx][column] = data
    addNewBodyFormWhenOthersAreFull()
    // console.log({ paramForm })
}
// watch(paramForm, (newVal) => {
//     requestStore.updateCurrentMainRequest({ params: newVal })
// })
</script>

<style scoped>

</style>