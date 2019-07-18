import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from "./router"

Vue.config.productionTip = false


//import 'amfe-flexible'
import './assets/mixin.scss'
import './assets/icon.scss'
import './assets/reset.scss'
import './common/style/base.scss'



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
