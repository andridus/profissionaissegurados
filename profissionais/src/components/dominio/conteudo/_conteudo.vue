<template>
  <div  class="embed-conteudo has-text-centered" v-if='data' style="margin-top:30px;">
    <div class="title is-6 has-text-weight-bold"> Conteúdo</div>
    <div class="subtitle is-6">
      Selecione o tipo principal do conteúdo. Arquivos e links podem ser adicionados como recursos. Conheça os tipos de conteúdo.
    </div>
    <div class="has-text-centered">
      <el-button type="default" size="large" >
        <i class="fa fa-play fa-2x"></i><br /><br />
        Vídeo
      </el-button>
      <el-button type="default" size="large" >
        <i class="fa fa-file-pdf fa-2x"></i><br /><br />
        PDF
      </el-button>
      <el-button type="default" size="large" >
        <i class="fa fa-file fa-2x"></i><br /><br />  
        Artigos
      </el-button>
    </div>
  </div>  
</template>

<script>
  export default {
    props: ['data']
  };
</script>

<style scoped>
  .embed-conteudo{

  } 

</style>