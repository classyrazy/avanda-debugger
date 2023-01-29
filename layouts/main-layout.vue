<template>
    <div class=" grid grid-cols-12 h-screen">
        <DebuggerSidebar class="col-span-2 px-4  border-r-2" />
        <div class="col-span-10 mt-2">
            <!-- <main-header></main-header> -->
            <tabs-topbar></tabs-topbar>
            <!-- <file-directory-header></file-directory-header> -->
            <div class="" v-if="true">
                <slot />
            </div>
            <div class="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FileDirectoryHeader from '../components/Topbars/FileDirectoryHeader.vue'
import TabsTopbar from '../components/Topbars/TabsTopbar.vue'
import MainHeader from '../components/Topbars/MainHeader.vue'
import DebuggerSidebar from '../components/Sidebars/DebuggerSidebar.vue'

// if (process.client) {
//     window.addEventListener('contextmenu', (e) => {
//         e.preventDefault()
//     })
// }
</script>

<style scoped>

</style>