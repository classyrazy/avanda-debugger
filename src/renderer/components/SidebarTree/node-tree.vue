<template>
    <li class="node-tree">
        <div class="flex gap-2 items-center">
            <toggle-side-open-icon v-if="node.type === 'folder'"
                @click="handleToggleOpenFolder" class="cursor-pointer inline-block"
                :class="toggleOpenFolder ? 'rotate-90' : ''"></toggle-side-open-icon>
            <!-- <span class="name" > -->
            <v-tooltip :label="node.name" @label-click="handleNodeClick"
                :class="node.type === 'folder' ? '' : 'pl-6'"
                d-menu-styles="border shadow-md"
                :dc-con-styles="node.type === 'request' && currentRequestId == node.id ? 'bg-purple-200' : ''">
                <ul class="max-h-[200px] overflow-y-auto"
                    v-if="node.type === 'folder'">
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                        v-for="(item, idx) in folderOptions" tabindex="0" :key="idx">
                        <div class="flex items-center">
                            <span class="text-xs">{{ item.label }}</span>
                        </div>
                        <!-- {{item.name}} -->
                    </li>
                </ul>
                <ul class="max-h-[200px] overflow-y-auto" v-else>
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-1 p-1"
                        v-for="(item, idx) in requestOptions" tabindex="0" :key="idx">
                        <div class="flex items-center">
                            <span class="text-xs"> {{ item.label }}</span>
                        </div>
                        <!-- {{item.name}} -->
                    </li>
                </ul>
            </v-tooltip>
            <!-- </span> -->
        </div>
        <ul v-if="node.children && node.children.length" class="pl-4" :class="toggleOpenFolder ? 'block' : 'hidden'">
            <node-tree v-for="(child, idx) in node.children" :node="child" :key="idx"></node-tree>
        </ul>
    </li>
</template>

<script setup lang="ts">
import NodeTree from './node-tree.vue'
import VTooltip from '../core/forms/v-tooltip.vue'
import ToggleSideOpenIcon from '../icons/toggle-side-open-icon.vue'
import TreeItem from '../../types/TreeItem'
import {folderOptions, requestOptions,} from "../../composables/useFolder"
import { currentTabId } from '../../composables/request/useRequestTabs'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useFolder } from '../../composables/useFolder'
import { currentRequestId } from '../../composables/request/useRequest'
import { useRequestTabs } from '../../composables/request/useRequestTabs'
interface Props {
    node: TreeItem
}
let props = defineProps<Props>();
const router = useRouter()

const {handleUpdateCurrentFolderId} = useFolder()
const {addTabToRequestTabs} = useRequestTabs()
let toggleOpenFolder = ref<boolean>(false)
let handleToggleOpenFolder = () => {
    toggleOpenFolder.value = !toggleOpenFolder.value
}
// let currentTabId = computed(() => {
//     requestStore.setcurrentRequestheaderId(useRoute().query.t ?? '')
//     return useRoute().query.t
// })
const handleNodeClick = () => {
    console.log("node clicked")
    if (props.node.type === 'folder') {
        handleUpdateCurrentFolderId(props.node.id ?? '')
        return
    }else{

        router.push({ query: { t: props.node.id } })
    }
}
// watch(currentTabId, (val) => {
//     if (val == props.node.id) {
//         // console.log("watching and updating")
//         storeData.updateCurrentFolder(props.node.parentFolderId ?? '')
//     }
// })
</script>