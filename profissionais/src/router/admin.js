import Dominios from '@/components/admin/Dominios'
import NovoDominio from '@/components/admin/NovoDominio'
import Config from '@/components/admin/Config'

import {requireAdminAuth} from './base.js'

export default [
  {
    path: '/admin/dominios',
    name: 'admin-dominio',
    component: Dominios,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/admin/dominio/novo',
    name: 'admin-novo-dominio',
    component: NovoDominio,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/admin/config',
    name: 'admin-config',
    component: Config,
    //beforeEnter: requireAdminAuth
    
  },
]
