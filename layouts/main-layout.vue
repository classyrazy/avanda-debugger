<template>
    <div class=" grid grid-cols-12 h-screen">
        <Debugger-Sidebar class="col-span-2 px-4  border-r-2" />
        <div class="col-span-10 mt-10">
            <!-- <main-header></main-header> -->
            <tabs-topbar></tabs-topbar>
            <file-directory-header></file-directory-header>
            <slot />

        </div>
    </div>
</template>

<script setup lang="ts">
import FileDirectoryHeader from '../components/Topbars/FileDirectoryHeader.vue'
import TabsTopbar from '../components/Topbars/TabsTopbar.vue'
import MainHeader from '../components/Topbars/MainHeader.vue'
import DebuggerSidebar from '../components/Sidebars/DebuggerSidebar.vue'

</script>

<style scoped>

</style>