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
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2"><v-input placeholder="Key" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input" :value="{ value: columnForm[idx].key }"
                                @custom-change="updateFormData($event, 'key', idx)"></v-input></li>
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
const columnForm = computed(() => {
    return requestStore.computedCurrentMainRequest?.columns? requestStore.computedCurrentMainRequest?.columns : [{
        key: "",
        active: true
    }]
})
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = columnForm.value.every(eachForm => eachForm.key)
    console.log({isAllFull})
    if (isAllFull) {
     columnForm.value.push({
            key: "",
            active: true
        })
    }

}
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
    console.log(columnForm.value)
})

const updateFormData = (data: string, column: [key: string], idx: number) => {

 columnForm.value[idx][column] = data
    addNewBodyFormWhenOthersAreFull()
    console.log({ columnForm })
}
// watch columnForm, (newVal) => {
//     requestStore.updateCurrentMainRequest({ params: newVal })
// })
</script>

<style scoped>

</style>