<template>
  <nxp-container
    mainColor="#17a2b8"
    sideTheme="white-theme"
    :fixNavBar="false"
    :version="' S2M Version ' + require('@/../package.json').version"
    :pill="true"
    :menu_items="menu_items"
    @change_lang="lang = $event"
    connectedUser="Litimi Issam"
  >
    <!-- :connectedUser="$keycloak.fullName" @signOut="$keycloak.logoutFn" -->
    <template #sidebar-header>
      <img alt="Logo" class="py-3 app-logo" src="@/assets/logo.png" />
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
          href: "/home",
          title: "Dashboard",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "tachometer-alt",
            },
            // text: ''
          },
        },
        {
          href: "",
          title: "Customer",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "user",
            },
          },
          child: [
            {
              href: "/customer",
              title: "Customers",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "user",
                },
              },
            },
            {
              href : "/card",
              title : "Cards",
              icon : {
                element : "font-awesome-icon",
                class : "text-info bg-transparent",
                attributes : {
                  icon : "credit-card"
            }
            }
          },
            {
              href: "/customer/add",
              title: "Add Customer",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "plus",
                },
              },
            },
          ],
        },
         {
          href:'',
          title:'Merchant',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'store'
            }
          },
          child:[
            {
              href:'/merchant',
              title:'Merchants',
              icon :{
                  element:'font-awesome-icon',
                  class:"text-info bg-transparent",
                  attributes:{
                      icon:'store'
              }
            }
            },
            {
              href:'/merchant/add',
              title:'Add Merchant',
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
          href: "",
          title: "Onboarding",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "university",
            },
          },
          child: [
            {
              href: "/institution",
              title: "Institutions",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "university",
                },
              },
            },
            {
              href: "/institution/add",
              title: "Add Institution",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "plus",
                },
              },
            },
          ],
        },
        {
          href: "",
          title: "Program",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "list",
            },
          },
          child: [
            {
              href: "/program",
              title: "Programs",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "list",
                },
              },
            },
            {
              href: "/program/add",
              title: "Add Program",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "plus",
                },
              },
            },
          ],
        },
        {
          href: "",
          title: "Parametre",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "cogs",
            },
          },
          child: [
            {
              href: "/offer",
              title: "Offers",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "cogs",
                },
              },
            },
            {
              href: "/offer/add",
              title: "Add Offer",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "plus",
                },
              },
            },
          ],
        },

        {
          href: "",
          title: "Subscription",
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "credit-card",
            },
          },
          child: [
            {
              href: "/subscription",
              title: "Subscriptions",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "credit-card",
                },
              },
            },
            {
              href: "/subscription/add",
              title: "Add Subscription",
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "plus",
                },
              },
            },
          ],
        },
       {
          href:'',
          title:'Installment Plan ',
          icon:{
            element:'font-awesome-icon',
            class:'p-1 bg-info',
            attributes:{
              icon:'clipboard'
            }
          },
          child:[
            {
              href:'/installmentPlan',
              title:'Installment Plans',
              icon :{
                  element:'font-awesome-icon',
                  class:"text-info bg-transparent",
                  attributes:{
                      icon:'clipboard'
              }
            }
            },
            {
              href:'/installment',
              title:'Installments',
              icon :{
                  element:'font-awesome-icon',
                  class:"text-info bg-transparent",
                  attributes:{
                      icon:'clipboard'
              }
            }
            },
            {
              href:'/installmentPlan/add',
              title:'Add Installment Plan',
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
      
      
      ],
    };
  },

  methods: {
    changeLang(newLang) {
      this.$store.commit("updateLocale", newLang);
    },
  },
  computed: {
    minimize() {
      return this.$store.state["nxpPluginStore"].sidebarMinimize;
    },
    lang: {
      get: function () {
        this.$store.dispatch("changeLocale", this.$store.state.locale);
        return this.$store.state.locale;
      },
      set: function (newValue) {
        this.$store.dispatch("changeLocale", newValue);
      },
    },
  },
};
</script>

<style>
.app-logo {
  width: 160px;
  height: 63px;
  margin-left: 55px;
}
</style>
