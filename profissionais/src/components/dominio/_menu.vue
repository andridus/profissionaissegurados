<template>
  <div >
      <h1 class="is-size-3">
        <el-input v-model='name' v-if='editName' style="width:300px"/>
        <small class="has-text-weight-bold" v-else >{{name}} </small>
        <el-button type="text" @click='editName=true' v-if='!editName'><i class="fa fa-pencil-alt"></i></el-button>
        <el-button type="default" @click='editName=false' v-else><i class="fa fa-check"></i></el-button>
      </h1>
        <br />
        <el-button-group>
          <el-button :type="isActive('conteudos')" @click='openLink("conteudos")'> Conteúdos</el-button>
          <el-button :type="isActive('app')" @click='openLink("principal")'> Homepage</el-button>
          <el-button :type="isActive('planos')" @click='openLink("planos")'> Planos</el-button>
          <el-button :type="isActive('assinantes')" @click='openLink("assinantes")'> Assinantes</el-button>
          <el-button :type="isActive('clientes')" @click='openLink("clientes")'> Clientes</el-button>
          <el-button :type="isActive('estatisticas')" @click='openLink("estatisticas")'> Estatísticas</el-button>
          <el-button :type="isActive('app')" @click='openLink("app")'> App</el-button>
          <el-button :type="isActive('config')" @click='openLink("config")'> Configurações</el-button>
        </el-button-group>
      <hr />
    </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Condomínio Contábil',
        editName: false,
      }
    },
    methods: {
      isActive(p){
        const splited = this.$route.path.split("/");
        const num = splited.length;
        const path = splited[num-1];
        if(p==path)
          return 'info';
        else
          return 'default'
      },
      openLink(link){
        this.$router.push(`/dominio/1/${link}`)
      },
    }
  };
</script>

<style>

</style>