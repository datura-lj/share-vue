import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import VueResource from 'vue-resource'


import '../static/css/reset.css'
import '../static/js/rem.js'

Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
