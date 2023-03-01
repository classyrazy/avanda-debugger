import { useStorage } from '@vueuse/core'
import { getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'

export function useIndexedDBPersistence(store: any) {
  const instance = getCurrentInstance()

  // Use the instance ID as the key for IndexedDB
  const key = `pinia-store-${instance.uid}`

  // Use useStorage to persist the store state to IndexedDB
  const { state: persistedState, set: setPersistedState } = useStorage(key, store.state)

  // Update the store state with the persisted state on initialization
  store.replaceState({ ...store.state, ...persistedState })

  // Update the persisted state when the store state changes
  store.$subscribe((mutation) => {
    setPersistedState(store.state)
  })
}
