<template>
  <div :class="menuClass">
    <h1 class="is-size-3 title">
      <img src="/img/icon.svg" />
    </h1>
    <div class="user-image">
      <figure class="image is-64x64">
        <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
      </figure>
      <p class="is-uppercase"> {{smallName(session.user.name)}}</p>
      <el-button-group>
          <el-button type="info" plain size="small" @click="hideMenu"><i class=" fa fa-arrow-left"></i></el-button>
          <el-button type="info" plain size="small"><i class=" fa fa-cogs"></i></el-button>
          <el-button type="info" size="small" @click='logout'><i class=" fa fa-sign-out-alt"></i></el-button>
      </el-button-group>
    </div>
    <aside class="inner-menu">
      <p class="menu-label">
      </p>
       <el-menu
      default-active="2"
      class="el-menu-vertical-profi"
      @select="handleOpen"
      active-text-color="#FFFFFF"
      @close="handleClose">
      <span v-for='item in items' v-bind:key='item.idx'>
        <el-submenu :index="item.idx" v-if='item.subitems.length > 0' >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.label}}</span>
          </template>
            <span v-for='subitem in item.subitems' v-bind:key='subitem.idx'>
                <el-menu-item :index='subitem.idx' v-if='subitem.subitems.length == 0'>
                  {{subitem.label}}
                </el-menu-item>

                <el-submenu 
                  :index='subitem.idx' 
                  v-if='subitem.subitems.length > 0'  >
                  
                  <template slot="title">
                    {{subitem.label}}
                  </template>
                  
                  <el-menu-item :index="sub2item.idx" 
                    v-for='sub2item in subitem.subitems' 
                    v-bind:key='sub2item.idx'>
                    {{sub2item.label}}
                  </el-menu-item>
              
              </el-submenu>
             
          </span>
        </el-submenu>
         <el-menu-item :index="item.idx" 
             v-bind:key='item.idx' v-if='item.subitems.length == 0'>
             <i :class="item.icon"></i>
              <span>{{item.label}}</span>
        </el-menu-item>
      </span>
    </el-menu>
    </aside>
  </div> 
</template>


<script>
import Store from '@/store'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data(){
    return {
      cursos: []
      
    }
  },
  computed:{
    ...mapState({
      menuClass: state => {
        if(state.session.hideMenu){
          return "sidemenu hide-menu"
        }else{
          return "sidemenu"
        }
      },
      session: state => state.session,
    }),
    items(){
      switch(this.session.type){
        case 1:
          return [
            {idx: 'admin/dominios', label: 'Domínios', icon: 'el-icon-menu', subitems: []},
            {idx: 'admin/config', label: 'Configurações', icon: 'el-icon-setting', subitems: []}
          ];
        default:
          return []
      }
      
    }
  },
  mounted(){
    window.onresize = this.applyInnerMenu;
    this.applyInnerMenu();
  },
  methods:{
    smallName(name){
      const splited = name.split(" ")
      return splited[0] + " " + splited[splited.length-1];
    },
    parseTipo(tipo){
      return tipo.toUpperCase();
    },
    logout(){
       Store.dispatch('session/logout', {});
    },
    hideMenu(){
      
      Store.dispatch('session/hideMenu', {});
      
    },
    reduceString(str, num){
      const s1 = str.split(" ")
      const s2 = s1.map(x =>{
        if(x.length>num){
          return x.substring(0,num-1) + ".";
        }else return x;
      })
      return s2.join(" ")
      
    },
    applyInnerMenu(){
      const innerMenu = document.querySelector('.inner-menu');
      innerMenu.style.height = (window.innerHeight - innerMenu.offsetTop) + "px"
      
    },
    handleOpen(e,f,g){
      
      this.$router.push(`/${f[f.length-1]}`)
    },
    handleClose(){

    }
  }
};
</script>

<style>
  .el-menu-vertical-profi{

  }
  .el-menu-vertical-profi li:hover{
    background: #ABABAB!important;
  }
  .el-menu-vertical-profi li.is-active, .el-menu-vertical-profi li.is-active div span, .el-menu-vertical-profi li.is-active div i{
    background: #5b8f80ff!important;
    color:#FFF!important;
  }
  
  

</style>
<style scoped>
  .sidemenu{
    width: 250px;
    background: #ffffff;
    border-right: 1px solid #ece9e9;
    position: fixed;
    top:0px;
    left:0px;
    height: 100%;
    padding-top:20px;
    transition:all 0.5s;
    z-index:1500;
  }
  .hide-menu{
    left:-250px;
  }
  .inner-menu{
    overflow-y: scroll;
    height: 100%;
    padding: 10px 0px;
    text-align: left;
  }

  
    .menu-label{
    text-align: center
  }
  .user-image{
    text-align: center;
    width: 100%;;
  }
  .image{
    margin:auto;
    margin-bottom:10px;
    margin-top:20px;
  }
  .inner-menu::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  .inner-menu::-webkit-scrollbar-track {
      background: #B5B5B5; 
  }

  /* Handle */
  .inner-menu::-webkit-scrollbar-thumb {
      background: #9FA69D ; 
  }

  /* Handle on hover */
  .inner-menu::-webkit-scrollbar-thumb:hover {
      background: #909090; 
  }

</style>
