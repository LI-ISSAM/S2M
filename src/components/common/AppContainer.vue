<template>
  <nxp-container
    mainColor="#17a2b8"
    sideTheme="white-theme"
    :fixNavBar="false"
    :version="' S2M Version ' + require('@/../package.json').version"
    :pill="true"
    :menu_items="menu_items"
    @change_lang="lang = $event"
    :connectedUser="connectedUserName"
    @signOut="signOut"
  >
    <template #sidebar-header>
      <img alt="Logo" class="py-3 app-logo" src="@/assets/logo.png" />
    </template>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
  </nxp-container>
</template>

<script>
import { getUser, logout } from "@/services/auth";

export default {
  name: "AppContainer",
    props: {

    connectedUserName: {
      type: String,
      default: ""
    }
  },
  computed: {
    menu_items() {
      const t = (key) => this.$t(key);

      return [
        {
          href: "/home",
          title: t("navigation.dashboard"),
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "tachometer-alt",
            },
          },
        },
        {
          href: "",
          title: t("navigation.customer"),
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
              title: t("navigation.customers"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "user",
                },
              },
            },
            {
              href: "/card",
              title: t("navigation.cards"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "credit-card",
                },
              },
            },
            {
              href: "/customer/add",
              title: t("navigation.addCustomer"),
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
          title: t("navigation.merchant"),
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "store",
            },
          },
          child: [
            {
              href: "/merchant",
              title: t("navigation.merchants"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "store",
                },
              },
            },
            {
              href: "/merchant/add",
              title: t("navigation.addMerchant"),
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
          title: t("navigation.onboarding"),
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
              title: t("navigation.institutions"),
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
              title: t("navigation.addInstitution"),
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
          title: t("navigation.program"),
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
              title: t("navigation.programs"),
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
              title: t("navigation.addProgram"),
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
          title: t("navigation.settings"),
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
              title: t("navigation.offers"),
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
              title: t("navigation.addOffer"),
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
          title: t("navigation.subscription"),
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
              title: t("navigation.subscriptions"),
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
              title: t("navigation.addSubscription"),
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
          title: t("navigation.installmentPlan"),
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "clipboard",
            },
          },
          child: [
            {
              href: "/installmentPlan",
              title: t("navigation.installmentPlans"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "clipboard",
                },
              },
            },
            {
              href: "/installment",
              title: t("navigation.installments"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "clipboard",
                },
              },
            },
            {
              href: "/installmentPlan/add",
              title: t("navigation.addInstallmentPlan"),
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
          title: t("navigation.operation"),
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "exchange-alt",
            },
          },
          child: [
            {
              href: "/operation",
              title: t("navigation.operations"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "exchange-alt",
                },
              },
            },
            {
              href: "/operation/add",
              title: t("navigation.addOperation"),
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
          title: t("navigation.inquiry"),
          icon: {
            element: "font-awesome-icon",
            class: "p-1 bg-info",
            attributes: {
              icon: "search",
            },
          },
          child: [
            {
              href: "/freezingInquiry",
              title: t("navigation.freezingInquiry"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "snowflake",
                },
              },
            },
            {
              href: "/forceClosureInquiry",
              title: t("navigation.forceClosureInquiry"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "unlock-alt",
                },
              },
            },
            {
              href: "/rescheduleInquiry",
              title: t("navigation.rescheduleInquiry"),
              icon: {
                element: "font-awesome-icon",
                class: "text-info bg-transparent",
                attributes: {
                  icon: "tv",
                },
              },
            },
          ],
        },
      ];
    },
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

  async created (){
    const user = await getUser();
    this.connectedUserName = user ? (user.name || user.nickname || user.email) : "";
  },
  methods: {
    changeLang(newLang) {
      this.$store.dispatch("changeLocale", newLang);
    },
    signOut(){
      logout();
    }
  },

}
</script>

<style>
.app-logo {
  width: 160px;
  height: 63px;
  margin-left: 55px;
}
</style>
