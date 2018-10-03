import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import session from './modules/session'
import teacher from './modules/teacher'
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
  	session,
  	teacher
  },
  strict: true,
  plugins: [createLogger()]
})