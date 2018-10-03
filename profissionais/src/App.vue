<template>
  <div>
    <div id="loading-container"></div>
    <search  v-if='session.auth' />
    <div id="app" class="container">

      <!--<side-menu  v-if='session.auth'/>-->
     
      <transition name='slide-fade' mode='out-in'>
        <router-view>
        </router-view>
      </transition>
    </div>
    <pro-footer></pro-footer>
  </div>
</template>

<script>
import SideMenu from '@/components/Sidemenu.vue'
import Search from '@/components/Search.vue'
import ProFooter from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    SideMenu,
    Search,
    ProFooter
  },
  computed:{
    ...mapState({
      session: state => state.session,
      fullContent: state => {
        if(state.session.hideMenu || !state.session.auth){
          return "container"
        }else{
          return "container"
        }
      }
    })
  }
};
</script>

<style>
html{
  background: #fafafa!important;
}
.page{
  background: #FFF;
  padding: 25px 15px 15px;
  color: #736D6D;
}
#app {
  /*padding-left:280px;*/
  /*padding-right: 30px;*/
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: all 0.5s;
  margin-top: 20px;
}
.full-content{
  padding-left:30px!important;
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
