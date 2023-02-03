<template>
    <div>
        <h3 class="text-md">Body</h3>
        <p class="text-sm">Your body Data</p>
        <div class="body-table border-t border-b">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-[0.5px] border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase">Key</p>
                        </li>
                        <li class="py-[0.5px] border-r">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Value</p>
                        </li>
                        <li class="py-[0.5px]">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Description</p>
                        </li>
                    </ul>
                </div>
                <div class="relative">
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2">
                        <li class="border-r py-1 flex items-center">
                            <v-input placeholder="Key" class="text-sm" type="text" size="small" full
                                style-type="avanda-grey-input"></v-input>
                            <v-dropdown :drop-state="requestKeyTypeDropdown"
                                dc-con-styles="request-type-dropdown flex gap-4 justify-between  items-center border-r"
                                dc-toggle-styles="rounded-lg p-2" :useDefaultStyles="false"
                                @handleDropdown="handleRequestKeyTypeDropdown" @closeDropdown="handleCloseDropDown" >
                                <template #label>
                                    <div class="flex items-center">
                                        <p class="text-md font-medium text-avanda-grey-dark">{{currentItemChosen.text}} </p>
                                    </div>
                                </template>
                                <template #default>
                                    <ul class="max-h-[200px] overflow-y-auto" v-if="requestKeyTypesAvailable">
                                        <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-1"
                                            v-for="(item, idx) in requestKeyTypesAvailable" tabindex="0" :key="idx" @click="handleChosenFromDropdown(item)">
                                            <span class="text-xs font-semibold">{{ item.text }}</span>
                                        </li>
                                    </ul>
                                </template>
                            </v-dropdown>
                        </li>
                        <li class="border-r flex items-center"><v-input placeholder="Value" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input"></v-input></li>
                        <li class="flex items-center"><v-input placeholder="Description" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input"></v-input></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VDropdown from '../../forms/v-dropdown.vue'
import VInput from '../../forms/v-input.vue'
const requestKeyTypesAvailable = reactive([
    { text: "file" },
    { text: "text" }
])
const requestKeyTypeDropdown = ref(false)
const currentItemChosen = ref(requestKeyTypesAvailable[0])
const handleRequestKeyTypeDropdown = () => {
    requestKeyTypeDropdown.value = !requestKeyTypeDropdown.value
}
const handleCloseDropDown = () => {
    requestKeyTypeDropdown.value = false
}
const handleChosenFromDropdown = (item: any) => {
    currentItemChosen.value = item
    handleCloseDropDown()
}

</script>

<style scoped>

</style>