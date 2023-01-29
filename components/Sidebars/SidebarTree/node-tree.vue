<template>
    <li class="node-tree">
        <div class="flex gap-2 items-center">
            <toggle-side-open-icon v-if="(node.children && node.children.length) || node.isFolderEmpty"
                @click="handleToggleOpenFolder" class="cursor-pointer inline-block"
                :class="toggleOpenFolder ? 'rotate-90' : ''"></toggle-side-open-icon>
            <!-- <span class="name" > -->
            <v-tooltip :label="node.name" @label-click="handleNodeClick"
                :class="(node.children && node.children.length) || node.isFolderEmpty ? '' : 'ml-6'"
                d-menu-styles="border shadow-md"
                :dc-con-styles="!(node.children && node.children.length) && currentTabId == node.id ? 'bg-black' : ''">
                <ul class="max-h-[200px] overflow-y-auto"
                    v-if="(node.children && node.children.length) || node.isFolderEmpty">
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                        v-for="(item, idx) in collectionOption" tabindex="0" :key="idx">
                        <div class="flex items-center">
                            <span class="text-xs">{{ item.label }}</span>
                        </div>
                        <!-- {{item.name}} -->
                    </li>
                </ul>
                <ul class="max-h-[200px] overflow-y-auto" v-else>
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-1 p-1"
                        v-for="(item, idx) in requestOption" tabindex="0" :key="idx">
                        <div class="flex items-center">
                            <span class="text-xs">{{ item.label }}</span>
                        </div>
                        <!-- {{item.name}} -->
                    </li>
                </ul>
            </v-tooltip>
            <!-- </span> -->
        </div>
        <ul v-if="node.children && node.children.length" class="ml-4" :class="toggleOpenFolder ? 'block' : 'hidden'">
            <node-tree v-for="(child, idx) in node.children" :node="child" :key="idx"></node-tree>
        </ul>
    </li>
</template>

<script setup lang="ts">
import VTooltip from '../../core/forms/v-tooltip.vue'
import ToggleSideOpenIcon from '../../icons/toggle-side-open-icon.vue'
import NodeTree from './node-tree.vue'
import { useAppDataOption } from '~~/composables/useAppDataOptions';
import { useAppStore } from "~~/store/app";
const storeData = useAppStore();
interface Props {
    node: {
        id?: string;
        name?: string;
        children?: object[];
        isFolderEmpty?: boolean;
        parentFolderId?: string | null;
    };
}
let { collectionOption, requestOption } = useAppDataOption()
let props = defineProps<Props>();
let toggleOpenFolder = ref<boolean>(false)
let handleToggleOpenFolder = () => {
    toggleOpenFolder.value = !toggleOpenFolder.value
}
let currentTabId = computed(() => {
    return useRoute().query.t
})
const handleNodeClick = () => {
    if (props.node.children && props.node.children.length) {
        storeData.updateCurrentFolder(props.node.id ?? '')
        return
    }
    // storeData.updateCurrentFolder(props.node.parentFolderId ?? props.node.id ?? '')
    useRouter().push({ query: { t: props.node.id } })
}
watch(currentTabId, (val) => {
    if (val == props.node.id) {
        console.log("watching and updating")
        storeData.updateCurrentFolder(props.node.parentFolderId ?? props.node.id ?? '')
    }
})
</script>