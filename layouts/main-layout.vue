<template>
    <div class=" grid grid-cols-12 h-screen">
        <DebuggerSidebar class="col-span-2 px-4  border-r-2 " />
        <div class="col-span-10 mt-2 max-h-screen overflow-y-auto">
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

    </div>
</template>

<script setup lang="ts">
import Alert from '../components/core/Alert.vue'
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