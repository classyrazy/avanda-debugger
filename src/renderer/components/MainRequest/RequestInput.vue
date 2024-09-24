<template>
    <div class=" my-4">
        <div class="flex gap-4">
            <div class="grid grid-cols-8 gap-4 w-full border px-2 rounded-lg max-w-[90%]">
                <v-dropdown :drop-state="requestDropdownType"
                    dc-con-styles="request-type-dropdown flex gap-4 justify-between px-4 w-full items-center col-span-2 border-r"
                    dc-toggle-styles="w-full rounded-lg p-2" :useDefaultStyles="false" @handleDropdown="handleDropDown"
                    @closeDropdown="handleCloseDropDown">
                    <template #label>
                        <div class="flex items-center">
                            <p class="text-md font-semibold leading-4 select-none uppercase  max-w-[100px]"
                                :class="`text-${computedRequestBasedOnString?.color}`">
                                {{ computedRequestBasedOnString?.name }} </p>
                        </div>
                    </template>
                    <template #default>
                        <ul class="max-h-[200px] overflow-y-auto" v-if="requestsTypeAvailable">
                            <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                @click="handleChosenFromDropdown(item)" v-for="(item, idx) in requestsTypeAvailable"
                                tabindex="0" :key="idx">
                                <span class="text-xs uppercase font-semibold" :class="`text-${item.color}`">{{
                                    item.name
                                    }}</span>
                            </li>
                        </ul>
                    </template>
                </v-dropdown>
                <div class="service-input col-span-4 flex items-center">
                    <input placeholder="Controller/ServiceName"
                        class="text-sm rounded-lg my-auto w-full bg-transparent border-none inline-block appearance-none px-2"
                        type="text" v-model="reqData.serviceName">
                </div>
            </div>
            <v-button type="bordered_black" size="small">
                <CodeIcon />
            </v-button>
            <v-button type="pry" class="w-auto px-6" size="small"
                @click="handleCallService(currentRequest)">Send</v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CodeIcon from '../icons/code-icon.vue'
// @ts-ignore
import VDropdown from '../core/forms/v-dropdown.vue'
// @ts-ignore
import VButton from '../core/forms/v-button.vue'
import { computed, ref } from 'vue';
import { requestsTypeAvailable } from "../../composables/request/useRequest"
import { currentRequest, useRequest } from '../../composables/request/useRequest';
import requestType from '../../types/requestType';
import { handleCallService } from '../../composables/request/useServiceCaller';


let requestDropdownType = ref(false)
const requestData = computed(() => {
    return {
        type: 'get' as requestType,
        name: '',
        serviceName: ''
    }
})
const reqData = computed(() => {
    if (currentRequest.value) {
        return currentRequest.value.requestData
    }
    return requestData.value
})
const { updateRequestType } = useRequest()

function handleDropDown() {
    requestDropdownType.value = !requestDropdownType.value;
}
function handleCloseDropDown() {
    requestDropdownType.value = false;
}

function handleChosenFromDropdown(item: { name: requestType, color: string }) {
    updateRequestType(currentRequest.value?.id ?? "", item.name)
    handleCloseDropDown()
}
const computedRequestBasedOnString = computed(() => {
    return requestsTypeAvailable.find((item) => item.name === currentRequest.value?.requestData.type)
})

</script>

<style scoped>
input:focus {
    outline: none;
}
</style>