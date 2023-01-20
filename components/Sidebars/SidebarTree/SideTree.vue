<template>
    <div>
        <tree v-for="(item, idx) in treeItems" :items="item" :key="idx" ></tree>

    </div>
</template>

<script setup lang="ts">
import Tree from './tree.vue'
type TreeItem = {
    name: string,
    children: TreeItem[]
}
interface Props {
    treeItems: TreeItem[]
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>