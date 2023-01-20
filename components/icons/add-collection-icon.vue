<template>
    <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.5 2H7.71001L6.86001 1.15L6.51001 1H1.51001L1.01001 1.5V12.5L1.51001 13H7.00001V12H1.99001V6H6.48001L6.83001 5.85L7.69001 4.99H14V6.49L13.999 7H15.01V2.5L14.5 2ZM13.99 4H7.49001L7.14001 4.15L6.28001 5.01H2.00001V2.01H6.29001L7.14001 2.86L7.50001 3.01H14L13.99 4ZM13 16H12V13H9.00001V12H12V9H13V12H16V13H13V16Z"
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
    size: 24,
});
</script>

<style scoped>

</style>
