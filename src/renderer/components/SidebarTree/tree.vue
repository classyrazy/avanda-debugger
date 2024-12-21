<template>
    <div class="tree">
        <ul class="tree-list">
            <node-tree :node="items" @rename-node="$emit('renameNodeTree', $event)"></node-tree>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import NodeTree from './node-tree.vue'
interface Props {
    items: {
        id?: number;
        name: string;
        children?: object[]
        isFolderEmpty?: boolean
    };
}
let props = defineProps<Props>();
const emit = defineEmits(['renameNodeTree', 'createNewFolderTree', 'createNewRequestTree'])
const items = computed(() => props.items)
const handleCreateNewFolder = () => {
    console.log("create new folder")
    emit('createNewFolderTree')
}
const handleCreateNewRequest = () => {
    console.log("create new request")
    emit('createNewRequestTree')
}
</script>

<style scoped>

</style>