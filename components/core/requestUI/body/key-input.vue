<template>
    <li class="border-r py-1 flex items-center">
        <v-input placeholder="Key" class="text-sm text-gray-400 focus:text-black" type="text" size="small" full
            style-type="avanda-grey-input" :value="reactiveForm.key" @focus="emit('key-focusing')" @custom-change="handlecustom"></v-input>
        <v-dropdown :drop-state="requestKeyTypeDropdown"
            dc-con-styles="request-type-dropdown flex gap-4 justify-between  items-center border-r"
            dc-toggle-styles="rounded-lg p-2" :useDefaultStyles="false" @handleDropdown="handleRequestKeyTypeDropdown"
            @closeDropdown="handleCloseDropDown">
            <template #label>
                <div class="flex items-center">
                    <p class="text-md font-medium text-avanda-grey-dark">{{ currentItemChosen.text }}
                    </p>
                </div>
            </template>
            <template #default>
                <ul class="max-h-[200px] overflow-y-auto" v-if="requestKeyTypesAvailable">
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-1"
                        v-for="(item, idx) in requestKeyTypesAvailable" tabindex="0" :key="idx"
                        @click="handleChosenFromDropdown(item)">
                        <span class="text-xs font-semibold">{{ item.text }}</span>
                    </li>
                </ul>
            </template>
        </v-dropdown>
    </li>
</template>

<script setup lang="ts">
import VDropdown from '../../forms/v-dropdown.vue'
import VInput from '../../forms/v-input.vue'

interface RequestKeyTypeProps {
    keyValue: string,
    idx: number,
    isFile: boolean,

}
const emit =  defineEmits(['keyTypeUpdate', 'key-focusing', 'keyUpChange'])
const props = defineProps<RequestKeyTypeProps>()  
const reactiveForm = reactive({
    key: {
        value: props.keyValue,
        error: null,
    },
})
// console.log(props.keyValue)
const requestKeyTypesAvailable = reactive([
    { text: "file" },
    { text: "text" }
])
const requestKeyTypeDropdown = ref(false)

const currentItemChosen = ref(props.isFile ? requestKeyTypesAvailable[0] : requestKeyTypesAvailable[1])
const handleRequestKeyTypeDropdown = () => {
    requestKeyTypeDropdown.value = !requestKeyTypeDropdown.value
}
const handleCloseDropDown = () => {
    requestKeyTypeDropdown.value = false
}
const handleChosenFromDropdown = (item: any) => {
    currentItemChosen.value = item
    emit('keyTypeUpdate', {text: item.text, idx: props.idx})
    handleCloseDropDown()
}
const handlecustom = (value) => {
    reactiveForm.key.value = value
    emit('keyUpChange', {text: value, idx: props.idx})
}
</script>

<style scoped>

</style>