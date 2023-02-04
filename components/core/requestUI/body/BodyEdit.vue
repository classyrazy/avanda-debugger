<template>
    <div>
        <h3 class="text-md mx-4 my-2">Body</h3>
        <div class="body-table border-t">
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
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in BodyForm" :key="idx">
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2">
                        <key-input :key-value="BodyForm[idx].key" :is-file="BodyForm[idx].file"
                            @key-type-update="handleKeyTypeUpdate" :idx="idx"
                            @key-up-change="updateBodyFormData($event, 'key')"></key-input>
                        <li class="border-r flex items-center">
                            <v-input placeholder="Value" class="text-sm text-gray-400 focus:text-black" type="text"
                                size="small" full style-type="avanda-grey-input" :value="{ value: BodyForm[idx].value }"
                                v-if="!eachForm.file"
                                @custom-change="updateBodyFormData($event, 'value', true, idx)"></v-input>
                            <v-input placeholder="Value" class="text-sm text-gray-400 focus:text-black" type="file"
                                size="small" full style-type="search" v-if="BodyForm[idx].file"></v-input>

                        </li>
                        <li class="flex items-center"><v-input placeholder="Description"
                                class="text-sm text-gray-400 focus:text-black" type="text" size="small" full
                                style-type="avanda-grey-input" :value="{ value: BodyForm[idx].description }" @custom-change="updateBodyFormData($event, 'description', true, idx)"></v-input>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import KeyInput from './key-input.vue'
import VInput from '../../forms/v-input.vue'
import { useRequestStore } from '~~/store/request';

const requestStore = useRequestStore()
const BodyForm = requestStore.computedCurrentMainRequest?.body ??
    [{
        key: "",
        value: "",
        description: "",
        active: true,
        file: false
    }]
const requestKeyTypesAvailable = reactive([
    { text: "file" },
    { text: "text" }
])
onMounted(() => {
    addNewBodyFormWhenOthersAreFull()
})
// const BodyForm = reactive<{
//     key: string,
//     value: string | File,
//     description: string,
//     active: boolean,
//     file: boolean,
//     fileName?: string

// }[]>([
//     {
//         key: "username",
//         value: "classyrazy",
//         description: "This is the username of the user",
//         active: true,
//         file: false
//     },
//     {
//         key: "profile_picture",
//         value: "",
//         description: "This is the profile picture of the user",
//         active: false,
//         file: true,
//         fileName: "profile_picture.png"
//     }
// ])
const requestKeyTypeDropdown = ref(false)
const currentItemChosen = ref(requestKeyTypesAvailable[0])
const handleRequestKeyTypeDropdown = () => {
    requestKeyTypeDropdown.value = !requestKeyTypeDropdown.value
}
const handleCloseDropDown = () => {
    requestKeyTypeDropdown.value = false
}
const handleKeyTypeUpdate = (data: { text: "file" | "text", idx: number }) => {
    BodyForm[data.idx].file = data.text === "file" ? true : false
}

const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = BodyForm.every(eachForm => eachForm.key)
    console.log({ isAllFull, BodyForm })
    if (isAllFull) {
        BodyForm.push({
            key: "",
            value: "",
            description: "",
            active: false,
            file: false
        })
    }

}
const updateBodyFormData = (data: { text: string, idx: number } | string, column: [key: string], defaultEmit: boolean = false, idx: number = data.idx) => {
    if (defaultEmit) {
        BodyForm[idx][column] = data
    } else {
        BodyForm[data.idx][column] = data.text
    }
    addNewBodyFormWhenOthersAreFull()
    console.log({ BodyForm })
}

</script>

<style scoped>

</style>