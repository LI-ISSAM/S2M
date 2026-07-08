<template>
    <nxp-container mainColor="#17a2b8" 
                   sideTheme="white-theme"
                   :fixNavBar="false"
                   :version="' S2M Version '+require('@/../package.json').version"
                   :pill="true"
                   :menu_items="menu_items" 
                   @change_lang="lang=$event"
                   connectedUser="Salim BENZERAGAH"
    >
      <!-- :connectedUser="$keycloak.fullName" @signOut="$keycloak.logoutFn" -->
      <template #sidebar-header>
        <img alt="Logo" class="py-3 app-logo" src="@/assets/logo.png">
      </template>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
    </nxp-container>
</template>

<script>
export default {
  name: "AppContainer",
  data() {
    return {
      menu_items: [
        {
          href: '/home',
          title: 'Dashboard',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'tachometer-alt'
            }
            // text: ''
          },
        },
        {
          href: '',
          title: 'Users',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'user'
            }
          },
          child: [
            {
              href: '/user',
              title: 'Users Space',
              icon: {
                element: 'font-awesome-icon',
                class: 'text-info bg-transparent',
                attributes: {
                  icon: 'user'
               }
              },
            },
            {
              href: '/user/add',
              title: 'Add User',
              icon: {
                element: 'font-awesome-icon',
                class: 'text-info bg-transparent',
                attributes: {
                  icon: 'plus'
               }
              },
            }
          ]
        },
        {
          href: '',
          title: 'Teams Space',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'users'
            }
            // text: ''
          },
          child: [
          {
              href: '/team',
              title: 'Teams Space ',
              icon: {
                element: 'font-awesome-icon',
                class: 'text-info bg-transparent',
                attributes: {
                  icon: 'users'
               }
              },
            },
            {
              href: '/team/add',
              title: 'Add Team',
              icon: {
                element: 'font-awesome-icon',
                class: 'text-info bg-transparent',
                attributes: {
                  icon: 'plus'
               }
              },
            }
          ]
        },
        {
          href:'',
          title:'Onboarding',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'university'
            }
          },
          child:[
            {
              href:'/institution',
              title:'Institutions',
              icon :{
                  element:'font-awesome-icon',
                  class:"text-info bg-transparent",
                  attributes:{
                      icon:'university'
              }
            }
            },
            {
              href:'/institution/add',
              title:'Add Institution',
              icon :{
                  element:'font-awesome-icon',
                  class:"text-info bg-transparent",
                  attributes:{
                      icon:'plus'
              }
            }
          }
          ]


        },
        {
          href: '/audit-trail',
          title: 'Audit Trail',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'fingerprint'
            }
            // text: ''
          },
        },
      ]
    }
  },
  methods :{
    changeLang(newLang){
      this.$store.commit('updateLocale',newLang)
    }
  },
  computed : {
    minimize () {
      return this.$store.state['nxpPluginStore'].sidebarMinimize
    },
    lang: {
      get: function () {
        this.$store.dispatch('changeLocale', this.$store.state.locale);
        return this.$store.state.locale
      },
      set: function (newValue) {
        this.$store.dispatch('changeLocale', newValue)
      }
    }
  }
}
</script>



<style>
.app-logo {
  width: 160px;
  height: 63px;
  margin-left: 55px;
}
</style>