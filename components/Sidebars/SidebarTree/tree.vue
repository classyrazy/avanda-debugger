<template>
    <div class="tree">
        <ul class="tree-list">
            <node-tree :node="items"></node-tree>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
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
const items = computed(() => props.items)
</script>

<style scoped>

</style>