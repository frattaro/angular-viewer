import 'regenerator-runtime/runtime'

import '@mdi/font/css/materialdesignicons.css'
import './assets/styles.css'

import Vue from 'vue'
import Vuetify, { VApp } from 'vuetify/lib'
import Home from './components/Home'

Vue.use(Vuetify)

export default new Vue({
  vuetify: new Vuetify({ icons: { iconfont: 'mdi' } }),
  render: h => h(VApp, { style: { 'min-width': '375px' } }, [ h(Home) ])
}).$mount('#app')
