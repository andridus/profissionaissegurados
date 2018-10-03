<template>
  <div >
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
         <chart1 />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <chart2 />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <chart3 />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <chart4 />
        </el-card>
      </el-col>
    </el-row>
    <div class="is-clearfix"></div>
    <hr />
  <h4 class="is-size-6 title is-uppercase has-text-left">Últimas aulas</h4>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      label="State"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="City"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="Zip"
      width="120">
    </el-table-column>
    <el-table-column
      label=""
      width="180">
      <template slot-scope="scope">
        <el-button-group>
          <el-button type="default" size="small">Detalhes</el-button>
          <el-button type="primary" size="small" >Editar</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <hr />
  
  </div>
</template>

<script>

import Chart1 from '@/components/charts/Chart1'
import Chart2 from '@/components/charts/Chart2'
import Chart3 from '@/components/charts/Chart3'
import Chart4 from '@/components/charts/Chart4'

export default {
  name: 'Index',
  components:{
    Chart1,
    Chart2,
    Chart3,
    Chart4
  },
  props: {
    msg: String
  },
  data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }]
      }
  },
  methods:{
    handleClick() {
        console.log('click');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
