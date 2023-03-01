<template>
  <div class="">
    <keep-alive>
      <component :is="computedCurrentTabDisplayed" />
    </keep-alive>
  </div>
</template>
<script setup lang="ts">
import CreateNewApp from '../components/modals/create-new-app.vue'
import MainRequest from '../components/core/requestUI/MainRequest.vue'
import NewRequest from '../components/core/requestUI/NewRequest.vue'
import VTooltip from '../components/core/forms/v-tooltip.vue'
import RequestInput from '../components/core/requestUI/RequestInput.vue'
import { useAppStore } from "~~/store/app";
import { useRequestStore } from "~~/store/request";
import { useCreateNewRequest } from '~~/composables/useCreateNewrequest';
import { useMakerequest } from '~~/composables/useMakerequest';
import { useModal } from 'vue-modally-v3';

const storeData = useAppStore();
const requestStore = useRequestStore()
const { addRequestTabHeader } = useCreateNewRequest()
const { setRequestConfig } = useMakerequest()

definePageMeta({
  layout: 'main-layout'
})

let isNewReq = ref(false)
console.log('hello world', useRoute().query.t)
const computedCurrentTabDisplayed = computed(() => {
  let regex = new RegExp(`new-\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}`)
  if (regex.test(useRoute().query?.t)) {
    if(!requestStore.newRequestHeaderstab.find((item) => item.id == useRoute().query?.t)) return
    isNewReq.value = true
  } else {
    isNewReq.value = false
  }
  return isNewReq.value ? NewRequest : MainRequest
})




onMounted(() => {
  console.log('mounted')
  let hasProject = handleCheckProject()
  if(!hasProject) return

  if (useRoute().query?.t) {
    addRequestTabHeader(useRoute().query?.t)
  }
  setRequestConfig({
    baseurl: storeData.projectDetails?.baseurl
  })

})

async function handleCheckProject() {
  console.log('handleCheckProject', storeData.currentProjectId, storeData.allProjects)
  if (!storeData.projectDetails) {
    let createProjectModal = await useModal(CreateNewApp, {
      options: {
        background: 'white',
        width: 1000,
        type: "modal",
        blur: false,
        closable: false,
      }
    })
  }
  return true
}



</script>

<style scoped>
.requestoption li.nav-link {
  display: inline-block;
  position: relative;
  /* margin: auto; */
}

.requestoption li.nav-link::after {
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
  transform-origin: bottom center;
  transition: transform 0.4s ease-out;
}

.requestoption li.nav-link.active:after {
  transform: scaleX(1);
  transform-origin: bottom center;
}
</style>