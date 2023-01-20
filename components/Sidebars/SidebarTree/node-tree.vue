<template>
    <li class="node-tree">
        <div class=" flex gap-2 items-center">
            <toggle-side-open-icon v-if="node.children && node.children.length" @click="handleToggleOpenFolder" class="cursor-pointer" :class="toggleOpenFolder ? 'rotate-90': ''"></toggle-side-open-icon>
            <span class="name">{{ node.name }}</span>
        </div>
        <ul v-if="node.children && node.children.length" class="ml-4" :class="toggleOpenFolder ? 'block': 'hidden'">
            <node-tree v-for="(child, idx) in node.children" :node="child" :key="idx"></node-tree>
        </ul>
    </li>
</template>

<script setup lang="ts">
import ToggleSideOpenIcon from '../../icons/toggle-side-open-icon.vue'
import NodeTree from './node-tree.vue'
interface Props {
    node: {
        id?: number;
        name?: string;
        children?: object[];
    };
}
let props = defineProps<Props>();
let toggleOpenFolder = ref<boolean>(false)
let handleToggleOpenFolder = () => {
    console.log('toggle open folder', toggleOpenFolder.value)

    toggleOpenFolder.value = !toggleOpenFolder.value
}
</script>