import { createStore } from 'vuex'

export default createStore({
  state: {
    theme:'chalk'
  },
  mutations: {
    changeTheme(state) {
     return state.theme === 'chalk'? 'vintage':"chalk"
    }
  },
  actions: {
  },
  modules: {
  }
})
