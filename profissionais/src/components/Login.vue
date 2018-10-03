<template>
  <div >
    <div class="box-login" style="margin-top:150px;">
      <h1 class="is-size-5" style="text-align">
        <img src="/img/profissionais_segurados_2.svg" style="margin:auto; "/>
      </h1>
      <form label-width="120px" @keyup.enter='submit'>
        <el-row class="row-login">
          <el-col :span="24">
           <el-input prefix-icon="fas fa-user" placeholder="Usuário" v-model="username"></el-input>
          </el-col>
        </el-row>
        <el-row class="row-login">
          <el-col :span="24">
           <el-input type="password" prefix-icon="fas fa-user" placeholder="Usuário" v-model="password"></el-input>
          </el-col>
        </el-row>
        <el-row class="row-login">
          <el-col :span="24">
            <el-button type="info" @click='submit'>Entrar</el-button>
          </el-col>
        </el-row>
      </form>

    </div>
  </div>
</template>

<script>
import Store from '@/store'
export default {
  data() {
      return {
          username: '',
          password: '',
        
      }
  },
  methods:{
    handleClick() {
        console.log('click');
    },
    submit(e){
      e.preventDefault()
      if(this.username.length > 4 && this.password.length > 2)
      {
        Store.dispatch('session/login', {
          username: this.username, 
          password: this.password
        });
      }else{
        this.$alert('Dados de acesso inválidos. O nome de usuário deve ter mais de 4 caracteres',{
          callback: action => {
        }})
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .box-login{
  padding:25px;
  background: #FFF;
  width: 400px;
  margin:auto;
  min-height:100px;

 }
 .row-login{
  margin:20px;
 }
</style>
