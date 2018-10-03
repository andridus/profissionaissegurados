<template>
    <div class="page">
        <h1 class="is-size-3"><small class="has-text-weight-bold">Domínios</small> </h1>
        <br />
        <el-button-group>
				  <el-button type="primary" icon="el-icon-plus" @click='openNovoDominio' > Criar Domínio</el-button>
				</el-button-group>
			<hr />
			<el-table
		    :data="dominios"
		    stripe
		    style="width: 100%">
		    <el-table-column
		      prop="id"
		      label="#"
		      width="65">
		      <template slot-scope="scope">
		        <small>{{scope.row.id}}</small>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="title"
		      label="Título">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px"><b>{{scope.row.title }}</b></span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="Nome">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{scope.row.name}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="E-mail">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{scope.row.email }}</span>
		      </template>
		    </el-table-column>
		    
		    <el-table-column
		      prop="subscribers"
		      label="Assinantes"
		      width="150"
		      >
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{scope.row.subscribers }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="inserted_at"
		      label="Criado em"
		      width="150"
		      >
		      <template slot-scope="scope">
		      	<i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ formatAtualizacao(scope.row.criado_em) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="updated_at"
		      label="Atualizado em"
		      width="150"
		      >
		      <template slot-scope="scope">
		      	<i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ formatAtualizacao(scope.row.atualizado_em) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label=""
		      width="150">
		      <template slot-scope="scope">
		        <el-button-group>
		        	<el-button type="primary" size="small" @click='openDominio(scope.row)'><i class="fas fa-sign-in-alt" ></i></el-button>
		          <el-button type="default" size="small" ><i class="fas fa-chart-bar" ></i></el-button>
		          <el-button type="danger" size="small" ><i class="fas fa-lock"></i></el-button>
		        </el-button-group>
		      </template>
		    </el-table-column>
		  </el-table>
    </div>
</template>


<script>
import moment from 'moment'
import utils from '@/utils'
import { mapState } from 'vuex'
import Store from '@/store'

export default {
		watch: {
	    '$route.params': function (params) {
	      this.load(params);
	    }
	  },
	  computed:{
		  ...mapState({
	      disciplinas: state => state.session.disciplinas
	      
	    }),
		},
	  data(){
	  	return {
	  		activeIndex2: '1',
        dominios: [
        	{id: 1, data: '00000', title: 'Condomínio Contábil', name: 'Fulano de Tal', email: 'fulanodetal@gmail.com', subscribers: 15, inserted_at: '000', updated_at: '000'}
        ]
      }
	  },
		methods:{
			openDominio(row){
				this.$router.push(`/dominio/${row.id}`)
			},
			openNovoDominio(row){
				this.$router.push(`/admin/dominio/novo`)
			},
			formatConteudo(conteudos){
				
				const maped = conteudos.map(c=>c.descricao);
				const joined = maped.join(",")
				if(joined == "")
					return "SEM DESCRIÇÃO"
				else
					return joined	
				
			},
			formatAtualizacao(atualizacao){
				return moment(atualizacao).fromNow();
			},
			formatData(data){
				if(data)
					return moment(data).format('DD | MMM')
				else
					return " - "
			},
			parseProva(p){
				const media1 = p.notas.reduce((acc,n)=>{
					const nota = parseFloat(n.nota);
					if(!isNaN(nota)){
						return nota + acc;
					}else{
						return acc;
					}
				},0)
				const numNotas = p.notas.length;
				let media = '-'
				if(numNotas>0){
					media = (media1/numNotas).toFixed(2)
				}
				return {...p, media: media}
			},
			load(params){
				this.course = params.course;
				this.turma = params.turma;
				Store.dispatch('teacher/getAulas', {
        	course: this.course, 
        	turma: this.turma
      	}).then(r=>{
      		this.aulas = r
      	},()=>{} );
      	Store.dispatch('teacher/getProvas', {
        	course: this.course, 
					turma: this.turma
				}).then(r=>{
					this.provas = r.map(this.parseProva);
				},()=>{} );
			},
			handleSelect(key, keyPath) {
				if(keyPath[0] == 'turma'){
					this.turmaLabel = key;
				}else{
					this.turma = key;
				}
				
      }
		},
    mounted(){
			const params = this.$router.currentRoute.params;
			//this.load(params);
    }
};
</script>

<style scoped>

</style>
