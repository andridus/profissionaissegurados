<template>
  <div class="page">
    <Menu></Menu>
    <h1 class="title is-4  ">
      <small class="has-text-weight-bold">Aplicativo</small>
    </h1>
    <div class="subtitle is-6">
      Informações necessárias para gerar/atualizar o aplicativo.
    </div>
    <div class="columns">
      <div class="column">
        <el-form ref="form" :model="form" label-width="200px" style="text-align:left">
          <el-form-item label="Nome do Aplicativo">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <div class="has-text-centered"><b>Imagens necessárias</b></div>
          <br />
          <div class="has-text-centered">
            <el-button type="default" size="large" >
              <i class="fa fa-image fa-2x"></i><br /><br />
              Ícone
            </el-button>
            <el-button type="default" size="large" >
              <i class="fa fa-image fa-2x"></i><br /><br />
              Banner
            </el-button>
            <el-button type="default" size="large" >
              <i class="fa fa-image fa-2x"></i><br /><br />  
              Marca
            </el-button>
          </div>
          <br />
          <el-form-item label="Cor do Tema">
            <material-picker v-model="colors"></material-picker>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="column">
        <div class="device-wrapper" style="margin:auto">
          <div class="device" data-device="galaxyS5" data-orientation="portrait" data-color="black">
            <div class="screen">
              <div class="exemplo-app" style="background-color: #FFF; height:100%">
                Aqui fica o aplicativo em  exemplo das configurações
              </div>
            </div>
            <div class="button">
              <!-- You can hook the "home button" to some JavaScript events or just remove it -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'html5-device-mockups';
  import Menu from './_menu';
  import uuid from 'uuid/v4';
  import {Money} from 'v-money';
  import { VueEditor } from 'vue2-editor'
  import * as R from 'ramda';
  import { Chrome } from 'vue-color'
  export default {
    components: {
      Menu,
      Money,
      VueEditor,
      'material-picker': Chrome,
    },
    data() {
      return {
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
        colors: '#000000',
      }
    },
    methods: {
      addPlan() {
        const num = this.plans.length;
        this.plans.push(
          { id: num, 
            uuid: uuid(), 
            title: 'Sem título',
            description: '',
            price: 0.00,
            recorrente: true,
            garantia: 0,
            _viewOption: null
          }
        )
      },
      removePlan(c) {
        const idx = R.findIndex(R.propEq('uuid', c.uuid))(this.plans);
        if(idx >= 0)
          this.plans.splice(idx, 1);
      },
      onSubmit() {
        console.log('submit!');
      },
      toggleDetails(c) {
        if(c._viewOption){
          c._viewOption = '';
        }else{
          c._viewOption = 'details';
        }
      }
    }
  };
</script>

<style scope>

</style>