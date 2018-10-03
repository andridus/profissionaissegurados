<template>
  <div class="column">
    <el-steps class="passos" :active="active" finish-status="success">
      <el-step title="Domínio" description="Nome e dados básicos"></el-step>
      <el-step title="Área" description="Selecione a área de atuação"></el-step>
      <el-step >
      </el-step>
    </el-steps>
    <div class="columns is-mobile" style="margin-top:40px">



      <div class="column is-6 is-offset-3" v-if='active == 0'>
        <h1 class="title is-4  ">
          <small class="has-text-weight-bold">Passo 1 - Criação de Domínio</small>
        </h1>
        <div class="subtitle is-6">
          Crie um novo domínio, gere aplicativo e começe a vender os planos.
        </div>
          <mu-form :model="form" class="mu-demo-form" label-width="200">
            <mu-form-item prop="nome" label="Nome Completo">
              <mu-text-field v-model="form.input"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="email" label="E-mail">
              <mu-text-field v-model="form.input"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="dominio" label="Nome do domínio">
              <mu-text-field v-model="form.input"></mu-text-field>
            </mu-form-item>
            
          </mu-form>

      </div>


      <div class="column is-three-fifths is-offset-one-fifth" v-if='active == 1'>
        <h1 class="title is-4  ">
          <small class="has-text-weight-bold">Passo 2 - Selecione a Área de Atuação</small>
        </h1>
        <div class="subtitle is-6">
          Selecionar a área de atuação do seu domínio é um passo importante.
        </div>
        <el-form ref="form" :model="form"style="text-align:center">
          <el-select v-model="value2" placeholder="Área de Atuação do seu domínio">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        </el-form>
      </div>



    </div>
    
    <el-button type="warning" style="margin-top: 12px;" @click="prev" v-if='active>0'><i class="fa fa-arrow-left"></i> Anterior </el-button>
    <el-button style="margin-top: 12px;" @click="next">Salvar e continuar <i class="fa fa-arrow-right"></i></el-button>
  </div>
  
</template>

<script>
import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);
  export default {
    data() {
      return {
        active: 0,
        options: [
          'Option 1', 'Option 2', 'Option 3', 'Option 4',
          'Option 5', 'Option 6', 'Option 7', 'Option 8',
          'Option 9', 'Option 10'
        ],
        labelPosition: 'top',
      
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        options2: [{
          value: 'contabilidade',
          label: 'Contabilidade'
        }, {
          value: 'Option2',
          label: 'Option2',
          disabled: true
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value2: ''
      };
    },

    methods: {
      next() {
        if (this.active++ > 5 ) this.active = 0;
      },
      prev() {
        if (this.active-- < 0 ) this.active = 0;
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>
<style scoped>
  .is-flex{
    display: none!important;
  }
  .passos{
    color: red;
  }
</style>