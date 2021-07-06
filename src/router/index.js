import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Heros from '../views/Heros'

import ComingSoon from '../views/default/ComingSoon'
import Empty from '../views/default/Empty'

Vue.use(VueRouter)

export const NamedRoute = {
  HOMEPAGE: 'Home',
  EMPTY: 'Empty',
  HOLDING: 'ComingSoon',
}

const routes = [
  {
    path: '/',
    name: NamedRoute.HOMEPAGE,
    component: Home,
  },
  {
    path: '/heros',
    name: 'Heros',
    component: Heros,
  },
  {
    path: '/404',
    name: NamedRoute.Empty,
    component: Empty,
  },
  {
    path: '*',
    name: NamedRoute.HOLDING,
    component: ComingSoon,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
