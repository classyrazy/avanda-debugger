<template>
    <div>
        <div class="w-[60%] items-center mt-4  flex justify-between">
            <h2 class="mx-4">Nested Functions</h2>
            <div class="cursor-pointer w-7 h-7 p-1 hover:bg-gray-300 rounded-full flex justify-center items-center"
                title="Add a new root nested function">
                <add-icon></add-icon>
            </div>
        </div>
        <div class="nested-function-list">
            <nested-function v-for="nestedItem in testNestedArray" :key="nestedItem.name" :item="nestedItem"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import NestedFunction from './NestedFunction.vue'
import { nestedFunctionType } from "~~/utils/types/nestedFunctionType"



const testNestedArray = reactive<nestedFunctionType[]>([
    {
        name: "blog",
        service: "Blog/getUserBlog",
        params: [
            {
                key: "id",
                value: "1",
                active: true
            },
            {
                key: "id",
                value: "2",
                active: true
            }
        ],
        columns: [
            {
                key: "id",
                active: true
            },
            {
                key: "title",
                active: true
            },
            {
                key: "description",
                active: true
            }
        ],
        nestedFunction: null
    },
    {
        name: "blog",
        service: "Blog/getUserBlog",
        params: [
            {
                key: "id",
                value: "1",
                active: true
            },
            {
                key: "id",
                value: "2",
                active: true
            }
        ],
        columns: [
            {
                key: "id",
                active: true
            },
            {
                key: "title",
                active: true
            },
            {
                key: "description",
                active: true
            }
        ],
        nestedFunction: [
            {
                name: "blog",
                service: "Blog/getUserBlog",
                params: [
                    {
                        key: "id",
                        value: "1",
                        active: true
                    },
                    {
                        key: "id",
                        value: "2",
                        active: true
                    }
                ],
                columns: [
                    {
                        key: "id",
                        active: true
                    },
                    {
                        key: "title",
                        active: true
                    },
                    {
                        key: "description",
                        active: true
                    }
                ],
                nestedFunction: null
            }
        ]
    }

])
</script>

<style scoped></style>