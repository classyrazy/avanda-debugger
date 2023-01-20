<template>
    <div class="px-4 my-4">
        <div class="flex gap-4">
            <div class="grid grid-cols-8 gap-4 w-full border px-2 rounded-lg max-w-[70%]">
                <!-- <div class="request-type-dropdown flex gap-4 justify-between px-4 items-center col-span-2 border-r">
                    <p class="text-md font-semibold text-post-request-yellow leading-4">POST </p>
                    <down-icon></down-icon>
                </div> -->
                <v-dropdown :drop-state="requestDropdownType"
                    dc-con-styles="request-type-dropdown flex gap-4 justify-between px-4 w-full items-center col-span-2 border-r"
                    dc-toggle-styles="w-full rounded-lg p-2" :useDefaultStyles="false" @handleDropdown="handleDropDown">
                    <template #label>
                        <div class="flex items-center">
                            <!-- <span class=""> -->
                            <p class="text-md font-semibold text-post-request-yellow leading-4 select-none">POST </p>
                            <!-- </span> -->
                        </div>
                    </template>
                    <template #default>
                        <ul class="max-h-[200px] overflow-y-auto" v-if="requestsAvailable">
                            <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                v-for="(item, idx) in requestsAvailable" tabindex="0" :key="idx">
                                <div class="flex items-center">
                                    <span class="text-xs">{{ item }}</span>
                                </div>
                                <!-- {{item.name}} -->
                            </li>
                        </ul>
                    </template>
                    <!-- <p v-else>Loading ...</p> -->
                </v-dropdown>

                <!-- <div class="microservice-link-chosen flex gap-4 justify-between px-4 border-r items-center col-span-2">
                    <p class="grad-text-1">{BASEURL} </p>
                    <down-icon></down-icon>
                </div> -->
                <v-dropdown :drop-state="serviceLinkDropDownType"
                    dc-con-styles="request-type-dropdown flex gap-4 justify-between px-4 w-full items-center col-span-2 border-r"
                    dc-toggle-styles="w-full rounded-lg p-2" :useDefaultStyles="false"
                    @handleDropdown="handleServiceLinkDropDown">
                    <template #label>
                        <div class="flex items-center">
                            <!-- <span class=""> -->
                            <p class="text-md font-semibold text-post-request-yellow leading-4 select-none">POST </p>
                            <!-- </span> -->
                        </div>
                    </template>
                    <template #default>
                        <ul class="max-h-[200px] overflow-y-auto" v-if="requestsAvailable">
                            <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                v-for="(item, idx) in requestsAvailable" tabindex="0" :key="idx">
                                <div class="flex items-center">
                                    <span class="text-xs">{{ item }}</span>
                                </div>
                            </li>
                        </ul>
                    </template>
                </v-dropdown>
                <div class="service-input col-span-4">
                    <v-input placeholder="ServiceNameOne" class="text-sm rounded-lg" type="text" size="small" full
                        style-type="avanda-grey-input"></v-input>
                </div>
            </div>
            <div class="">
                <v-button full type="pry">Sign Up</v-button>
            </div>
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
        color: "text-get-request-green"

    },
    {
        name: "POST",
        color: "text-post-request-yellow"
    }
])
function handleDropDown() {
    requestDropdownType.value = !requestDropdownType.value;
}
function handleServiceLinkDropDown() {
    serviceLinkDropDownType.value = !serviceLinkDropDownType.value;

}

</script>

<style scoped>

</style>