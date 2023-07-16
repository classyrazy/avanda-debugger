<template>
    <div class="bg-[#D3B8EE] text-center py-2">
        <p class="inline-flex justify-center items-center cursor-pointer">
            Project Name
            <down-icon></down-icon>
        </p>
    </div>
    <section class=" grid grid-cols-10">
        <debugger-sidebar class="col-span-2   border-r-2 " />
        <div class="col-span-8 max-h-screen overflow-y-auto">
            <!-- <main-header></main-header> -->
            <tabs-topbar class="sticky top-0 bg-white z-30"></tabs-topbar>
            <!-- <file-directory-header></file-directory-header> -->
            <div class="" v-if="true">
                <slot />
            </div>
            <div class="">
            </div>
        </div>
        <modal-root></modal-root>
        <alert></alert>

    </section>
</template>

<script setup lang="ts">
import DownIcon from '../components/icons/down-icon.vue'
import TabsTopbar from '../components/TabsTopbar.vue'
import DebuggerSidebar from '../components/DebuggerSidebar.vue'

</script>

<style scoped></style>