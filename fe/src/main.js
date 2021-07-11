import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


// Create a new store instance.
const store = createStore({
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  state () {
    return {
      token: '',
      name: '',
    }
  },
  mutations: {
    setToken (state, array){
      state.token = array[0];
      state.name = array[1];
    },
  },
})

createApp(App).use(router).use(VueAxios, axios).use(store).mount('#app')
