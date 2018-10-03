<template>
	<div >
		<div class="sh-class" >
			<h1 class="is-size-5  is-uppercase"> 
					<i class="el-icon-edit"></i> 
				 <span class="is-size-6 has-text-weight-bold" style="margin-right:10px">Diário</span> {{course}} - {{turma}}
				 <!-- <div class="button is-small is-success">
						<i class="fa fa-download" style="margin-right:5px"></i>  Baixar PDF
				
							fazer um hover de opcções
								[ a cada 1min,
									a cada 3min, 
									a cada 5min,
									a cada alteração,
									manualmente
								]
						
					</div>-->
			</h1>
			<hr />
			
			
			<div class="columns is-desktop">
				<div class="column">
					<div class="columns">
						<div class="column">
							<div class="field">
							  <label class="label">Mês</label>
							  <div class="control">
							    <el-date-picker
							      v-model="data"
							      type="month"
							      value-format='yyyy-MM-dd'
							      format='MMMM'
							      @change='changeData'
							      placeholder="Mês do Diário">
							    </el-date-picker>
							  </div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="column" v-if='dados'>
				  
					  	<h3 class="is-size-5">
					  		Folha de Frequência de JANEIRO
					  	</h3>
					  	<el-button-group>
							  <el-button type="default" icon="el-icon-zoom-in" @click='zoomIn'></el-button>
							  <el-button type="default" icon="el-icon-zoom-out" @click='zoomOut'></el-button>
							 
							</el-button-group>
					  	<div class="block-render" >
					  		<pagina-diario-frequencia :zoom='zoom' :dados='dados' :mes='data' :curso='course' :turma='turma'/>
					  	</div>
					  </div>
		
				</div>

		</div>
	</div>
</template>


<script >
	import utils from '@/utils'
	import Store from '@/store'
	import PaginaDiarioFrequencia from './_PaginaDiarioFrequencia.vue'

	export default {
		components:{
			PaginaDiarioFrequencia
		},
		watch: {
	    '$route.params': function (params) {
	      this.load(params);
	    }
	  },

		data(){
			return {
				zoom: 0.4,
				course: null,
				turma: null,
				course_id: null,
				turma_id: null,
				prova_id: null,
				data: null,
				dados: null
			}
		},
		methods:{
			zoomIn(){
				this.zoom = this.zoom+0.2;
			},
			zoomOut(){
				this.zoom = this.zoom-0.2;
			},
			changeData(){
				this.load()
			},
			loadParams(params){
				const disciplinas = this.$store.state.session.disciplinas
				this.course = utils.getCourseFromNumber(disciplinas, params.course);
				this.turma = utils.getTurmaFromNumber(disciplinas, params.course, params.turma);
				this.course_id = params.course;
				this.turma_id = params.turma;
			},
			load(params){
				if(params){
					this.loadParams(params);
				}
				
				Store.dispatch('teacher/getDiarioFrequencia', {
        	mes: this.data, 
        	course: this.course_id,
        	turma: this.turma_id
      	}).then(r=>{
      		this.dados = r;
      		console.log(r)
      	},()=>{} );
			},
		},
		mounted(){
			const params = this.$route.params;
			this.loadParams(params)
		}


	}
	

</script>


<style scoped>
	.block-render{
		margin-top:5px;
		max-height:400px;
		overflow-x:auto;
		zoom:2;
		min-height:10px;

	}
	.table-cabecalho{
		font-size:14px;
	}
	.table-frequencia{
		font-size:10px;
	}
	.lista-estudantes li{
		font-size:12px;
		display:inline;
		margin-right:20px;
	}
	.sh-class{
		text-align: left;
		position:relative;
	}
	.table-content{
		background: transparent !important;
	}
	.table-content td{
		padding: 0px;
		margin:0px;
		vertical-align:middle;
		border: 0px;
		padding-bottom: 3px;
		padding-left: 5px;

	}
	.table-content td .input {
		border-radius: 0px;
		border: 0px solid #000;
	}
	.table-student th{
		font-size:13px;
		text-align:center;
	}
	.input-student{
		padding: 0px;
	}
	.input-student input{
		border-radius: 0px;
		padding:21px 8px;
		border: 0px solid #000;
		text-align:center;
	}

</style>