<template>
    <div class=" relative w-full dropdown-main-con" tabindex="0" @keydown.enter="handleDropdown()" @click="$emit('labelClick')"
        @keydown.esc="closeDropDown()" :class="[dcConStyles]" v-click-outside="closeDropDown">
        <div class=" flex justify-between items-center cursor-pointer"
            :class="[error ? 'border-red-100' : '', useDefaultStyles ? 'border-gray-100 border-2 rounded-lg p-2' : dcToggleStyles]">
            <p class="truncate" @click="$emit('labelClick')">{{ label }}</p>
            <view-more-icon class="cursor-pointer hidden-icon hidden" @click="handleDropdown"></view-more-icon>
        </div>
        <div class="fixed translate-y-[-15px] w-[200px] z-30 left-20">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white absolute"
                :class="[computedDropState ? 'block' : 'hidden', dMenuStyles]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import ViewMoreIcon from '../../icons/view-more-icon.vue'
import DownIcon from '../../icons/down-icon.vue'
export default {
    name: 'VToolTip',
    components: { DownIcon, ViewMoreIcon },
    // emits: ['onCloseDropdown', 'search', 'handleDropdown'],
    props: {
        label: {
            type: String,
            default: 'Select'
        },
        placeholder: {
            type: String,
            default: 'Search'
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        // dropState: {
        //     type: Boolean,
        //     default: false
        // },
        useDefaultStyles: {
            type: Boolean,
            default: false
        },
        dcConStyles: {
            type: String,
            default: ''
        },
        dcToggleStyles: {
            type: String,
            default: ''
        },
        dMenuStyles: {
            type: String,
            default: ''
        },

    },
    data() {
        return {
            searchValue: '',
            dropState: false,
        }
    },
    computed: {
        computedDropState() {
            return this.dropState
        }
    },
    methods: {
        handleDropdown() {
            // console.log("This is emitting")
            // this.$emit("handleDropdown")
            this.dropState = !this.dropState
        },
        closeDropDown() {
            this.dropState = false
        },
        searchDropdown() {
            this.$emit('search', this.searchValue)
        },
        chooseItem() {
            this.$emit('onCloseDropdown')
            this.closeDropDown()
        }
    }
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
</style>