<template>
  <div class="page">
    <Menu></Menu>
    <h1 class="title is-4  ">
      <small class="has-text-weight-bold">Clientes</small>
    </h1>
    <div class="subtitle is-6">
      Lista de usuários cadastrados que procuram os serviços dos assinantes (profissionais).
    </div>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="#"
      width="30">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address">
    </el-table-column>
    <el-table-column
      prop="date"
      label="Date"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label=""
      width="70">
      <template slot-scope="scope">
        <el-tag>Pago</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label=""
      width="60">
      <template slot-scope="scope">
        <el-button-group>
          <el-button type="primary" size="small" @click='addPlan'>
            <i class="fas fa-lock" ></i>
          </el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
    <hr />
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
        tableData: [{
          id: 1,
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          id: 2,
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          id: 3,
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          id: 4,
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }]
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