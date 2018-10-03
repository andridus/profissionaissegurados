import Vue from 'vue'
import VueRouter from 'vue-router'


//import Started from '@/components/Started.vue'



import standardRoutes from './standard'
import adminRoutes from './admin'
import dominioRoutes from './dominio'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    ...standardRoutes,
    ...adminRoutes,
    ...dominioRoutes
  ]
})