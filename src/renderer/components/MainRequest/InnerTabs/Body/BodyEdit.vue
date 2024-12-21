<template>
    <div class="pt-4">
        <div class="flex justify-between relative" v-if="currentRequest?.post">
            <h3 class="text-md font-semibold text-avanda-grey-dark mb-3 mx-4 my-2">Body</h3>
            <v-select :options="bodyoptions" v-model="currentRequest.post.bodyType" class="w-32"
                @selected="handleSelectedBodyType">
                <button type="button" class="border rounded-md px-4 py-2">{{ currentRequest.post.bodyType.name
                    }}</button>
            </v-select>
        </div>
        <div class="param-table border-t" v-if="currentRequest?.post?.bodyType.value == 'key-value'">
            <div class="">
                <div class="border-b">
                    <ul class="grid grid-cols-2 justify-around gap-4 border-r border-l mx-8 ml-10 px-2 ">
                        <li class="py-1 border-r">
                            <p class=" text-avanda-grey-dark font-semibold uppercase">Key</p>
                        </li>
                        <li class="py-1">
                            <p class="text-avanda-grey-dark font-semibold uppercase">Value</p>
                        </li>
                    </ul>
                </div>
                <div class="relative border-t last:border-b" v-for="(eachForm, idx) in paramForm" :key="idx">
                    <div class="absolute left-[0] top-3">
                        <input type="checkbox" class="accent-black w-[20px] h-[16px] ml-4" v-model="eachForm.active">
                    </div>
                    <ul class="grid grid-cols-2 justify-around gap-4 border-r  border-l mx-8 ml-10 px-2">
                        <li class="border-r py-2">
                            <input placeholder="Key"
                                class="text-sm bg-transparent border-none w-full inline-block appearance-none outline-none pr-2"
                                type="text" size="small" full style-type="avanda-grey-input"
                                v-model="paramForm[idx].key" @input="handleCreateParams" />
                        </li>
                        <li class="py-2">
                            <input placeholder="Value"
                                class="text-sm bg-transparent border-none w-full inline-block appearance-none outline-none pr-2"
                                type="text" size="small" full style-type="avanda-grey-input"
                                v-model="paramForm[idx].value" @input="handleCreateParams" />
                        </li>
                    </ul>
                    <div class="absolute right-[0] top-2">
                        <button class="text-avanda-grey-dark cursor-pointer" type="button"
                            @click="handleDeleteBodyValue(idx)"><delete-icon class="w-6"></delete-icon></button>
                    </div>
                </div>
            </div>
        </div>
        <json-editor class="json-editor" ref="editorInstance" height="400" mode="text" v-model:text="jsonContent" @focus="handleOnEditorLoaded"
            :mainMenuBar="false" :read-only="false" :statusBar="false" :navigationBar="true" :ask-to-format="false"
            @change="handleContentChange" v-else />
    </div>
</template>

<script setup lang="ts">
import VSelect from '../../../core/forms/v-select.vue'
// @ts-ignore
import DeleteIcon from '../../../icons/delete-icon.vue'
import JsonEditor from 'vue3-ts-jsoneditor';
import 'vue-json-pretty/lib/styles.css';
import { computed, onMounted, ref, watch } from 'vue';
import { currentRequest, currentRequestId } from '../../../../composables/request/useRequest';
import { createNewBodyValue, handleDeleteBodyValue } from '../../../../composables/request/body';
import { Body } from '../../../../types/mainRequestType';

const paramForm = computed(() => {
    return currentRequest.value?.body || []
})
const addNewBodyFormWhenOthersAreFull = () => {
    const isAllFull = paramForm.value.every(eachForm => eachForm.key) || paramForm.value.length === 0
    if (isAllFull) {
        createNewBodyValue()
    }
}

const handleCreateParams = () => {
    addNewBodyFormWhenOthersAreFull()
}
const json = ref({})
const onJsonChange = (newJson: any) => {
    console.log(newJson)
    json.value = newJson
}
const jsonContent = ref('')
const isJsonValid = ref(true)
const bodyoptions = [
    {
        name: 'Key-Value',
        value: 'key-value',
    },
    {
        name: 'JSON',
        value: 'json',
    },
]
const editorInstance = ref<any>(null)
const formatJson = () => {
    const formatted = JSON.stringify(jsonContent.value, null, 2)
    // editorInstance.value.set()
    jsonContent.value = JSON.parse(formatted)

}
const convertToJson = (payload: Body[]) => {
    try {
        const validDataArray = []
        for (const each of paramForm.value) {
            if (each.key && each.active) {
                validDataArray.push([each.key, each.value])
            }
        }
        const content = JSON.stringify(Object.fromEntries(validDataArray), null, 2)
        jsonContent.value = content
    } catch (error) {
        console.log(error)
    }
}
const convertJsonToParam = (payload: string, initialParamsData: Body[]) => {
    try {
        const parsed = JSON.parse(payload)
        const parsedKeys = Object.keys(parsed)
        const validatedArray = []
        for (const key of parsedKeys) {
            const found = initialParamsData.find((item) => item.key === key)
            if (found) {
                found.value = parsed[key]
                found.active = true
                validatedArray.push(found)
            } else {
                validatedArray.push({
                    key,
                    value: parsed[key],
                    active: true,
                })
            }
        }
        return validatedArray
    } catch (error) {
        console.log(error)
    }
}
const handleSelectedBodyType = (selected: any) => {
    if (!currentRequest.value) return
    if (selected.value === 'json') {
        convertToJson(paramForm.value)
    } else if (selected.value === 'key-value') {
        currentRequest.value.body = convertJsonToParam(jsonContent.value, paramForm.value) as Body[]
        addNewBodyFormWhenOthersAreFull()
    }
}
const handleContentChange = (newContent: string) => {
    if (!currentRequest.value) return
    currentRequest.value.post.jsonData = newContent as any
}
watch(currentRequestId, () => {
    if (!currentRequest.value) return
    // convertToJson(currentRequest.value?.body)
    if (currentRequest.value?.post?.bodyType.value === 'json') {
        convertToJson(paramForm.value)
    }
})
const handleOnEditorLoaded = () => {
    if (currentRequest.value && currentRequest.value?.post?.jsonData) {
        jsonContent.value = currentRequest.value.post.jsonData.text
    }
}
onMounted(() => {
    // if(currentRequest.value && !currentRequest.value?.post){
    //     currentRequest.value.post =  {
    //         bodyType: bodyoptions[0],
    //         jsonData: {
    //             text: ''
    //         }
    //     }
    // }
    if (editorInstance.value) {
        console.log('editorInstance', editorInstance.value)
        // editorInstance.value.$update(currentRequest.value?.post.jsonData.text)
        // handleOnEditorLoaded()
    }
    if (currentRequest.value?.post?.bodyType.value !== 'json') {
        addNewBodyFormWhenOthersAreFull()
    } else {

    }

})
</script>

<style>
.json-editor {
    --jse-theme-color: #D3B8EE;
    --jse-menu-color: black;
}
</style>