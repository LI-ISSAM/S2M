import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import UserSpace from "@/components/User/UserSpace";
import AddUser from "@/components/User/AddUser";
import UpdateUser from "@/components/User/UpdateUser";
// import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import TeamSpace from "@/components/Team/TeamSpace";
import AddTeam from "@/components/Team/AddTeam";
import UpdateTeam from "@/components/Team/UpdateTeam";
import UserContainer from "@/components/User/UserContainer";
import Audit from "@/components/audit/Home";
import UserDetails from "@/components/User/UserDetails";
import TeamDetails from "@/components/Team/TeamDetails";
import TeamContainer from "@/components/Team/TeamContainer";
import AddInstitution from "./components/Institution/AddInstitution.vue";
import InstitutionContainer from "./components/Institution/InstitutionContainer.vue";
import InstitutionSpace from "./components/Institution/InstitutionSpace.vue";
import UpdateInstitution from "./components/Institution/UpdateInstitution.vue";
import InstitutionDetails from "./components/Institution/InstitutionDetails.vue";
import AddProgram from "./components/Program/AddProgram.vue";
import ProgramContainer from "./components/Program/ProgramContainer.vue";
import ProgramSpace from "./components/Program/ProgramSpace.vue";
import UpdateProgram from "./components/Program/UpdateProgram.vue";
import ProgramDetails from "./components/Program/ProgramDetails.vue";
import AddOffer from "./components/Offer/AddOffer.vue";
import OfferContainer from "./components/Offer/OfferContainer.vue";
import OfferSpace from "./components/Offer/OfferSpace.vue";
import UpdateOffer from "./components/Offer/UpdateOffer.vue";
import OfferDetails from "./components/Offer/OfferDetails.vue";
import CustomerDetails from "./components/Customer/CustomerDetails.vue";
import AddCustomer from "./components/Customer/AddCustomer.vue";
import CustomerContainer from "./components/Customer/CustomerContainer.vue";
import CustomerSpace from "./components/Customer/CustomerSpace.vue";
import UpdateCustomer from "./components/Customer/UpdateCustomer.vue";
import AddSubscription from "./components/Subscription/AddSubscription.vue";
import SubscriptionContainer from "./components/Subscription/SubscriptionContainer.vue";
import SubscriptionSpace from "./components/Subscription/SubscriptionSpace.vue";
import UpdateSubscription from "./components/Subscription/UpdateSubscription.vue";
import SubscriptionDetails from "./components/Subscription/SubscriptionDetails.vue";
import NotFound from "./components/common/NotFound.vue";
import AddMerchant from "./components/Merchant/AddMerchant.vue";
import MerchantContainer from "./components/Merchant/MerchantContainer.vue";
import MerchantSpace from "./components/Merchant/MerchantSpace.vue";
import UpdateMerchant from "./components/Merchant/UpdateMerchant.vue";
import MerchantDetails from "./components/Merchant/MerchantDetails.vue";

import AddInstallmentPlan from "./components/InstallmentPlan/AddInstallmentPlan.vue";
import InstallmentPlanContainer from "./components/InstallmentPlan/InstallmentPlanContainer.vue";
import InstallmentPlanSpace from "./components/InstallmentPlan/InstallmentPlanSpace.vue";
import UpdateInstallmentPlan from "./components/InstallmentPlan/UpdateInstallmentPlan.vue";
import InstallmentPlanDetails from "./components/InstallmentPlan/InstallmentPlanDetails.vue";

import AddInstallment from "./components/Installment/AddInstallment.vue";
import InstallmentContainer from "./components/Installment/InstallmentContainer.vue";
import InstallmentSpace from "./components/Installment/InstallmentSpace.vue";
import UpdateInstallment from "./components/Installment/UpdateInstallment.vue";
import InstallmentDetails from "./components/Installment/InstallmentDetails.vue";
import AddCard from "./components/Card/AddCard.vue";
import CardContainer from "./components/Card/CardContainer.vue";
import CardSpace from "./components/Card/CardSpace.vue";
import UpdateCard from "./components/Card/UpdateCard.vue";
import CardDetails from "./components/Card/CardDetails.vue";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      component: NotFound,
    },
    {
      path: "/home",
      component: Home,
      meta: {
        requiresAuth: true,
        // Specify role to access this url
        //role: process.env.VUE_APP_ROLE_READ_DASHBOARD
      },
    },
    {
      path: "/user",
      component: UserContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: UserSpace,
        },
        {
          path: "add",
          component: AddUser,
        },
        {
          path: "update",
          component: UpdateUser,
        },
        {
          path: "details",
          component: UserDetails,
        },
      ],
    },
    {
      path: "/team",
      component: TeamContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: TeamSpace,
        },
        {
          path: "add",
          component: AddTeam,
        },
        {
          path: "update",
          component: UpdateTeam,
        },
        {
          path: "details",
          component: TeamDetails,
        },
      ],
    },

    {
      path: "/institution",
      component: InstitutionContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: InstitutionSpace,
        },
        {
          path: "add",
          component: AddInstitution,
        },
        {
          path: "update",
          component: UpdateInstitution,
        },
        {
          path: "details",
          component: InstitutionDetails,
        },
      ],
    },

    {
      path: "/program",
      component: ProgramContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: ProgramSpace,
        },
        {
          path: "add",
          component: AddProgram,
        },
        {
          path: "update",
          component: UpdateProgram,
        },
        {
          path: "details",
          component: ProgramDetails,
        },
      ],
    },

    {
      path: "/offer",
      component: OfferContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: OfferSpace,
        },
        {
          path: "add",
          component: AddOffer,
        },
        {
          path: "update",
          component: UpdateOffer,
        },
        {
          path: "details",
          component: OfferDetails,
        },
      ],
    },
    {
      path: "/customer",
      component: CustomerContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: CustomerSpace,
        },
        {
          path: "add",
          component: AddCustomer,
        },
        {
          path: "update",
          component: UpdateCustomer,
        },
        {
          path: "details",
          component: CustomerDetails,
        },
      ],
    },
    {
      path: "/subscription",
      component: SubscriptionContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: SubscriptionSpace,
        },
        {
          path: "add",
          component: AddSubscription,
        },
        {
          path: "update",
          component: UpdateSubscription,
        },
        {
          path: "details",
          component: SubscriptionDetails,
        },
      ],
    },
    {
      path: "/merchant",
      component: MerchantContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: MerchantSpace,
        },
        {
          path: "add",
          component: AddMerchant,
        },
        {
          path: "update",
          component: UpdateMerchant,
        },
        {
          path: "details",
          component: MerchantDetails,
        },
      ],
    },
    {
      path: "/installmentPlan",
      component: InstallmentPlanContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: InstallmentPlanSpace,
        },
        {
          path: "add",
          component: AddInstallmentPlan,
        },
        {
          path: "update",
          component: UpdateInstallmentPlan,
        },
        {
          path: "details",
          component: InstallmentPlanDetails,
        },
      ],
    },

    {
        path: "/installment",component : InstallmentContainer,
        meta : {
          requiresAuth : true
        },
        children : [
          {
            path : "/",component : InstallmentSpace

          },
          {
            path : "add",component : AddInstallment
          },
          {
            path : "update",component : UpdateInstallment
          },
          {
            path : "details",component : InstallmentDetails
          }
        ]
    },
    {
      path: "/card",
      component: CardContainer,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: CardSpace,
        },
        {
          path: "add",
          component: AddCard,
        },
        {
          path: "update",
          component: UpdateCard,
        },
        {
          path: "details",
          component: CardDetails,
        },
      ],
    },
    {
      path: "/audit-trail",
      component: Audit,
      meta: {
        requiresAuth: true,
        //role: process.env.VUE_APP_ROLE_READ_DASHBOARD
      },
    },
  ],
});

/*
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (router.app.$keycloak.authenticated) {
            if (to.meta.role) {
                if (router.app.$keycloak.hasRealmRole(to.meta.role)) {
                    next()
                } else {
                    // notyf.open({type: 'error', message: 'Access Denied : Role ' + to.meta.role + ' required!'});
                    NxpToast.toastError('Access Denied');
                }
            } else {
                next();
            }

        } else {
            const loginUrl = router.app.$keycloak.createLoginUrl()
            window.location.replace(loginUrl)
        }
    } else {
        next()
    }
});
*/

export default router;
