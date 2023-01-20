<template>
    <div>
        <request-input></request-input>
        <h1 class="text-3xl">Hello world</h1>
    </div>
</template>

<script setup lang="ts">
import RequestInput from '../components/core/requestUI/RequestInput.vue'
definePageMeta({
    layout: 'main-layout'
})

</script>

<style scoped>

</style>