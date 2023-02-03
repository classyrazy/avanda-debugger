<template>
    <div class="pt-6">
        <h3 class="text-md font-semibold text-avanda-grey-dark mb-3">Query Params</h3>
        <div class="param-table border-t border-b">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-2 border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase">Key</p>
                        </li>
                        <li class="py-2 border-r">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Value</p>
                        </li>
                        <li class="py-2">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Description</p>
                        </li>
                    </ul>
                </div>
                <div class="relative">
                    <div class="absolute left-[0] top-4">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4">
                    </div>
                    <ul class="grid grid-cols-3 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2"><v-input placeholder="Key" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input"></v-input></li>
                        <li class="border-r py-2"><v-input placeholder="Value" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input"></v-input></li>
                        <li class="py-2"><v-input placeholder="Description" class="text-sm" type="text" size="small"
                                full style-type="avanda-grey-input"></v-input></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VInput from '../../forms/v-input.vue'

</script>

<style scoped>

</style>