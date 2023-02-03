<template>
    <div class=" my-4">
        <div class="flex gap-4">
            <div class="grid grid-cols-8 gap-4 w-full border px-2 rounded-lg max-w-[70%]">
                <v-dropdown :drop-state="requestDropdownType"
                    dc-con-styles="request-type-dropdown flex gap-4 justify-between px-4 w-full items-center col-span-2 border-r"
                    dc-toggle-styles="w-full rounded-lg p-2" :useDefaultStyles="false" @handleDropdown="handleDropDown" @closeDropdown="handleCloseDropDown">
                    <template #label>
                        <div class="flex items-center">
                            <p class="text-md font-semibold text-post leading-4 select-none">POST </p>
                        </div>
                    </template>
                    <template #default>
                        <ul class="max-h-[200px] overflow-y-auto" v-if="requestsAvailable">
                            <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                v-for="(item, idx) in requestsAvailable" tabindex="0" :key="idx">
                                    <span class="text-xs uppercase font-semibold" :class="`text-${item.color}`">{{ item.name }}</span>
                            </li>
                        </ul>
                    </template>
                </v-dropdown>
                <div class="service-input col-span-2 border-r">
                    <v-input placeholder="RequestName" class="text-sm rounded-lg" type="text" size="small" full
                        style-type="avanda-grey-input"></v-input>
                </div>
                <div class="service-input col-span-4">
                    <v-input placeholder="Controller/ServiceName" class="text-sm rounded-lg" type="text" size="small"
                        full style-type="avanda-grey-input"></v-input>
                </div>
            </div>
            <v-button type="pry" class="w-auto">Send</v-button>
            <v-button type="pry" class="w-auto">Nested Function</v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import VDropdown from '../forms/v-dropdown.vue'
import VButton from '../forms/v-button.vue'
import VInput from '../forms/v-input.vue'
import DownIcon from '../../icons/down-icon.vue'
let requestDropdownType = ref(false)
let serviceLinkDropDownType = ref(false)
let countrySelected = ref(null)
let countriesAvailable = ref(null)
let requestsAvailable = reactive([
    {
        name: "GET",
        color: "get"

    },
    {
        name: "POST",
        color: "post"
    }
])
function handleDropDown() {
    requestDropdownType.value = !requestDropdownType.value;
}
function handleCloseDropDown() {
    requestDropdownType.value = false;
}
function handleServiceLinkDropDown() {
    serviceLinkDropDownType.value = !serviceLinkDropDownType.value;

}

</script>

<style scoped>

</style>