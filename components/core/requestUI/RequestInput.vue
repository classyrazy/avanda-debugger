<template>
    <div class=" my-4">
        <div class="flex gap-4">
            <div class="grid grid-cols-8 gap-4 w-full border px-2 rounded-lg max-w-[70%]">
                <v-dropdown :drop-state="requestDropdownType"
                    dc-con-styles="request-type-dropdown flex gap-4 justify-between px-4 w-full items-center col-span-2 border-r"
                    dc-toggle-styles="w-full rounded-lg p-2" :useDefaultStyles="false" @handleDropdown="handleDropDown"
                    @closeDropdown="handleCloseDropDown">
                    <template #label>
                        <div class="flex items-center">
                            <p class="text-md font-semibold leading-4 select-none uppercase"
                                :class="`text-${computedRequestBasedOnString?.color}`">
                                {{ computedRequestBasedOnString?.name }} </p>
                        </div>
                    </template>
                    <template #default>
                        <ul class="max-h-[200px] overflow-y-auto" v-if="requestsAvailable">
                            <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                                @click="handleChosenFromDropdown(item)"
                                v-for="(item, idx) in requestStore.requestTypeAvailable" tabindex="0" :key="idx">
                                <span class="text-xs uppercase font-semibold" :class="`text-${item.color}`">{{
                                    item.name
                                }}</span>
                            </li>
                        </ul>
                    </template>
                </v-dropdown>
                <div class="service-input col-span-2 border-r flex items-center">
                    <v-input placeholder="RequestName" class="text-sm rounded-lg my-auto" type="text" size="small" full
                        style-type="avanda-grey-input" :value="requestsForms.name" @custom-change="updateFormData($event, 'name')"></v-input>
                </div>
                <div class="service-input col-span-4 flex items-center">
                    <v-input placeholder="Controller/ServiceName" class="text-sm rounded-lg" type="text" size="small"
                        full style-type="avanda-grey-input" :value="requestsForms.serviceName" @custom-change="updateFormData($event, 'serviceName')"></v-input>
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
import { useRequestStore } from "~~/store/request";
import requestType from '~~/utils/types/requestType';


const requestStore = useRequestStore()
const currentRequest = computed(() => requestStore.computedCurrentMainRequest)
let requestDropdownType = ref(false)
let serviceLinkDropDownType = ref(false)

const currentRequestType = ref<requestType>(requestStore.computedCurrentMainRequest?.requestData.type ?? 'get')
const requestData = requestStore.computedCurrentMainRequest?.requestData ?? {
    type: 'get',
    name: '',
    serviceName: ''
}


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
function handleChosenFromDropdown(item: any) {
    currentRequestType.value = item.name
    requestData.type = item.name
    handleCloseDropDown()
}
const computedRequestBasedOnString = computed(() => {
    return requestStore.requestTypeAvailable.find((item) => item.name === currentRequestType.value)
})
const requestsForms = reactive({
    serviceName: {
        value: requestData.serviceName,
        error: null
    },
    name:{
        value: requestData.name,
        error: null
    }
})

const updateFormData = (data: string, column: [key: string]) => {
    requestData[column] = data
    console.log({ requestData })
}

</script>

<style scoped>

</style>