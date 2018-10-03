import El from 'element-ui'
import axios from 'axios'
import router from '@/router'
import querystring from 'querystring';  
import store from 'store'


// initial state

const base = 'http://localhost:8080'

const state = {
	hideMenu: false,
    auth: false,
    user: {},
    jwt: null,
    exp: null,
    lastCheck: 0,
    type: null,
}

const getters = {}

// actions
const actions = {
  login({commit}, data) {
    global.Loading.begin("Verificando suas credenciais...");
    axios.post(`${base}/session/login`,{
            username: data.username,
            password: data.password
    }).then(function(success){
        commit('setAuthedUser', success.data);
        global.Loading.end();
        router.push('/')
    }).catch(function(error){
        El.MessageBox({
          title: "Erro com os seus dados",
          message: "<p>Esses dados são inválidos.</p><p> Por favor, verifique se os dados estão corretos e tente novamente</p>",
          dangerouslyUseHTMLString: true,
          showCancelButton: false,
          confirmButtonText: 'Certo',
          type: 'error',
          callback: action => {
            
        }})
        global.Loading.end();
    })

  },
  logout({commit, rootState}, data) {
    axios({
        url: `${base}/session/logout`,
        method: 'GET',
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },

    }).then(function(success){
        commit('setLogoutAuthedUser', {});
    }).catch(function(error){
        El.MessageBox({
          title: "Erro no servidor!",
          message: "<p>Desculpe-nos, mas tivemos algum erro no servidor.</p><p> Pedimos que tente novamente</p>",
          dangerouslyUseHTMLString: true,
          showCancelButton: false,
          confirmButtonText: 'Certo',
          type: 'error',
          callback: action => {
            
        }})
    })

  },
  check({commit, rootState}, data) {
      
    return new Promise((resolve,reject)=>{
      const session = store.get('session');
      console.log(session)
      if(session){
          return axios.get(`${base}/session/check`,{
          params: {jwt: session.jwt}
          }).then((r)=>{
            if(r.data.auth){
              commit('setAuthedUserFromSession',session);
              resolve(true);
            }else{
              commit('setLogoutAuthedUser', {});
              store.remove('session' );
              reject(false);
            }
              
          }).catch(()=>{
            
            commit('setLogoutAuthedUser', {});
            store.remove('session' );
            reject(false);
          })
            
      }else{
        reject(false)
      }
  })
      

  },
  hideMenu({ commit }, data) {
    commit('hiddingMenu', true)
  },
  unhideMenu({ commit }, data) {
    commit('hiddingMenu', false)
  },
  
}

// mutations
const mutations = {
	hiddingMenu(state,data){
		state.hideMenu = data;
	},
  setAuthedUser(state, data){
      state.auth = true;
      state.user = data.user;
      state.jwt = data.token;
      state.exp = data.exp;
      state.lastCheck = new Date().getTime();
      state.type = data.user.type_id;
      store.set('session', state );
  },
  setAuthedUserFromSession(state, data){
      state.auth = true;
      state.user = data.user;
      state.jwt = data.jwt;
      state.exp = data.exp;
      state.lastCheck = new Date().getTime();
      state.type = data.type;
      state.menu = 1;
      store.set('session', state );
  },
  setLogoutAuthedUser(state, data){
      state.auth = false;
      state.user = {};
      state.jwt = null;
      state.exp = null;
      state.lastCheck = new Date().getTime();
      state.type = null;
      store.remove('session' );
  }
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}