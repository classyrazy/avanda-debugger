<template>
    <div>
        <tree v-for="(item, idx) in treeItems" @rename-node-tree="handleOpenRanameModal"
         :items="item" :key="idx" ></tree>
    </div>
</template>

<script setup lang="ts">
import RenameNodeModal from '../modals/renameNodeModal.vue';
import Tree from './tree.vue'
import { useModal } from 'vue-modally-v3';
type TreeItem = {
    name: string,
    children: TreeItem[],
}
interface Props {
    treeItems: TreeItem[]
}

const props = defineProps<Props>()
const emit = defineEmits(['createNewFolderSide', 'createNewRequestSide'])
const handleOpenRanameModal = async (node: TreeItem) => {
    const modal = await useModal(RenameNodeModal,{
        options: {
            background: 'white',
            width: 500,
            type: "modal",
            blur: false
        },
        props: {
            node: node
        }
    })
    console.log(node)
}
</script>

<style scoped>

</style>