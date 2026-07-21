import Vue from 'vue'
import App from './App.vue'
import NxpUiLibrary from 'vue-nxp-plugin/dist/vue-nxp-plugin.common'
import 'vue-nxp-plugin/dist/vue-nxp-plugin.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import store from '@/store'
import i18n from './plugins/i18n'
import router from "@/router";

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons' // Toutes les icônes solid
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(NxpUiLibrary, store);

import AuditTrailUiPlugin from 'nxp-audit-trail-ui-plugin/dist/nxp-audit-trail-ui-plugin.common'
Vue.use(AuditTrailUiPlugin, { 'auditTrailUrl': process.env.VUE_APP_ITSP_TRACING_URL });

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')