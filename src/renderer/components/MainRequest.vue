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
                    <keep-alive>
                    <component
                        :is="computedInnerTabs[currentTab?.current_req_tab_model ?? 'params']" />
                </keep-alive>
                </div>
            </template>
            <template #bottom>
                <div class="respoense border-t font-semibold text-md text-avanda-grey-dark overflow-y-auto h-full">
                    <h3 class="pt-2 px-2 sticky top-0 bg-white py-2 z-[10]">Response</h3>
                    <div class=" ">
                        <div class="empty flex justify-center items-center min-h-[35vh]" v-if="!currentRequest?.responseData.data">
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
                            <vue-json-pretty :data="currentRequest?.responseData.data" :editable="true" :show-icon="true"
                                editableTrigger="dblclick" />
                        </div>
                        <div class="w-full flex justify-center items-center" v-if="currentRequest?.responseData.loading">
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
import NestedFunctionEdit from './MainRequest/NestedRequest/NestedFunctionEdit.vue'
import ParamEdit from './MainRequest/InnerTabs/Param/ParamEdit.vue'
import ColumnEdit from './MainRequest/InnerTabs/Column/ColumnEdit.vue'
import RequestInput from './MainRequest/RequestInput.vue'
import { DragRow } from "vue-resizer"
import { computed, onMounted, ref, watchEffect } from 'vue'
import { requests,currentRequest } from '../composables/request/useRequest'
import { currentTab, useRequestTabs,currentTabType,requestTabs } from '../composables/request/useRequestTabs'
import { requestInnerTabs } from '../types/appStyleTypes'
import VueJsonPretty from 'vue-json-pretty';
import JsonEditor from 'vue3-ts-jsoneditor';
import 'vue-json-pretty/lib/styles.css';
import BearerEdit from './MainRequest/Authorisation/BearerEdit.vue'
import BodyEdit from './MainRequest/InnerTabs/Body/BodyEdit.vue'
import { allEnvironValues } from '../composables/useAppConfig'


const { handleUpdateCurrentInnerTab } = useRequestTabs()

let currentReqType = currentRequest.value?.requestData.type || 'get'
interface innerTabs {
    [key: string]: object
}
const innerTabsGet: innerTabs = {
    'authorization': BearerEdit,
    columns: ColumnEdit,
    'params': ParamEdit,
    'nested Function': NestedFunctionEdit

}
const innerTabsPost: innerTabs = {
    'authorization': BearerEdit,
    'params': ParamEdit,
    'body': BodyEdit,

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
onMounted(() => {
    if(allEnvironValues.value['token'].trim() !== '' && currentRequest.value && typeof currentRequest.value?.authorisation.token == 'string') {
        console.log("testttt")
        currentRequest.value.authorisation.token = {key: 'token'}
        console.log('token', currentRequest.value.authorisation.token)
    }
})
</script>

<style scoped></style>