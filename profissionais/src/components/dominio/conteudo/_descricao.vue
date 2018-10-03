  <template>
    <div  class="embed-conteudo has-text-centered" v-if='data' style="margin-top:30px;">
      <div class="title is-6 has-text-weight-bold"> Descrição</div>
      <div class="subtitle is-6">
        Adicione uma descrição para sua aula. Inclua o que o estudantes poderão fazer quando concluírem a aula.
      </div>
      <vue-editor v-model="content" placeholder='Adicione uma descrição a sua aula.'></vue-editor>
      <hr />
    </div>  
  </template>

  <script>
    import { VueEditor } from 'vue2-editor'
    export default {
      props: ['data'],
      components: {
        VueEditor
      },
      data() {
         return {
           content: ''  
         }
       }
    };
  </script>

  <style scoped>
    .embed-conteudo{
      padding:0px 0px;

    } 

  </style>