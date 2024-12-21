<template>
    <Menu as="div" class="relative  text-left" :model-value="modelValue">
            <MenuButton class="text-xs whitespace-nowrap text-primary cursor-pointer font-medium w-full text-left">
                <slot></slot>
            </MenuButton>
        <MenuItems
            class="absolute box mt-1 right-0 w-32 min-w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 border overflow-hidden">
            <MenuItem v-for="option in (options as any)" v-slot="{ active }">
            <button type="button" :class="[
                active ? 'bg-[#eee]' : '',
                'group flex w-full items-center px-3 py-2 text-[13px] border-b text-center',
                option.icon ? 'justify-center gap-1' : 'justify-center'
            ]" @click="handleChangeValue(option)">
                <component :is="option.icon" v-if="option.icon" class="w-4 h-4"></component>
                <span>{{ option.name }}</span>
            </button>
            </MenuItem>
        </MenuItems>
    </Menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import MenuItems from '../headless/MenuItems.vue'
import { Menu, MenuButton, MenuItem } from '@headlessui/vue'
defineProps({
    modelValue: {
        type: [String, Number, Boolean, Object],
        required: true,
        default: "",
    },
    options: {
        type: Object as PropType<{
            name: string;
            value: string;
            icon?: object;
        }[]>,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(["update:modelValue", "selected"]);
const handleChangeValue = (val: string) => {
    emit("update:modelValue", val)
    emit("selected", val)
}
</script>

<style scoped></style>