<template>
    <div class="pt-4">
        <h3 class="text-md font-semibold text-avanda-grey-dark mb-3 mx-2 my-2">Authorization</h3>
        <div class="mx-2 grid grid-cols-10">
            <div class="col-span-4">
                <h4 class="text-base font-semibold my-2">Bearer Token</h4>
                <p class="text-avanda-grey-dark text-sm pr-20">This parameter holds sensitive information, Assign `token` to a variable to use it in multiple requests</p>
            </div>
            <div class="col-span-6 relative" v-if="currentRequest">
                <VariableDropdown class="" v-model="currentRequest.authorisation.token">
                </VariableDropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VSelect from '../../core/forms/v-select.vue'
import { onMounted, ref } from 'vue';
import VariableDropdown from '../../core/variableDropdown.vue';
import { currentRequest } from '../../../composables/request/useRequest';
import { allEnvironValues } from '../../../composables/useAppConfig';


</script>

<style scoped></style>