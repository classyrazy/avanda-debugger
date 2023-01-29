<template>
  <div>
    <request-input></request-input>
    <div
      class="params-and-request-options requestoption flex gap-8 px-8 text-avanda-grey-dark font-medium text-sm nav-links">
      <p class="cursor-pointer nav-link active">Params</p>
      <p class="cursor-pointer nav-link">Authorization</p>
      <p class="cursor-pointer nav-link">Body</p>
      <p class="cursor-pointer nav-link">Nested Function</p>
    </div>
    <v-tooltip label="Helloooooo world">
      <div class="">
        <p class="">Helloo</p>
        <p class="">Helloo</p>
        <p class="">Helloo</p>
      </div>
    </v-tooltip>
    <lazy-core-request-u-i-params-param-edit />
    Helllo -------{{ storeData.currentFolderId }}

  </div>
</template>
<script setup lang="ts">
import VTooltip from '../components/core/forms/v-tooltip.vue'
import RequestInput from '../components/core/requestUI/RequestInput.vue'
import { useAppStore } from "~~/store/app"; 
const storeData = useAppStore();
definePageMeta({
  layout: 'main-layout'
})
// const { currentFolderId, computedCurrentFolder } = storeData

onMounted(() => {
  console.log('mounted')

})



</script>

<style scoped>
.requestoption p.nav-link {
  display: inline-block;
  position: relative;
  /* margin: auto; */
}

.requestoption p.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  transform: scaleX(0);
  height: 2px;
  bottom: -2px;
  left: 0;
  background: #f9b700;
  /* transform-origin: bottom center; */
  transition: transform 0.4s ease-out;
}

.requestoption p.nav-link.active:after {
  transform: scaleX(1);
  transform-origin: bottom center;
}
</style>