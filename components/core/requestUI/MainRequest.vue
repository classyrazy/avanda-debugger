<template>
    <section>
        <section class="relative" v-if="requestStore.requestsHeaderTabs.length !== 0">
            <div class=" max-h-[50vh] overflow-y-auto pb-16 min-h-[46vh]">
                <request-input class="px-2 sticky top-0 z-20 bg-white"></request-input>
                <ul
                    class="params-and-request-options requestoption flex gap-8  text-avanda-grey-dark font-medium text-sm nav-links mx-2">
                    <li class="cursor-pointer nav-link capitalize" v-for="tab in computedTabNames" :key="tab"
                        :class="requestStore.computedCurrentRequestHeader?.current_req_tab_model == tab ? 'active' : ''"
                        @click="handleClickOnInnerTab(tab)">{{ tab }}</li>
                </ul>
                <keep-alive>
                    <component
                        :is="innerTabs[requestStore.computedCurrentRequestHeader?.current_req_tab_model ?? 'params']" />
                </keep-alive>
            </div>
            <div class="respoense border-t font-semibold text-md text-avanda-grey-dark">
                <h3 class="pt-2 px-2">Response</h3>
                <div class="max-h-[38vh] overflow-y-auto">
                    <div class="empty flex justify-center items-center min-h-[35vh]" v-if="!currentRequestResponseData.data">
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
                        <vue-json-pretty :data="currentRequestResponseData.data" :editable="true" :show-icon="true" :editableTrigger="dblclick" />
                    </div>
                </div>
            </div>
        </section>
        <section v-else>
            Create Or Open a request to start
        </section>
    </section>
</template>

<script setup lang="ts">
import NestedFunctionEdit from './nestedFunction/NestedFunctionEdit.vue'
import ColumnEdit from './column/ColumnEdit.vue'
import BodyEdit from './body/BodyEdit.vue'
import ParamEdit from './params/ParamEdit.vue'
import VTooltip from '../forms/v-tooltip.vue'
import RequestInput from './RequestInput.vue'
import { useAppStore } from "~~/store/app";
import { useRequestStore } from "~~/store/request";
import { requestInnerTabs } from "~~/utils/types/appStyleTypes"
import VueJsonPretty from 'vue-json-pretty';

import 'vue-json-pretty/lib/styles.css';
const storeData = useAppStore();
const requestStore = useRequestStore()

let currentRequestInnerTab = ref('params')
const computedCurrentTabDisplayed = computed(() => {
    return currentRequestInnerTab.value
})
const currentRequestResponseData = computed(() => {
    return requestStore.computedCurrentMainRequest?.responseData ?? {
        type: "get",
        data :{
            key: "value"
        }
    }
})
interface innerTabs {
    [key: string]: object
}
const innerTabsGet: innerTabs = {
    columns: ColumnEdit,
    'params': ParamEdit,
    // 'authorization': ParamEdit,
    'nestedFunction': NestedFunctionEdit

}
const innerTabsPost: innerTabs = {
    columns: ColumnEdit,
    'params': ParamEdit,
    // 'authorization': ParamEdit,
    'body': BodyEdit,
    'nestedFunction': NestedFunctionEdit

}
const innerTabs = computed(() => {
    if (requestStore.computedCurrentMainRequest?.requestData.type == 'get') {
        return innerTabsGet
    } else {
        return innerTabsPost
    }
})

const computedTabNames = computed(() => {
    return Object.keys(innerTabs.value)
})
const handleClickOnInnerTab = (tab: requestInnerTabs) => {
    requestStore.changeCurrentRequestTabModel(tab)
}
// watch(currentTabId, (val) => {
//     if (val == props.node.id) {
//         console.log("watching and updating")
//         storeData.updateCurrentFolder(props.node.parentFolderId ?? '')
//     }
// })
</script>

<style scoped>

</style>