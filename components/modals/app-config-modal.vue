<template>
    <div class="p-6">
        <div class="flex justify-between my-4">
            <div>
                <h1 class="text-xl font-semibold">App Configuration</h1>
                <p class="text-sm mt-2">Edit your app configuration Like your baseURl and add variables to your app</p>
            </div>
            <close-icon class="cursor-pointer" @click="$emit('close', appStore.projectDetails.baseurl)"></close-icon>
        </div>
        <div class="my-4">
            <label for="app-name" class="text-sm font-medium">App Name</label>
            <input placeholder="App name" id="app-name"
                class="text-sm rounded-lg bg-transparent outline-none inline-block appearance-none border w-full py-3 px-2 text-md text-gray-400 focus:text-black"
                type="text" v-model="appStore.projectDetails.name" disabled>
        </div>
        <div class="my-4">
            <label for="base-url" class="text-sm font-medium my-2">Your Avanda App BaseURL</label>

            <input placeholder="Base Url" id="base-url"
                class="text-sm rounded-lg bg-transparent outline-none inline-block appearance-none border w-full py-3 px-2 text-md text-gray-400 focus:text-black"
                type="text" v-model="appStore.projectDetails.baseurl">
        </div>
        <div class="mt-2 flex justify-between">
            <div class="">
                <h3 class="text-lg font-semibold">Environment variables</h3>
                <p class="text-sm mt-2">Add Environment Variables hera and use "{}" to access them </p>
            </div>
            <div class="cursor-pointer w-8 h-8 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center" title="add an environment variable">
                <add-icon @click="appStore.addToEnvironment"></add-icon>
            </div>
        </div>
        <div class="body-table border-t mt-4 ">
            <div class="border-b">
                <ul class="grid grid-cols-2 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                    <li class="py-1 border-r">
                        <p class=" text-avanda-grey-dark font-semibold uppercase">Key</p>
                    </li>
                    <li class="py-1">
                        <p class="text-avanda-grey-dark font-semibold uppercase">Value</p>
                    </li>
                </ul>
            </div>
            <div class="relative border-t last:border-b" v-for="(varForm, idx) in environsForm" :key="idx">
                <ul class="grid grid-cols-2 justify-around gap-4 border-r border-l mx-8 ml-10 px-2">
                    <li class="border-r flex items-center">
                        <input placeholder="key"
                            class="text-sm rounded-lg my-auto bg-transparent border-none inline-block appearance-none outline-0 py-3 px-2 text-gray-400 focus:text-black break-words"
                            type="text" v-model="environsForm[idx].key">

                    </li>
                    <li class="flex items-center">
                        <textarea placeholder="value"
                            class="text-sm rounded-lg w-full my-auto bg-transparent border-none inline-block appearance-none outline-0 py-3 px-2 text-gray-400 focus:text-black resize-none"
                            v-model="environsForm[idx].value"></textarea>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import AddIcon from '../icons/add-icon.vue'
import CloseIcon from '../icons/close-icon.vue'
import VInput from '../core/forms/v-input.vue'
import { useAppStore } from "~~/store/app";

const appStore = useAppStore()
const environsForm = appStore.projectDetails.environs


</script>

<style scoped>

</style>