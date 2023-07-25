<template>
    <div class="flex flex-col justify-center items-center gap-4 p-4">
        <img src="../assets/images/core/http.png" alt="" class="w-[300px]">
        <p class="">
            You are creating a New Untitled Request in the {{ computedFolderString? computedFolderString: 'Root' }}
            folder  
        </p>
        <form @submit.prevent="handleCreateRequest" class="w-[70%]">
            <v-input class="" style-type="avanda-create-file-name-input" :value="fileName" required
                placeholder="Enter Request Name" autofocus size="medium" full />
        </form>

    </div>
</template>

<script setup lang="ts">
import VInput from './core/forms/v-input.vue'
import { computed, reactive } from 'vue';
import { useFolder } from '../composables/useFolder';
import { useRequest } from '../composables/request/useRequest';

const {  findFolderById,generatePath, computedCurrentFolder } = useFolder()
const { createNewRequest } = useRequest()

let fileName = reactive({
    value: "",
    error: null as string | null,
})
const computedFolderString = computed(() => {
    let result = 'Root'
    if (computedCurrentFolder) {
        result = generatePath(computedCurrentFolder.value)
    }
    return result
})
function handleCreateRequest() {
    // if (fileName.value.trim() === "") {
    //     fileName.error = "Please enter a request name"
    //     return
    // }
    createNewRequest(fileName.value)
    fileName.value = ""
}
</script>

<style scoped>

</style>