<template>
    <div :class="full ? 'w-full' : ''">
        <label v-if="label" class="font-inter text-xl mb-2">{{ label }}</label>
        <div class="relative py-1">
            <input v-bind="$attrs" :class="[__class, iconLeft ? 'pl-10' : '',]" :type="type" v-model="valueRefed"
                class="inline-block appearance-none" @keyup="$emit('customChange', valueRefed)" />
            <component v-if="_icon" @click="iconClicked" :is="_icon" :size="22" :text-color="iconColor"
                class="absolute -top-0 bottom-0 my-auto left-40" :class="[
                    full ? 'right-2 left-auto' : '',
                    styleType == 'grey-pry' ? 'bg-[#DCDCDC]' : '',
                    iconClick ? 'cursor-pointer' : '',
                    iconLeft ? 'left-2' : '',
                ]"></component>
        </div>
        <!-- <p v-if="value.error" class="font-ibimplex mt-2 text-xs text-red-600">
            {{ value.error }}
        </p> -->
    </div>
</template>

<script lang="ts">
import { computed, ref, watchEffect } from "vue";

export default {
    inheritAttrs: false,
    components: {
    },
    props: {
        value: {
            type: String,
            default: () => {
                return "";
            },
        },
        icon: {
            type: Object,
        },
        label: {
            type: String,
        },
        size: {
            type: String,
            default: "medium",
        },
        full: {
            type: Boolean,
            default: false,
        },
        styleType: {
            type: String,
        },
        iconClick: {
            type: Boolean,
            default: false,
        },
        iconLeft: {
            type: Boolean,
            default: false,
        },
        iconColor: {
            type: String,
            default: "#ffffff",
        },
    },
    setup(props, context) {
        let valueRefed = ref(props.value);
        let styleTypes = {
            "grey-pry":
                "bg-[#DCDCDC] rounded-2xl text-black focus:border-pry border-2 border-[#DCDCDC] rounded-lg",
            white: "bg-[#fff] text-black focus:border-pry border-2 border-gray-100",
            'search': "",
            "modal-search": "bg-[#fff] dark:bg-db text-black focus:border-pry border-b-0 border-gray-100 p-0 pb-1",
            "avanda-grey-input": "bg-transparent border-none ",
            "avanda-create-file-input": "bg-transparent border border-gray-100 p-1",
            "avanda-create-file-name-input": "bg-avanda-grey border border-gray-100 p-1 ",
        };
        let base = "";
        let sizes = {
            small: "",
            "x-small": "p-1",
            medium: "p-3",
            big: "py-6 px-8",
            large: "py-6 px-10 txt-s-6 ",
        };

        let __class = computed(() => {
            let __base =
                `${base +
                (sizes[props.size] ?? sizes["medium"])} ${styleTypes[props.styleType] ?? styleTypes["grey-pry"]}`;
            if (props.full) {
                __base += " w-full";
            }

            return __base;
        });

        let { attrs } = context;

        let type = ref(attrs.type);
        let hidden = ref(false);

        let _icon = ref(null);
        //   if (type.value != "password") {
        //     _icon.value = props.icon;
        //   } else {
        //     _icon.value = EyeClosed;
        //   }
        function iconClicked() {
            // if(!props.iconClick) return;
            // hidden.value = !hidden.value;
            // if (hidden.value) {
            //   _icon.value = EyeOpen;
            //   type.value = "text";
            // } else {
            //   _icon.value = EyeClosed;
            //   type.value = "password";
            // }
        }
        return {
            type,
            __class,
            _icon,
            iconClicked,
            valueRefed,
        };
    },
};
</script>

<style scoped>
input:focus {
    outline: none;
}
</style>