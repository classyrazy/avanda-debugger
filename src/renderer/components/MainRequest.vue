<template>
    <section class="w-full relative">
        <DragRow class="" width="100%" height="90vh" :sliderWidth="5" :topPercent="70" sliderBgColor="#F9F9F9" v-if="requestTabs.length !== 0"
            sliderBgHoverColor="rgba(0, 0, 0, 0.44)">
            <template #top>
                <div class=" overflow-y-auto pb-16 h-full">
                    <request-input class="px-2 sticky top-0 z-20 bg-white"></request-input>
                    <ul
                        class="params-and-request-options requestoption flex gap-8  text-avanda-grey-dark font-medium text-sm nav-links mx-2">
                        <li class="cursor-pointer nav-link capitalize" v-for="tab in computedTabNames" :key="tab"
                            :class="currentTab?.current_req_tab_model == tab ? 'active' : ''" @click="handleUpdateCurrentInnerTab(tab)">{{ tab }}</li>
                    </ul>
                    {{  currentTabType }}
                    {{ computedTabNames }}
                    <keep-alive>
                    <component
                        :is="computedInnerTabs[currentTab?.current_req_tab_model ?? 'params']" />
                </keep-alive>
                </div>
            </template>
            <template #bottom>
                <div class="respoense border-t font-semibold text-md text-avanda-grey-dark">
                    <h3 class="pt-2 px-2">Response</h3>
                    <div class=" overflow-y-auto">
                        <div class="empty flex justify-center items-center min-h-[35vh]" v-if="true">
                            <ul class="marker:text-main-purple list-disc pl-5 space-y-3 text-avanda-grey-dark">
                                <li class="marker:.">
                                    <p>Name Your request</p>
                                </li>
                                <li class="">
                                    <p>Enter Your Service name</p>
                                </li>
                                <li class="">
                                    <p>Click send to get response . 🚀</p>
                                </li>
                            </ul>
                        </div>
                        <div class="" v-else>
                            <vue-json-pretty :data="currentRequestResponseData?.data" :editable="true" :show-icon="true"
                                editableTrigger="dblclick" />
                        </div>
                        <div class="w-full flex justify-center items-center" v-if="currentRequestResponseData?.loading">
                            <loader-icon class="" :size="50"></loader-icon>
                        </div>
                        <!-- {{ currentRequestResponseData?.loading }} -->
                    </div>
                </div>
            </template>
        </DragRow>
        <section v-else>
            Create Or Open a request to start
        </section>
    </section>
</template>

<script setup lang="ts">
import ParamEdit from './MainRequest/InnerTabs/Param/ParamEdit.vue'
import ColumnEdit from './MainRequest/InnerTabs/Column/ColumnEdit.vue'
import RequestInput from './MainRequest/RequestInput.vue'
import { DragRow } from "vue-resizer"
import { computed, ref, watchEffect } from 'vue'
import { requests,currentRequest } from '../composables/request/useRequest'
import { currentTab, useRequestTabs,currentTabType,requestTabs } from '../composables/request/useRequestTabs'
import { requestInnerTabs } from '../types/appStyleTypes'


const { handleUpdateCurrentInnerTab } = useRequestTabs()

let currentReqType = currentRequest.value?.requestData.type || 'get'
// const innerTabs: {
//     [x: string]: {}
//     get: object,
//     post: object
// } = {
//     get: {
//         columns: ColumnEdit,
//         'params': ParamEdit,
//         'nested Function': ColumnEdit
//     },
//     post: {
//         'params': ParamEdit,
//         'nested Function': ParamEdit,
//         'body': ParamEdit
//     }

// }
// const computedInnerTabComponent = computed(() => {
//     console.log({ReqType: currentRequest.value?.requestData.type})
//     // @ts-ignore
//     let currReqTypeModel = currentTab.value?.current_req_tab_model
//     return innerTabs[currentReqType][currentTab.value?.current_req_tab_model]
//     // switch (currentRequest.value?.requestData.type) {
//     //     case 'get':
//     //         return innerTabs.get[currReqTypeModel]
//     //     case 'post':
//     //         return innerTabs.post[currReqTypeModel]
//     //     default:
//     //         return innerTabs.get[currReqTypeModel]
//     // }
// })
// const computedTabNames = computed(() => {
//     return Object.keys(innerTabs[currentReqType]) as requestInnerTabs[]
// })
// let innerTabNames = Object.keys(innerTabs[currentReqType]) as requestInnerTabs[]
// watchEffect(() => {
//     currentReqType = currentRequest.value?.requestData.type || 'get'
//     innerTabNames = Object.keys(innerTabs[currentReqType]) as requestInnerTabs[]
// })
interface innerTabs {
    [key: string]: object
}
const innerTabsGet: innerTabs = {
    columns: ColumnEdit,
    'params': ParamEdit,
    // 'authorization': ParamEdit,
    'nested Function': ParamEdit

}
const innerTabsPost: innerTabs = {
    'params': ParamEdit,
    // 'authorization': ParamEdit,
    'body': ParamEdit,
    'nested Function': ParamEdit

}
const computedInnerTabs = computed(() => {
    if (currentRequest.value?.requestData.type == 'get') {
        return innerTabsGet
    } else {
        return innerTabsPost
    }
})

const computedTabNames = computed(() => {
    return Object.keys(computedInnerTabs.value) as requestInnerTabs[]
})
</script>

<style scoped></style>