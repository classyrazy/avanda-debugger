<template>
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.5 1.1L12.9 4.6L13 5V7H12V6H8V2H3V13H7V14H2.5L2 13.5V1.5L2.5 1H9.2L9.5 1.1ZM9 2V5H11.9L9 2ZM13 16H12V13H9V12H12V9H13V12H16V13H13V16Z"
            :fill="textColor" />
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
    size: 22,
});
</script>

<style scoped>

</style>
