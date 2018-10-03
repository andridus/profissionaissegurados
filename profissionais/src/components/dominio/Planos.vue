<template>
  <div class="page">
    <Menu></Menu>
    <h1 class="title is-4  ">
      <small class="has-text-weight-bold">Planos</small>
    </h1>
    <div class="subtitle is-6">
      Criação dos planos que o assinante poderá se inscrever.
    </div>
    <div v-if='plans.length == 0 ' style="padding: 20px 0px;">
      <i>Não existem planos cadastrados</i>
    </div>
    <table class="table is-fullwidth" v-else>
      <thead>
      </thead>
      <tbody>
        <template v-for='(c,i) in plans'>
          <tr v-bind:key='`${c.uuid}-1`' class="conteudo-aula-title">
            <td>
              <div class="section-title" >
                <b>Plano {{i+1}}:</b><span style="margin-left:10px; margin-right:10px;">{{c.title}}</span> <b style="color:#444; margin-right: 10px;"> R$ {{c.price.toFixed(2)}}</b>
                <el-button-group class="btns-class-title-section">
                  <el-button type="default" size="small" :type="c._viewOption?'primary':'default'" @click='toggleDetails(c)'><i class="fas fa-pencil-alt" ></i></el-button>
                  <el-button type="danger" size="small" @click='removePlan(c)'><i class="fas fa-trash"></i></el-button>
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
                  <i class="fa fa-pencil-alt"></i>
                </el-button>
              </el-button-group>
            </td>
          </tr>
          <tr v-bind:key='`${c.uuid}-2`'>
            <td class="conteudo-aula" colspan="4" v-if='c._viewOption == "details"' style="padding-top:30px;">
              
              <el-form ref="form" :model="c" label-width="180px">
                <el-form-item label="Título">
                   <el-input v-model="c.title"></el-input>
                </el-form-item>
                <el-form-item label="Valor">
                  <money  v-model="c.price" v-bind="money"></money>
                </el-form-item>
                <el-form-item label="Tipo de Cobrança">
                  <el-switch
                    style="display: block"
                    v-model="c.recorrente"
                    active-color="#2769F2"
                    inactive-color="#C22C15"
                    active-text="Recorrente"
                    inactive-text="Única">
                  </el-switch>
                </el-form-item>
                <el-form-item label="Tempo de Garantia">
                  <el-select v-model="c.garantia" placeholder="Garantia">
                    <el-option
                      v-for="item in [30,15,7,0]"
                      :key="item"
                      :label="`${item} dias`"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Descrição do Plano">
                  <vue-editor v-model="c.description" placeholder='Adicione uma descrição a sua aula.'></vue-editor>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">Salvar</el-button>
                  <el-button @click='toggleDetails(c)'>Cancelar</el-button>
                </el-form-item>
              </el-form>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <el-button-group>
      <el-button type="primary" size="small" @click='addPlan'><i class="fas fa-plus" ></i> Novo Plano</el-button>
    </el-button-group>
  </div>  
</template>

<script>
  import Menu from './_menu';
  import uuid from 'uuid/v4';
  import {Money} from 'v-money';
  import { VueEditor } from 'vue2-editor'
  import * as R from 'ramda';

  export default {
    components: {
      Menu,
      Money,
      VueEditor
    },
    data() {
      return {
        plans: [
          { id: 1, 
            uuid: uuid(), 
            title: 'Universitário',
            description: '',
            price: 0.00,
            recorrente: true,
            garantia: 0,
            _viewOption: null
          }
        ],
        price: 123.45,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false
        }
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
 .v-money{
  padding: 0px 10px;
 }

</style>