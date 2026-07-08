import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('@/i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  setTimeout(()=>{
    messages.en = {...Vue.prototype.$plugin_messages.en ,...messages.en}
    messages.fr = {...Vue.prototype.$plugin_messages.fr ,...messages.fr}
  },0)

  setTimeout(()=>{
    messages.en = {...Vue.prototype.$audit_trail_messages.en ,...messages.en}
    messages.fr = {...Vue.prototype.$audit_trail_messages.fr ,...messages.fr}
  },0)

  return messages
}

function checkDefaultLanguage() {
  let matched = null
  let languages = Object.getOwnPropertyNames(loadLocaleMessages())
  languages.forEach(lang => {
    if (lang === navigator.language) {
      matched = lang
    }
  })
  if (!matched) {
    languages.forEach(lang => {
      let languagePartials = navigator.language.split('-')[0]
      if (lang === languagePartials) {
        matched = lang
      }
    })
  }
  return matched
}
export const selectedLocale = checkDefaultLanguage() || process.env.VUE_APP_I18N_LOCALE || 'en'
export const languages = Object.getOwnPropertyNames(loadLocaleMessages())

export default new VueI18n({
  locale: selectedLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
