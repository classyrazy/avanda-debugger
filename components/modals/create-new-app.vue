<template>
     <div class="flex flex-col justify-center items-center gap-4 p-4">
        <img src="~~/assets/images/avanda-logo.svg" alt="" class="w-[300px]">
        <h3 class="font-semibold text-2xl font-inter">
            Hello Welcome To Avanda Debugger 
        </h3>
        <p class="">Create a new project to get started</p>
        <form @submit.prevent="handleDone" class="w-full">
            <div class="w-[70%] mx-auto">
                <v-input class="" style-type="avanda-create-project-name-input" :value="name"
                placeholder="Enter Project Name" autofocus size="medium" full />
            </div>
            <div class="flex justify-end m-8">
                <v-button class="mt-4 ml-auto" style-type="avanda-create-project-button" @click="handleDone" size="small">
                    Create Project </v-button>
            </div>
        </form>

    </div>
</template>

<script setup lang="ts">
import VButton from '../core/forms/v-button.vue'
import VInput from '../core/forms/v-input.vue'
import { useAppStore } from "~~/store/app";
const storeData = useAppStore();
let name = reactive({
    value: "",
    error: null
})
let emit = defineEmits(["close"])
function handleDone(){
    if(name.value.trim() !== ""){
        storeData.createANewProject(name.value)
        name.value = ""
        emit("close")
    }

}
</script>

<style scoped>

</style>