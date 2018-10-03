<template>
	<div >
		<div class="sh-class" v-if='prova'>
			<h1 class="is-size-5  is-uppercase"> 
					<i class="el-icon-edit"></i> 
				 <span class="is-size-6 has-text-weight-bold" style="margin-right:10px">Prova</span>  <i>#{{prova_id}}</i> | {{course}} - {{turma}}
				  <div class="button is-small is-success">
						<i class="fa fa-save" style="margin-right:5px"></i>  a cada 3min
						<!-- 
							fazer um hover de opcções
								[ a cada 1min,
									a cada 3min, 
									a cada 5min,
									a cada alteração,
									manualmente
								]
						-->
					</div>
			</h1>
			<hr />
			
			<div class="columns is-desktop">
				<div class="column">
					<div class="columns">
						<div class="column">
							<div class="field">
							  <label class="label">Data</label>
							  <div class="control">
							    <el-date-picker
							      v-model="prova.data"
							      type="date"
							      value-format='yyyy-MM-dd'
							      format='dd | MMM | yyyy'
							      placeholder="Data da Aula">
							    </el-date-picker>
							  </div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="column">
				  <div class="columns">
				  	<div class="column">
					  	<h3 class="is-size-5">
					  		Estudantes
					  	</h3>
					  	<table class="table table-student is-bordered is-fullwidth">
					  		<thead>
					  			<tr>
					  				<th></th>
					  				<th> Estudante</th>
					  				<th> Nota</th>
					  			</tr>
					  		</thead>
					  		<tbody>
					  			<tr v-for='e in prova.estudantes' v-bind:key='e.id'>
					  				<td>
					  					{{e.codigo}}
					  				</td>
					  				<td>
					  					{{e.nome}}
					  				</td>
					  				
					  				<td style="width: 150px" class="input-student">
					  					<input class="input" type="number" placeholder=" ... " :value='getNota(e.id)' @keyup='(ev)=> setNota(ev, e)' />
					  				</td>
					  			
					  			</tr>
					  		</tbody>
					  	</table>

					  </div>
				  </div>
				 </div>
				</div>

		</div>
		<div v-else style="text-align:center; padding-top:50px;">
			
			<h1 class="is-size-6">
			...</h1>
			
		</div>
	</div>
</template>


<script >
	import utils from '@/utils'
	import Store from '@/store'


	export default {
		watch: {
	    '$route.params': function (params) {
	      this.load(params);
	    }
	  },

		data(){
			return {
				
				course: null,
				turma: null,
				course_id: null,
				turma_id: null,
				prova_id: null,
				prova: null,
			}
		},
		methods:{
			getNota(eid){
				const n = this.prova.notas.filter(x=> x.eid == eid);
				
				if(n.length>0){
					const value = parseFloat(n[0].nota);
					if(!isNaN(value))
						return parseFloat(n[0].nota)
				}
				return null
				
				
			},
			setNota(ev,e){

			},
			
			load(params){
				const disciplinas = this.$store.state.session.disciplinas
				console.log(params, disciplinas)
				this.course = utils.getCourseFromNumber(disciplinas, params.course);
				this.turma = utils.getTurmaFromNumber(disciplinas, params.course, params.turma);
				this.course_id = params.course;
				this.turma_id = params.turma;
				this.prova_id = params.prova;
				Store.dispatch('teacher/getProva', {
        	prova: this.prova_id, 
        	course: this.course_id,
        	turma: this.turma_id
      	}).then(r=>{
      		this.prova = r;
      	},()=>{} );
			},
		},
		mounted(){
			this.load(this.$route.params)
		}


	}
	

</script>


<style scoped>

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