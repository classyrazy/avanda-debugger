<template>
    <request-input ></request-input>
    <ul
        class="params-and-request-options requestoption flex gap-8  text-avanda-grey-dark font-medium text-sm nav-links">
        <li class="cursor-pointer nav-link capitalize" v-for="tab in computedTabNames" :key="tab"
            :class="requestStore.computedCurrentRequestHeader?.current_req_tab_model == tab ? 'active' : ''" @click="handleClickOnInnerTab(tab)">{{ tab }}</li>
    </ul>
    <!-- <v-tooltip label="Helloooooo world">
        <div class="">
            <p class="">Helloo</p>
            <p class="">Helloo</p>
            <p class="">Helloo</p>
        </div>
    </v-tooltip>
    <param-edit /> -->
    <keep-alive>
        <component :is="innerTabs[requestStore.computedCurrentRequestHeader?.current_req_tab_model ?? 'params']" />
    </keep-alive>
    <!-- Helllo -------{{ storeData.currentFolderId }} -->
</template>

<script setup lang="ts">
import BodyEdit from './body/BodyEdit.vue'
import ParamEdit from './params/ParamEdit.vue'
import VTooltip from '../forms/v-tooltip.vue'
import RequestInput from './RequestInput.vue'
import { useAppStore } from "~~/store/app";
import { useRequestStore } from "~~/store/request";
import {requestInnerTabs} from "~~/utils/types/appStyleTypes"

const storeData = useAppStore();
const requestStore = useRequestStore()

let currentRequestInnerTab = ref('params')
const computedCurrentTabDisplayed = computed(() => {
    return currentRequestInnerTab.value
})
interface innerTabs {
    [key: string]: object
}
const innerTabs: innerTabs = {
    'params': ParamEdit,
    'authorization': ParamEdit,
    'body': BodyEdit,
    'nestedFunction': ParamEdit
}
const computedTabNames = computed(() => {
    return Object.keys(innerTabs)
})
const handleClickOnInnerTab = (tab: requestInnerTabs) => {
    requestStore.changeCurrentRequestTabModel(tab)
}
</script>

<style scoped>
.requestoption li.nav-link {
    display: inline-block;
    position: relative;
    /* margin: auto; */
}

.requestoption li.nav-link::after {
    content: "";
    position: absolute;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    transform: scaleX(0);
    height: 2px;
    bottom: -3px;
    left: 0;
    background: var(--main-purple);
    transform-origin: bottom center;
    transition: transform 0.01s ease-out;
}

.requestoption li.nav-link.active:after {
    transform: scaleX(1);
    transform-origin: bottom center;
}
</style>