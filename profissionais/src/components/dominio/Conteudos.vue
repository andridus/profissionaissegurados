<template>
  <div class="page">
    
    <Menu></Menu>
    <h1 class="title is-4  ">
      <small class="has-text-weight-bold">Conteúdos</small>
    </h1>
    <div class="subtitle is-6">
      Criação da grade de conteúdos que o estudante (<i>assinante</i>) tera acesso. 
      <br /><i>(Os conteúdos que serão liberados para planos específicos também são configurados por aqui)</i>.
    </div>
    
    <hr />
    <div class="" v-if='sections.length == 0'>
      Nenhuma seção cadastrada. 
      <br />Crie a sua primeira clicando no botão azul abaixo. 
      <br /><br /> <i class="fa fa-arrow-down fa-2x"></i>
    </div>
    <div class="conteudo-secao" v-for='s in sections' v-else>
      <div class="section-title" >
        <b>Seção:</b> <span class="is-uppercase" style="margin-left:10px; margin-right:10px;">{{s.title}}</span>
        <el-button-group class="btns-class-title-section">
          <el-button type="default" size="small" ><i class="fas fa-pencil-alt" ></i></el-button>
          <el-button type="danger" size="small" @click='removeSection(s)'><i class="fas fa-trash"></i></el-button>
        </el-button-group>
      </div>
      <table class="table is-fullwidth">
        <thead>
        </thead>
        <tbody>
          <template v-for='(c,i) in s.contents'>
            <tr v-bind:key='`${c.uuid}-1`' class="conteudo-aula-title">
              <td>
                <div class="section-title" >
                  <b>Aula {{i+1}}:</b><span style="margin-left:10px; margin-right:10px;">{{c.title}}</span>
                  <el-button-group class="btns-class-title-section">
                    <el-button type="default" size="small" ><i class="fas fa-pencil-alt" ></i></el-button>
                    <el-button type="danger" size="small" @click='removeClass(s,c)'><i class="fas fa-trash"></i></el-button>
                  </el-button-group>
                </div>
              </td>
              <td  style="width: 110px;">
                <div class="td-view" >
                  
                  <el-switch
                    v-model="c.published"
                    title="Publicar"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="Publicado"
                    inactive-text="Rascunho"
                  >
                  </el-switch>
                </div>
              </td>
              <td  style="width: 110px;">
                <div class="td-view" >
                  
                  <span style="margin-right:10px;">5</span>
                  <i class="fas fa-eye"></i>
                </div>
              </td>
              <td  style="width: 100px;padding:10px;">
                <el-button-group>
                  <el-button :type="c._viewOption?'primary':'default'" size="default" @click='toggleDetails(c)'>
                    <i class="fa fa-bars"></i>
                  </el-button>
                </el-button-group>
                <!--<el-dropdown @command="(command) => handleCommand(command, c, s)">
                  <el-button type="default">
                    Ações<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command='details'>Detalhes</el-dropdown-item>
                    <el-dropdown-item command='stats'>Estatísticas</el-dropdown-item>
                    <el-dropdown-item divided></el-dropdown-item>  
                    <el-dropdown-item command='minimize' v-if='c._viewOption'>Minimizar</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>-->
              </td>
            </tr>
            <tr v-bind:key='`${c.uuid}-2`'>
              <td class="conteudo-aula" colspan="4" v-if='c._viewOption == "details"'>
                <el-tabs >
                  <el-tab-pane label="Descrição">
                    <conteudo-descricao :data='c.description'></conteudo-descricao>
                  </el-tab-pane>
                  <el-tab-pane label="Conteúdo">
                    <conteudo-conteudo :data='c.content'></conteudo-conteudo>
                  </el-tab-pane>
                  <el-tab-pane label="Recursos">
                    <conteudo-recursos :data='c.resources'></conteudo-recursos>
                  </el-tab-pane>
                  <el-tab-pane label="Configurações">
                    1- Informar para qual plano esse conteudo estará liberado.
                  </el-tab-pane>
                </el-tabs>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <hr />
      <el-button-group>
        <el-button type="default" size="small" @click='addClass(s)'><i class="fas fa-plus" ></i> Nova aula nesta seção</el-button>
      </el-button-group>
    </div>
    <hr />
    <el-button-group>
      <el-button type="primary" size="small" @click='addSection'><i class="fas fa-plus" ></i> Nova Seção</el-button>
    </el-button-group>
  </div>  
</template>

<script>

  import Menu from './_menu';
  import uuid from 'uuid/v4';
  import ConteudoConteudo from './conteudo/_conteudo';
  import ConteudoDescricao from './conteudo/_descricao'
  import ConteudoRecursos from './conteudo/_recurso'
  import * as R from 'ramda';


  export default {
    components: {
      Menu,
      ConteudoConteudo,
      ConteudoDescricao,
      ConteudoRecursos
    },
    data() {
      return {
        sections: [
          {id: 1, uuid: uuid(), title: 'Sobre Finanças Básica', inserted_at: '000', updated_at: '000', contents: [
            {id: 1, uuid: uuid(),title: 'O Sistema Financeiro', views: 15, inserted_at: '000', updated_at: '000', content: {}, description: {}, resources: {}, published: false, _activeTab: null, _viewOption: null}
          ]}
        ]  
      }
      
    },
    methods: {
      addClass(s) {
        const num = s.contents.length+1;
        s.contents.push({
          id: num, 
          uuid: uuid(),
          title: `Sem título de aula`, 
          views: 15, 
          inserted_at: '000', 
          updated_at: '000', 
          content: {}, 
          description: {}, 
          resources: {}, 
          ublished: false, 
          _activeTab: null, 
          _viewOption: null
        });
        console.log(s)
      },
      addSection() {
        const num = this.sections.length+1;
        this.sections.push({
          id: num, 
          uuid: uuid(),
          title: `Sem título de seção`, 
          inserted_at: '000',
          updated_at: '000', 
          contents: []
        })
      },
      toggleDetails(aula){
        if(aula._viewOption == 'details'){
          aula._viewOption = null;
        }else{
          aula._viewOption = 'details';
        }
        
      },
      removeClass(section, aula) {
        const idx = R.findIndex(R.propEq('uuid', aula.uuid))(section.contents);
        if(idx>=0){
          section.contents.splice(idx, 1);
        }
      },
      removeSection(section) {
        const idx = R.findIndex(R.propEq('uuid', section.uuid))(this.sections);
        if(idx>=0){
          this.sections.splice(idx, 1);
        }
      },
      handleCommand(c, aula, section){

        aula._viewOption = c;
        if(c=='minimize'){
          aula._viewOption = null;
          return;
        }
      }
    }

  };
</script>

<style scope>
  .td-view{
    padding: 10px 0px;
    text-align: right;
  }

  .section-title{
    padding: 10px 0px;
    text-align: left;

  }
  .section-title .btns-class-title-section{
    opacity:0;
    pointer-events: none;
    transition: 0.5s all; 
  }
  .section-title:hover{
    color:#000;
  }
  .section-title:hover .btns-class-title-section{
    opacity:1;
    pointer-events: auto; 
  }
  .conteudo-secao{
    background: #FAFAFA;
    padding:20px;
    margin: 20px 0px;
  }
  .conteudo-aula{
    background: #FFF;
    border:1px solid #EBEBEB!important;
  }
  .conteudo-aula-title{
    background:#F5F5F5;
    border:1px solid #EBEBEB;
  }

</style>