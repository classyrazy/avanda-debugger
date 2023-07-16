<template>
    <button :class="__class" class="flex justify-center" style="white-space: nowrap" :disabled="disabled">
        <component v-if="icon || loading" :class="`${!iconOnly ? 'mr-2' : ''} my-auto`" size="17" :color="types[type]"
            :is="loading ? 'Spinner' : icon"></component>
        <span class="my-auto" :class="!icon && !loading ? (round ? ' mt-1 ml-1 z-50' : 'm-auto') : ''">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts" setup>
// import Spinner from '../svgs/loader-icon.vue'


import { computed } from "@vue/reactivity"

let props = defineProps({
    size: {
        type: String,
        default: 'medium'
    },
    type: {
        type: String,
        default: 'pry'
    },
    round: {
        type: Boolean,
        default: false
    },
    icon: {
        type: Object
    },
    iconOnly: {
        type: Boolean,
        defult: false
    },
    full: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

let base = 'rounded-xl'
let sizes = {
    small: 'py-2 px-4 ',
    medium: 'py-3 px-6',
    big: 'py-4 px-8 txt-s-4'
}
let types = {
    white: {
        __class: 'bd-px bd-c-white bg-white txt-c-pry-400',
        text: '#ffffff'
    },
    'pry': {
        __class: ' text-white bg-main-purple font-bold border border-main-purple hover:border hover:border-light-purple',
        text: '#03053D'
    },
    'pry-reverse': {
        __class: ' text-white bg-pry font-bold btn-pry-reverse hover:bg-pry-hover-dark',
        text: '#03053D'
    },
    black: {
        __class: 'bd-px bd-c-black bg-black txt-c-white',
        text: ''
    },
    bordered: {
        __class: 'bd-px bd-c-white bg-transparent txt-c-white',
        text: ''
    },
    bordered_black: {
        __class: 'bd-px bd-c-black-10 bg-white txt-c-black',
        text: ''
    },
    sec: {
        __class: ' border-pry bg-sec text-pry-dark font-bold btn-sec button02',
        text: '#fff'
    },
    "border-sec": {
        __class: ' border-pry bg-transparent border-sec border-2 text-white hover:bg-pry-dark-hover-light font-bold btn-sec button02',
        text: '#fff'
    },
}
// hover:bg-pry-dark hover:text-white transition-colors duration-500

let __class = computed(() => {
    let __base = ((types[props.type] && types[props.type].__class) || types['pry'].__class) + ' ' + (sizes[props.size] || sizes['medium']);
    if (props.round)
        __base += ' rounded-full h-12 w-12 max-w-12 center'
    else
        __base += ' ' + base;

    if (props.full)
        __base += ' w-full'
    if (props.disabled)
        __base += ' fade-40'

    return __base
})

</script>

<style scoped>
button {
    cursor: pointer;
}

</style>