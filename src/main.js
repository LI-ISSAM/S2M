import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import {initAuth, isAuthenticated, login, getAccessToken, getUser} from "@/services/auth";
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

(async () => {
  await initAuth();

  if (!(await isAuthenticated())) {
    await login();
    return;
  }

  // Attache automatiquement le token Auth0 à chaque appel axios vers le backend
  axios.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // On résout le nom AVANT de monter l'app : App.vue le reçoit déjà prêt,
  // il n'y a donc plus de premier rendu avec une valeur vide/"Disconnected".
  const user = await getUser();
  const connectedUserName = user ? (user.name || user.nickname || user.email) : "";

  new Vue({
    i18n,
    router,
    store,
    render: h => h(App, { props: { connectedUserName } })
  }).$mount('#app')
})();