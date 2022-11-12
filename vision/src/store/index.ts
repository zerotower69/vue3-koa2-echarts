import { defineStore } from 'pinia'
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    theme:'chalk'
  }),
  actions: {
    changeTheme() {
      this.theme = this.theme === "chalk"? "vintage":"chalk"
    }
  }
})
