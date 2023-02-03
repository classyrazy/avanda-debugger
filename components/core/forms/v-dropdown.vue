<template>
    <div class="dropdown-container mx-auto relative" tabindex="0" @keydown.enter="handleDropdown()"
        @keydown.esc="closeDropDown()" :class="[dcConStyles]" v-click-outside="closeDropDown">
        <div class=" dropdown-toggle-contaner click-dropdown flex justify-between items-center  cursor-pointer"
            @click="handleDropdown()"
            :class="[error ? 'border-red-100' : '', useDefaultStyles ? 'border-gray-100 border-2 rounded-lg p-2' : dcToggleStyles]">
            <p class="truncate" v-if="useDefaultLabel">{{ label }}</p>
            <span v-else>
                <slot name="label"></slot>
            </span>
            <down-icon></down-icon>
        </div>
        <div class="absolute top-6 w-full z-10">
            <div class="dropdown-menu w-full border-gray-100 border-2 mt-2 rounded-lg p-2 bg-white "
                :class="[computedDropState ? 'block' : 'hidden', dMenuStyles]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import DownIcon from '../../icons/down-icon.vue'
export default {
    name: 'VDropdown',
    components: { DownIcon },
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
        dropState: {
            type: Boolean,
            default: false
        },
        useDefaultStyles: {
            type: Boolean,
            default: false
        },
        useDefaultLabel: {
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
            dropStateProps: this.dropState
        }
    },
    computed: {
        computedDropState() {
            return this.dropState
        }
    },
    methods: {
        handleDropdown() {
            // this.dropStateProps = !this.dropStateProps
            console.log("This is emitting")
            this.$emit("handleDropdown")
        },
        closeDropDown() {
            this.dropStateProps = false
            this.$emit("closeDropdown")

        },
        searchDropdown() {
            this.$emit('search', this.searchValue)
        },
        chooseItem() {
            this.$emit('chosen')
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
</style>