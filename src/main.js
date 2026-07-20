import Vue from 'vue'
import App from './App.vue'
import NxpUiLibrary from 'vue-nxp-plugin/dist/vue-nxp-plugin.common'
import 'vue-nxp-plugin/dist/vue-nxp-plugin.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


import store from '@/store'
import i18n from './plugins/i18n'
import router from "@/router";
// import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
// import VueKeycloakJs from 'nxp-keycloak-plugin'
import {faUsers, faTachometerAlt, faStore, faPlus} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
library.add(faUsers, faTachometerAlt, faStore, faPlus)
Vue.config.productionTip = false

Vue.use(NxpUiLibrary,store);


// Use Audit Trail Ui
import AuditTrailUiPlugin from 'nxp-audit-trail-ui-plugin/dist/nxp-audit-trail-ui-plugin.common'
Vue.use(AuditTrailUiPlugin,{ 'auditTrailUrl': process.env.VUE_APP_ITSP_TRACING_URL});

/*
Vue.use(VueKeycloakJs, {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'check-sso'
  },
  config: {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
    realm: process.env.VUE_APP_KEYCLOAK_REALM
  },
  onReady: () => {
    new Vue({
      created() {
        Vue.prototype.$keycloak.keycloakevents.$on(
            Vue.prototype.$keycloak.eventTypes.onSessionExpired,
            () => {
              console.log("Session Expired");
              NxpToast.openToast( 'warning','Session Expirée!')
                  .on('dismiss', () => Vue.prototype.$keycloak.logoutFn());
            }
        );
      },
      i18n,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
*/

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')