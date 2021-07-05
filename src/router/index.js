import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ComingSoon from '../views/default/ComingSoon'
import Empty from '../views/default/Empty'

Vue.use(VueRouter)

export const NamedRoute = {
  HOMEPAGE: 'Home',
}

const routes = [
  {
    path: '/',
    name: NamedRoute.HOMEPAGE,
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/404',
    name: 'Empty',
    component: Empty,
  },
  {
    path: '*',
    name: 'ComingSoon',
    component: ComingSoon,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
