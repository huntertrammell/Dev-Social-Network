import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Profile.vue')
    },
    {
      path: '/social',
      name: 'social',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Social.vue')
    },
    {
      path: '/account',
      name: 'accountManagement',
      component: () => import(/*  */ './views/Account.vue')
    },
    {
      path: '/user/:userId',
      name: 'user',
      props: true,
      component: () => import(/*  */ './views/OtherUser.vue')
    },
    {
      path: '/passwordreset/:token',
      name: 'reset',
      props: true,
      component: () => import(/*  */ './views/ResetPassword.vue')
    },
    {
      path: '/guest-login',
      name: 'guestLogin',
      props: { isGuest: true },
      component: Home
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})
