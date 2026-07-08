import Vue from 'vue'
import Router from 'vue-router'
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
import AddInstitution from './components/Institution/AddInstitution.vue';
import InstitutionContainer from './components/Institution/InstitutionContainer.vue';
import InstitutionSpace from './components/Institution/InstitutionSpace.vue';
import UpdateInstitution from './components/Institution/UpdateInstitution.vue';
import InstitutionDetails from './components/Institution/InstitutionDetails.vue';



Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

      {
          path: '/',
          redirect: '/home',
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '*',
          redirect: '/home'
      },
      {
          path: '/home', component: Home,
          meta: {
              requiresAuth: true,
              // Specify role to access this url
              //role: process.env.VUE_APP_ROLE_READ_DASHBOARD
          }
      },
      { path: '/user',component: UserContainer,
          meta: {
              requiresAuth: true
          },
          children: [
              {
                  path: '/', component: UserSpace
              },
              {
                  path: 'add', component: AddUser
              },
              {
                  path: 'update', component: UpdateUser
              },
              {
                  path: 'details', component: UserDetails
              }
          ]
      },
      { path: '/team',component: TeamContainer,
          meta: {
              requiresAuth: true
          },
          children: [
              {
                  path: '/', component: TeamSpace
              },
              {
                  path: 'add', component: AddTeam
              },
              {
                  path: 'update', component: UpdateTeam
              },
              {
                  path: 'details', component: TeamDetails
              }
          ]
      },

      {
        path:'/institution',component: InstitutionContainer,
        meta : {
            requiresAuth: true
        },
        children : [
            {
                path:'/',component: InstitutionSpace
            },
            {
                path:'add',component: AddInstitution
            },
            {
                path:'update',component:UpdateInstitution
            },
            {
                path:'details',component:InstitutionDetails
            }
        ]


      },


      {
          path: '/audit-trail', component: Audit,
          meta: {
              requiresAuth: true,
              //role: process.env.VUE_APP_ROLE_READ_DASHBOARD
          }
      },



      ]
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

export default router