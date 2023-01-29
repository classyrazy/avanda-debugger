<template>
    <div>
        <h3 class="text-md">Query Params</h3>
        <p class="text-sm">List of data you want to select from the response</p>
        <div class="param-table border-t border-b">
            <div class="">
                <ul class="grid grid-cols-3 justify-around gap-4 border-r border-b border-l mx-8 px-4 ">
                    <li>
                        <p class="border-r text-avanda-grey-dark font-semibold">Key</p>
                    </li>
                    <li>
                        <p class="border-r text-avanda-grey-dark font-semibold">Value</p>
                    </li>
                    <li>
                        <p class="text-avanda-grey-dark font-semibold">Description</p>
                    </li>
                </ul>
                <ul class="grid grid-cols-3 justify-around gap-4 border-r border-b border-l mx-8 px-4 ">
                    <li class="border-r"><v-input placeholder="Key" class="text-sm" type="text" size="small" full
                            style-type="avanda-grey-input"></v-input></li>
                    <li class="border-r"><v-input placeholder="Value" class="text-sm" type="text" size="small" full
                            style-type="avanda-grey-input"></v-input></li>
                    <li class=""><v-input placeholder="Description" class="text-sm" type="text" size="small" full
                            style-type="avanda-grey-input"></v-input></li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VInput from '../../forms/v-input.vue'

</script>

<style scoped>

</style>