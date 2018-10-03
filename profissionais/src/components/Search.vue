<template>
  <div class="menu-prof">
    <div class="menu-prof2">
      <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-prof" mode="horizontal" @select="handleSelect" :router='true'>
          <el-menu-item index="0">
            <figure class="image ">
              <img class="" src="/img/profissionais_segurados_2.svg">
            </figure>
          </el-menu-item>
          <el-menu-item route='/' index="1">Visão Geral</el-menu-item>
          <el-menu-item route='/admin/dominios' index="2">Domínios</el-menu-item>
          <el-menu-item route='/session/sair' index="3">Sair</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Store from '@/store'
import moment from 'moment'
import utils from '@/utils'


export default {
    data() {
      return {
        activeIndex: '1',
        links: [],
        state3: '',
        breads: [],
      };
    },
    watch: {
      '$route': function (r) {
               
        this.loadRoute(r)
      }
    },
    computed:{
      ...mapState({
        hideMenu: state => state.session.hideMenu,
        disciplinas: state => state.session.disciplinas
      })
    },
    methods: {
      unhideMenu(){
        Store.dispatch('session/unhideMenu', {});
      },
      spliJoinUrl(arr, num){
        const nums = Array.from(Array(num+1).keys());
        const a = arr.split("/");
        const ret = nums.map(x=>{
          return a[x]
        })
        
        return  ret.join("/")

      },
      
      loadRoute(r){
        
        switch(r.name){
          case 'teacher-classroom':
            this.breads = [
                {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2)}
              ]
          break;
          case 'teacher-classroom-course':
          this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2)},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )}
            

            ]
          break;
          case 'teacher-classroom-turma':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2)},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},

            ]
          break;
          case 'teacher-new-class':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2 )},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},
              {label: "Nova Aula", link: this.spliJoinUrl(r.path, 5 )},

            ]
          break;
          case 'teacher-class':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2 )},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},
              {label: `Aula #${r.params.aula}`, link: this.spliJoinUrl(r.path, 5 )},

            ]
          break;
          case 'teacher-prova':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2 )},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},
              {label: `Prova #${r.params.prova}`, link: this.spliJoinUrl(r.path, 5 )},

            ]
          break;
          case 'teacher-diario':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2 )},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},
              {label: `Diário`, link: this.spliJoinUrl(r.path, 5 )},

            ]
          break;
          case 'teacher-faltas':
            this.breads = [
              {label: 'Sala de Aula', link: this.spliJoinUrl(r.path, 2 )},
              {label: utils.getCourseFromNumber(this.disciplinas, r.params.course), link: this.spliJoinUrl(r.path, 3 )},
              {label: utils.getTurmaFromNumber(this.disciplinas, r.params.course, r.params.turma), link: this.spliJoinUrl(r.path, 4 )},
              {label: `Faltas`, link: this.spliJoinUrl(r.path, 5 )},

            ]
          break;
          default:
            this.breads =[]
        }
        
      },
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" }
         ];
      },
      handleSelect(item) {
        
      },
      handleIconClick(ev) {
        
      }
    },
    mounted() {
      this.links = this.loadAll();
      this.loadRoute(this.$route)
    }
  };
</script>

<style>
  .image{
    width: 250px;
    margin-top:12px;
  }
  .el-menu-prof li.el-menu-item.is-active{
    border-bottom: 0px!important;
    font-weight: bold; 
    padding: 0px 20px;
    background: #f6f6f6!important;

  }
   .el-menu-prof li.el-menu-item{
    border-bottom: 0px!important;
    padding: 0px 20px;

  }
  .el-menu-prof li.el-menu-item:first-child{
    margin-right: 20px;

  }
  .button-left-menu{
    position:fixed;
    left: 0px;
    top: 50px;
    z-index:1400;
  }
  .menu-prof2 {
    background:#FFF;
    border-bottom: solid 2px #e6e6e6;
  }
  .menu-prof li {
      line-height: normal;
      padding: 7px;
  }
  .menu-prof .value {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .menu-prof .link {
    font-size: 12px;
    color: #b4b4b4;
  }
</style>
