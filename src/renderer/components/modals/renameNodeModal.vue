<template>
    <div class="p-6">
        <div class="flex justify-between my-4">
            <div>
                <h1 class="text-xl font-semibold">Rename</h1>
            </div>
            <close-icon class="cursor-pointer" @click="$emit('close')"></close-icon>
        </div>
        <div class="text-center flex flex-col gap-3 justify-center">
            <file-icon class="w-10 h-10 mx-auto" v-if="node.type == 'request'"></file-icon>
            <DirectoryIcon class="w-10 h-10 mx-auto" v-else></DirectoryIcon>
            <h3 class="text-lg font-semibold">Rename {{ node.type }}</h3>
            <form @submit.prevent="handleSaveAfterRenaming(node.id, newName)">
                <input type="text" class="border border-gray-100 rounded-lg p-2 w-full" v-model="newName" />
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import FileIcon from '../icons/file-icon.vue'
import CloseIcon from '../icons/close-icon.vue'
import TreeItem from '../../types/TreeItem';
import DirectoryIcon from '../icons/directory-icon.vue';
import { useAlert } from '../../composables/core/useAlert';
import { useRequest } from '../../composables/request/useRequest';
import { ref } from 'vue';
import { useRequestTabs } from '../../composables/request/useRequestTabs';
interface Props {
    node: TreeItem
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const newName = ref(props.node.name)
const { openAlert } = useAlert()
const {renameRequest}  = useRequest()
const {renameTab} = useRequestTabs()
const handleSaveAfterRenaming = (ide: string, name: string) => {
    if (!name || name.trim() == '') {
        openAlert({ msg: "Request name cannot be empty", type: "ERROR" })
        return
    }
    props.node.name = name
    renameRequest(ide, name)
    renameTab(ide, name)
    emit('close')
}

</script>

<style scoped></style>