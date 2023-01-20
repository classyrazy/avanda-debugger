<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z" :fill="textColor"/>
    </svg>
</template>

<script setup lang="ts">
interface Props {
    bgColor?: string;
    textColor: string;
    size: number;
}

let props = withDefaults(defineProps<Props>(), {
    bgColor: "#ffffff",
    textColor: "#000",
    size: 24,
});
</script>

<style scoped>

</style>
