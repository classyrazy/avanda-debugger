<template>
    <li class="node-tree">
        <div class="flex gap-2 items-center">
            <toggle-side-open-icon v-if="node.type === 'folder'" @click="handleToggleOpenFolder"
                class="cursor-pointer inline-block w-7 h-7"
                :class="toggleOpenFolder ? 'rotate-90' : ''"></toggle-side-open-icon>
            <v-tooltip :label="node.name" @label-click="handleNodeClick"
                @label-dbl-click="handleRenameFolderOrReqName(node)" :class="node.type === 'folder' ? '' : 'pl-6'"
                d-menu-styles="border shadow-md"
                :dc-con-styles="node.type === 'request' && currentRequestId == node.id ? 'bg-purple-200' : ''" :options="node.type === 'folder'? folderOptions: requestOptions" @option-click="node.type === 'folder'? handleFolderOptions($event, node): handleRequestOptions($event, node)">
            </v-tooltip>
        </div>
        <ul v-if="node.children && node.children.length" class="pl-4" :class="toggleOpenFolder ? 'block' : 'hidden'">
            <node-tree v-for="(child, idx) in node.children" :node="child" @rename-node="$emit('renameNode', $event)"
                @create-new-folder="$emit('createNewFolder')" @create-new-request="$emit('createNewRequest')"
                :key="idx"></node-tree>
        </ul>
    </li>
</template>

<script setup lang="ts">
import NodeTree from './node-tree.vue'
import VTooltip from '../core/forms/v-tooltip.vue'
import ToggleSideOpenIcon from '../icons/toggle-side-open-icon.vue'
import TreeItem from '../../types/TreeItem'
import { currentFolderId, folderOptions, requestOptions } from "../../composables/useFolder"
import { currentTabId } from '../../composables/request/useRequestTabs'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useFolder, handleFolderIconClick } from '../../composables/useFolder'
import { currentRequestId, useRequest } from '../../composables/request/useRequest'
import { useRequestTabs } from '../../composables/request/useRequestTabs'
interface Props {
    node: TreeItem
}
let props = defineProps<Props>();
const router = useRouter()
const emit = defineEmits(['renameNode', 'createNewFolder', 'createNewRequest'])
const { handleUpdateCurrentFolderId, deleteNodeById, copyItem, pasteItem, handleCreateNewRequestTab } = useFolder()
const { handleUpdateCurrentInnerTab } = useRequestTabs()
const { deleteRequest } = useRequest()
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
        toggleOpenFolder.value = !toggleOpenFolder.value
        return
    } else {
        router.push({ query: { t: props.node.id } })
    }
}
const handleRequestOptions = (item: any, payload: TreeItem) => {
    console.log("request options", item)
    switch (item.value) {
        case 'delete':
            deleteRequest(payload.id as string)
            break;

        case 'rename':
            emit('renameNode', payload)
            break;
        case 'copy':
            copyItem(payload.id)
            break;
        case 'paste':
            pasteItem(payload.id)
            break;

    }
}
const handleFolderOptions = (item: any, payload: TreeItem) => {
    switch (item.value) {
        case 'delete':
            deleteNodeById(payload.id as string)
            break;

        case 'rename':
            emit('renameNode', payload)
            break;
        case 'folder':
            currentFolderId.value = payload.id as string
            handleFolderIconClick('folder')
            break;
        case 'request':
            currentFolderId.value = payload.id as string
            handleCreateNewRequestTab()
            break;
        case 'copy':
            copyItem(payload.id)
            break;
        case 'paste':
            pasteItem(payload.id)
            break;
    }
}
const handleRenameFolderOrReqName = (node: TreeItem) => {
    emit('renameNode', node)
}
// watch(currentTabId, (val) => {
//     if (val == props.node.id) {
//         // console.log("watching and updating")
//         storeData.updateCurrentFolder(props.node.parentFolderId ?? '')
//     }
// })
</script>