<template>
    <div class="pt-6">
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
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in modelvalues" :key="idx">
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2"><input placeholder="key" v-model="modelvalues[idx].key"
                                @keyup="handleUpdated"
                                class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none outline-0 py-1 px-1 text-gray-400 focus:text-black break-words w-full"
                                type="text"></li>
                        <li class="border-r py-2"><input placeholder="value" v-model="modelvalues[idx].value"
                                @keyup="handleUpdated"
                                class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none outline-0 py-1 px-1 text-gray-400 focus:text-black break-words w-full"
                                type="text"></li>
                        <li class="py-2 h-5">
                            <textarea placeholder="Description" v-model="modelvalues[idx].description"
                                @keyup="handleUpdated"
                                class="text-sm w-full flex items-center justify-center bg-transparent border-none appearance-none outline-0 text-gray-400 focus:text-black resize-none max-h-10"></textarea>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
let props = defineProps<{
    item: {
        active: boolean,
        key: string,
        value: string,
        description: string,
    }[]
}>()
console.log(props.item)
let emit = defineEmits(['updateParams'])
let modelvalues = ref(props.item)
const handleUpdated = () => {
    addNewBodyFormWhenOthersAreFull()
    emit('updateParams', modelvalues.value)
}
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = modelvalues.value.every(eachForm => eachForm.key)
    if (isAllFull) {
        modelvalues.value.push({
            key: "",
            value: "",
            description: "",
            active: true
        })
    }

}
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
})
</script>

<style scoped></style>