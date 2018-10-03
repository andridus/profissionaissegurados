import Inicial from '@/components/dominio/Index'
import Conteudos from '@/components/dominio/Conteudos'
import Estatisticas from '@/components/dominio/Estatisticas'
import Planos from '@/components/dominio/Planos'
import Clientes from '@/components/dominio/Clientes'
import Assinantes from '@/components/dominio/Assinantes'
import App from '@/components/dominio/App'
import Config from '@/components/dominio/Config'
import Homepage from '@/components/dominio/Homepage'

import {requireAdminAuth} from './base.js'

export default [
  {
    path: '/dominio/:dominio',
    name: 'dominio-index',
    component: Inicial,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/estatisticas',
    name: 'dominio-estatisticas',
    component: Estatisticas,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/principal',
    name: 'dominio-principal',
    component: Homepage,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/planos',
    name: 'dominio-planos',
    component: Planos,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/conteudos',
    name: 'dominio-conteudos',
    component: Conteudos,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/clientes',
    name: 'dominio-clientes',
    component: Clientes,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/assinantes',
    name: 'dominio-assinantes',
    component: Assinantes,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/app',
    name: 'dominio-app',
    component: App,
    //beforeEnter: requireAdminAuth
    
  },
  {
    path: '/dominio/:dominio/config',
    name: 'dominio-config',
    component: Config,
    //beforeEnter: requireAdminAuth
    
  },
 
]
