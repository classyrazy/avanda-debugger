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
                    <!-- <t-input placeholder="RequestName" class="text-sm rounded-lg my-auto" type="text" size="small" full
                        style-type="avanda-grey-input" :value="requestData.name"
                        @custom-change="updateFormData($event, 'name')"></t-input> -->
                    <input placeholder="RequestName"
                        class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none"
                        type="text" v-model="requestData.name">
                </div>
                <div class="service-input col-span-4 flex items-center">
                    <input placeholder="Controller/ServiceName"
                        class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none"
                        type="text" v-model="requestData.serviceName">
                </div>
            </div>
            <v-button type="pry" class="w-auto">Send</v-button>
            <v-button type="pry" class="w-auto">Nested Function</v-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import TInput from '../forms/t-input.vue'
import VDropdown from '../forms/v-dropdown.vue'
import VButton from '../forms/v-button.vue'
import VInput from '../forms/v-input.vue'
import DownIcon from '../../icons/down-icon.vue'
import { useRequestStore } from "~~/store/request";
import requestType from '~~/utils/types/requestType';


// interface Props {
//     currentrequestTypeProp: requestType
// }
// const props = defineProps<Props>()
const requestStore = useRequestStore()
const currentRequest = computed(() => requestStore.computedCurrentMainRequest)
let requestDropdownType = ref(false)
let serviceLinkDropDownType = ref(false)
// const currentRequestType = ref(props.currentrequestTypeProp ?? 'get')
const currentRequestType = ref<requestType>(requestStore.computedCurrentMainRequest?.requestData.type ?? 'get')
const requestData = computed(() => {
    return requestStore.computedCurrentMainRequest?.requestData ?? {
        type: 'get',
        name: '',
        serviceName: ''
    }
})


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
    requestData.value.type = item.name
    requestStore.changeRequestTypeOnHeader(item.name)
    handleCloseDropDown()
}
const computedRequestBasedOnString = computed(() => {
    return requestStore.requestTypeAvailable.find((item) => item.name === requestData.value.type)
})
const requestsForms = reactive({
    serviceName: {
        value: requestData.value.serviceName,
        error: null
    },
    name: {
        value: requestData.value.name,
        error: null
    }
})

const updateFormData = (data: string, column: [key: string]) => {
    requestData.value[column] = data
    console.log({ requestData })
}

</script>

<style scoped>
input:focus {
    outline: none;
}
</style>