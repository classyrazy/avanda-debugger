<template>
    <div class="bg-[#D3B8EE] text-center py-2">
        <p class="inline-flex justify-center items-center cursor-pointer">
            Project Name
            <down-icon></down-icon>
        </p>
    </div>
    <section class=" grid grid-cols-10">
        <debugger-sidebar class="col-span-2   border-r-2 " />
        <div class="col-span-8 max-h-screen overflow-y-auto">
            <tabs-topbar class="sticky top-0 bg-white z-30"></tabs-topbar>
            <div class="" v-if="true">
                <keep-alive>
                    <component :is="computedCurrentTabDisplayed" />
                </keep-alive>
            </div>
        </div>
        <modal-root></modal-root>
        <alert></alert>
    </section>
</template>

<script setup lang="ts">
import DownIcon from '../components/icons/down-icon.vue'
import TabsTopbar from '../components/TabsTopbar.vue'
import DebuggerSidebar from '../components/DebuggerSidebar.vue'
import { computed, ref, markRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { newRequestsTabs, currentTabId, useRequestTabs,requestTabs } from '../composables/request/useRequestTabs'
import { requests } from '../composables/request/useRequest'
import NewRequest from '../components/NewRequest.vue'
import MainRequest from '../components/MainRequest.vue'


const router = useRouter()
const route  = useRoute()
let isNewReq = ref(false)
const  {addTabToRequestTabs} = useRequestTabs()
const computedCurrentTabDisplayed = computed(() => {
    let regex = new RegExp(`new-\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}`)
    const query = useRoute().query?.t as string
    if (regex.test(query)) {
        if (!newRequestsTabs.find((item) => item.id == useRoute().query?.t)) return
        isNewReq.value = true
    } else {
        isNewReq.value = false
    }
    return isNewReq.value ? markRaw(NewRequest) : markRaw(MainRequest)
})
watch(() => route.query.t, (val) => {
    console.log({val})
    const foundRequestBasedOnRoute = requests.find((item) => item.id == val)
    const foundRequestBasedOnRouteInwRequestTabs = requestTabs.find((item) => item.id == val)
    if (!foundRequestBasedOnRoute || foundRequestBasedOnRouteInwRequestTabs) {
        return
    }
    addTabToRequestTabs(foundRequestBasedOnRoute.requestData.name, foundRequestBasedOnRoute.id, foundRequestBasedOnRoute.requestData.type)
    // router.push({ query: { t: val } })
})
</script>

<style scoped></style>