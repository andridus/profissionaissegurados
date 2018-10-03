import El from 'element-ui'
import axios from 'axios'
import router from '@/router'
import querystring from 'querystring';  
import store from 'store'
import utils from '@/utils'

// initial state

const base = 'http://localhost:4451/teacher'

const state = {
	
}
/*new({ jwt, params }, cb) {
        axios({
            url: `${base}/bussiness/`,
            method: 'POST',
            headers: { 'authorization': `bearer ${jwt}`, 'content-type': 'application/x-www-form-urlencoded' },
            data: querystring.stringify(params)

        }).then(function (success) {
            cb('SUCCESS', success)

        }).catch(function (error) {
            cb('ERROR', error)

        })
    },*/
// getters
const getters = {}

// actions
const actions = {
  getAulas({commit, rootState}, data) {
    const curso = utils.getCourseFromNumber(rootState.session.disciplinas, data.course);
    const turma = utils.getTurmaFromNumber(rootState.session.disciplinas, data.course, data.turma);


    global.Loading.begin(`Carregando as aula de ${curso} da turma ${turma}...`);
    return new Promise((resolve,reject)=>{ 
      axios.get(`${base}/aulas`,{
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },
        params:{
          course: data.course,
          turma: data.turma
        }
            
      }).then(function(success){
          
          global.Loading.end();
          resolve(success.data);
      }).catch(function(error){
          El.MessageBox({
            title: "Erro ao resgatar as suas aulas.",
            message: "<p>Não foi possível resgatar as suas aulas</p><p>Aconteceu algum erro inesperado, pedimos que tente novamente...</p><p>... e nos desculpe pelo incoveniente.</p>",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: 'Tudo bem',
            type: 'error',
            callback: action => {
              router.push(`/teacher/classroom/${data.course}/${data.turma}`)
          }})

          reject(false);
          global.Loading.end();
      })
    })

  },
  getProvas({commit, rootState}, data) {
    const curso = utils.getCourseFromNumber(rootState.session.disciplinas, data.course);
    const turma = utils.getTurmaFromNumber(rootState.session.disciplinas, data.course, data.turma);


    global.Loading.begin(`Carregando as provas de ${curso} da turma ${turma}...`);
    return new Promise((resolve,reject)=>{ 
      axios.get(`${base}/provas`,{
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },
        params:{
          course: data.course,
          turma: data.turma
        }
            
      }).then(function(success){
          
          global.Loading.end();
          resolve(success.data);
      }).catch(function(error){
          El.MessageBox({
            title: "Erro ao resgatar as suas provas.",
            message: "<p>Não foi possível resgatar as suas provas</p><p>Aconteceu algum erro inesperado, pedimos que tente novamente...</p><p>... e nos desculpe pelo incoveniente.</p>",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: 'Tudo bem',
            type: 'error',
            callback: action => {
              router.push(`/teacher/classroom/${data.course}/${data.turma}`)
          }})

          reject(false);
          global.Loading.end();
      })
    })

  },
  getAula({commit, rootState}, data) {
   
    global.Loading.begin(`Carregando a aula #${data.aula}`);
    return new Promise((resolve,reject)=>{ 
      axios.get(`${base}/aula/${data.aula}`,{
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },
        
            
      }).then(function(success){
          
          
          resolve(success.data);
          global.Loading.end();
      }).catch(function(error){
          El.MessageBox({
            title: `Erro ao resgatar a sua aulas #${data.aula}.`,
            message: "<p>Não foi possível resgatar a aula.</p><p>Aconteceu algum erro inesperado, pedimos que tente novamente...</p><p>... e nos desculpe pelo incoveniente.</p>",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: 'Tudo bem',
            type: 'error',
            callback: action => {
              router.push(`/teacher/classroom/${data.course}/${data.turma}`)
          }})
          reject(false);
          global.Loading.end();
      })
    })

  },
  getProva({commit, rootState}, data) {
   
    global.Loading.begin(`Carregando a prova #${data.prova}`);
    return new Promise((resolve,reject)=>{ 
      axios.get(`${base}/prova/${data.prova}`,{
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },
        
            
      }).then(function(success){
          
          
          resolve(success.data);
          global.Loading.end();
      }).catch(function(error){
          El.MessageBox({
            title: `Erro ao resgatar a sua prova #${data.prova}.`,
            message: "<p>Não foi possível resgatar a prova.</p><p>Aconteceu algum erro inesperado, pedimos que tente novamente...</p><p>... e nos desculpe pelo incoveniente.</p>",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: 'Tudo bem',
            type: 'error',
            callback: action => {
              router.push(`/teacher/classroom/${data.course}/${data.turma}`)
          }})
          reject(false);
          global.Loading.end();
      })
    })

  },



  getDiarioFrequencia({commit, rootState}, data) {
    const curso = utils.getCourseFromNumber(rootState.session.disciplinas, data.course);
    const turma = utils.getTurmaFromNumber(rootState.session.disciplinas, data.course, data.turma);


    global.Loading.begin(`Carregando as frequencias de ${data.mes} de ${curso} da turma ${turma}...`);
    return new Promise((resolve,reject)=>{ 
      axios.get(`${base}/diario/frequencia`,{
        headers: { 'authorization': `bearer ${rootState.session.jwt}` },
        params:{
          course: data.course,
          turma: data.turma,
          mes: data.mes
        }
            
      }).then(function(success){
          
          global.Loading.end();
          resolve(success.data);
      }).catch(function(error){
          El.MessageBox({
            title: `Erro ao resgatar as frequencias do mês de ${data.mes}.`,
            message: "<p>Não foi possível resgatar as frequencias.</p><p>Aconteceu algum erro inesperado, pedimos que tente novamente...</p><p>... e nos desculpe pelo incoveniente.</p>",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            confirmButtonText: 'Tudo bem',
            type: 'error',
            callback: action => {
              //router.push(`/teacher/classroom/${data.course}/${data.turma}`)
          }})

          reject(false);
          global.Loading.end();
      })
    })

  },
  
  
}

// mutations
const mutations = {

    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}