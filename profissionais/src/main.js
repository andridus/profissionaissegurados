import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'

import moment from 'moment'

import 'bulma/css/bulma.css'
import 'fontawesome'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from '@/components/_loading.vue'



moment.locale('pt-BR');
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI, { locale })


global.Loading = {
  begin(msg){
    const ComponentClass = Vue.extend(Loading)
    let instance = new ComponentClass({
      propsData: { msg: msg }
    })
    instance.$mount() // pass nothing
    const lc =  document.getElementById('loading-container');
    if(lc)
      lc.appendChild(instance.$el)
  },
  end(){
    const lc = document.getElementById('loading-container');
    if(lc)
    {
      if (lc.children[0])
        lc.children[0].classList.add("hide");
      setTimeout(()=> lc.innerHTML = '', 1000);
    }
  }
}




new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})