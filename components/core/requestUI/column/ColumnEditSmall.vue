<template>
    <div class="pt-6">
        <div class="param-table border-t">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-1 border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase text-sm">Columns</p>
                        </li>
                    </ul>
                </div>
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in modelvalues" :key="idx">
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2"><input placeholder="key"
                            class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none outline-0 py-1 px-1 text-gray-400 focus:text-black break-words w-full"
                            type="text" v-model="modelvalues[idx].key" @keyup="handleUpdated"></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let props = defineProps<{
    item: {
        active:boolean,
        key:string,
    }[]
}>()
console.log(props.item)
let emit  = defineEmits(['updateColumns'])
let modelvalues = ref(props.item)
const handleUpdated = () => {
    addNewBodyFormWhenOthersAreFull()
    emit('updateColumns', modelvalues.value)
}
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = modelvalues.value.every(eachForm => eachForm.key)
    if (isAllFull) {
        modelvalues.value.push({
            key: "",
            active: true
        })
    }

}
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
})
</script>

<style scoped>

</style>