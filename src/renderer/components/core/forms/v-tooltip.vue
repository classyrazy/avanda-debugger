<template>
    <div class=" relative w-full dropdown-main-con" tabindex="0" @keydown.enter="handleDropdown()"
        @keydown.esc="closeDropDown()" :class="[dcConStyles]" v-click-outside="closeDropDown">
        <div ref="innerWrapper" class=" flex justify-between items-center cursor-pointer" @contextmenu.prevent="handleopenWithRightClick"
            :class="[error ? 'border-red-100' : '', useDefaultStyles ? 'border-gray-100 border-2 rounded-lg p-2' : dcToggleStyles]">
            <p class="truncate w-full" @click="$emit('labelClick')" @dblclick="$emit('labelDblClick')">{{ label }}</p>
            <view-more-icon class="cursor-pointer hidden-icon hidden" @click.self="handleDropdown"></view-more-icon>
        </div>
        <div class="fixed translate-y-[-15px] w-[200px] z-30 left-20">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white absolute"
                :class="[computedDropState ? 'block' : 'hidden', dMenuStyles]">
                <ul class="max-h-[200px] overflow-y-auto">
                    <li class="block w-full text-sm cursor-pointer hover:bg-[#eee] rounded-md mt-2 p-2"
                        v-for="(item, idx) in options" tabindex="0" :key="idx">
                        <button type="button" class="flex items-center w-full" @click="handleNodeOptions(item)">
                            <span class="text-xs" :class="item.color ? `text-${item.color}` : ''">{{ item.label
                                }}</span>
                        </button>
                        <!-- {{item.name}} -->
                    </li>
                </ul>
                <!-- <slot></slot> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ViewMoreIcon from '../../icons/view-more-icon.vue'
import DownIcon from '../../icons/down-icon.vue'
import { computed, PropType, ref } from 'vue';

const props = defineProps({
    label: String,
    placeholder: String,
    showSearch: Boolean,
    error: Boolean,
    options: Array as PropType<{ label: string, color?: string, value: string }[]>,
    useDefaultStyles: Boolean,
    dcConStyles: String,
    dcToggleStyles: String,
    dMenuStyles: String,
})
const  emit = defineEmits(['labelClick', 'labelDblClick', 'optionClick'])
const searchValue = ref('')
const dropState = ref(false)
const computedDropState = computed(() => dropState.value)
const innerWrapper = ref<HTMLElement | null>(null)
const handleDropdown = () => {
    dropState.value = !dropState.value
}
const closeDropDown = () => {
    dropState.value = false
}
const handleNodeOptions = (item: { label: string, color?: string, value: string }) => {
    emit('optionClick', item)
    closeDropDown()
}

const handleopenWithRightClick = () => {
    innerWrapper.value?.click()
    closeDropDown()
    handleDropdown()
}
</script>

<style scoped>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
}
.dropdown-main-con:hover .hidden-icon{
    display: inline-block;
}
.dropdown-menu{
    transition: all 0.3s ease-in-out;
}
</style>