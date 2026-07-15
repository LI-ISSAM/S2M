<template>
    <nxp-container :menu_items="menu_items" :connectedUser="$keycloak.fullName" @signOut="$keycloak.logoutFn" @change_lang="lang=$event">
      <template #sidebar-header>
        <img v-if="!minimize" class="py-2 ml-5" height="62" width="220" src="@/assets/logo.png" alt="Logo">
        <img v-else class="p-2 my-2" height="50" width="50" src="@/assets/logo-minimized.png" alt="Logo Minimized">
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
          title: 'Home',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'university'
            }
            // text: ''
          },
        },
        {
          href: '/user',
          title: 'Users Space',
          icon: {
            element: 'font-awesome-icon',
            class: 'p-1 bg-info',
            attributes: {
              icon: 'user'
            }
            // text: ''
          },
          child: [
            {
              href: '/user/add',
              title: 'Add'
            },
            {
              href: '/user/update',
              title: 'Update'
            }
          ]
        },
        {
          href: '/team',
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
              href: '/team/add',
              title: 'Add'
            },
            {
              href: '/team/update',
              title: 'Update'
            }
          ]
        },
        {
          href:'/institution',
          title:'Institutions Space',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'university'
            }
        }
        },
        {
          href:'/program',
          title:'Program Space',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'university'
            }
        }
      },
          {
          href:'/offer',
          title:'Offer Space',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'cong'
            }
        }
        },
        {
          href :'customer',
          title :'Customer Space',
          icon : {
            element : 'font-awesome-icon',
            class : 'p-1 bg-info',
            attributes : {
              icon : 'user-friends'
        }
      }
    },
    {
      href :'subscription',
          title :'Subscription Space',
          icon : {
            element : 'font-awesome-icon',
            class : 'p-1 bg-info',
            attributes : {
              icon : 'file-invoice'
        }
      }
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
.v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--item_open .vsm--link_level-1 {
  color: #fff;
  background-color: #17a2b8 !important;
}

.v-sidebar-menu.vsm_white-theme .vsm--item_open {
  color: #fff;
  background-color: #17a2b8 !important;
}
</style>
