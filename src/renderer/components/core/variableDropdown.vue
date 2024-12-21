<template>
    <div class="relative">
        <textarea placeholder="Token" id="Token" @input="handleUserInput" v-model="typedText"
            class="relative w-full text-sm rounded-lg bg-transparent outline-none inline-block appearance-none border py-3 px-2 text-md text-gray-400 focus:text-black"
            type="text"></textarea>
        <div class="absolute top-6 w-full z-10" ref="target" v-if="showingSuggestions">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white "
                :class="[showingSuggestions ? 'block' : 'hidden']">
                <ul>
                    <li class="text-sm text-gray-400 py-2 px-2 hover:bg-gray-100 cursor-pointer" @click="handleSelectVaribale(item)"
                        v-for="item in projectDetails.environs">{{ item.key }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { projectDetails } from '../../composables/useAppConfig';
import { onClickOutside } from '@vueuse/core'
import { Environ } from '../../types/appStyleTypes';

const showingSuggestions = ref(false)
const props = defineProps({
    modelValue: { type: [Object, String], default: '' },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'placeholder text ' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
const typedText = ref('')
const target = ref(null)
const selectedItem = ref({} as any)
const onBlur = () => {
    if (!selectedItem?.value?.name) {
        typedText.value = ''
    } else {
        typedText.value = selectedItem.value.name
    }
    showingSuggestions.value = false
}
const showSuggestions = () => {
    if (projectDetails.value.environs.length > 0) {
        showingSuggestions.value = true
    }
}
const handleUserInput = () => {
    // Check if user input starts with {{
    if (typedText.value.startsWith('{{')) {
        console.log('open dropdown')
        showingSuggestions.value = true
    } else {
        console.log('close dropdown')
        showingSuggestions.value = false
    }
    console.log(typedText.value)
    emit('update:modelValue', typedText.value)
}
onClickOutside(target, onBlur)
const handleSelectVaribale  = (item: Environ) => {
    selectedItem.value = item
    emit('update:modelValue', {key: item.key})
    showingSuggestions.value = false
    if (item) {
        typedText.value = `{{${item.key}}}`
    }
}
onMounted(() => {
    console.log('mounted', props.modelValue)
    if(props.modelValue && typeof props.modelValue == 'object') {
        selectedItem.value = props.modelValue
        typedText.value = `{{${props.modelValue.key}}}`
    }
})
</script>

<style scoped></style>