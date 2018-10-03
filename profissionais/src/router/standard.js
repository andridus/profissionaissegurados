import IndexPage from '@/components/Index.vue'
import LoginPage from '@/components/Login.vue'


import {requireAuth, requireUnauth, requireLogout} from './base.js'

export default [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    beforeEnter: requireAuth
    
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: requireUnauth
    
  },
  {
    path: '/session/sair',
    name: 'logout',
    component: IndexPage,
    beforeEnter: requireLogout
    
  },
   {
    path: '*',
    name: 'NotFind',
    component: IndexPage,
  },
]
