<template>
	<div >
		<div class="sh-class" v-if='aula'>
			<h1 class="is-size-5  is-uppercase"> 
					<i class="el-icon-edit"></i> 
				 <span class="is-size-6 has-text-weight-bold" style="margin-right:10px">Aula</span>  <i>#{{aula_id}}</i> | {{course}} - {{turma}}
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
			<div :class="'group-box '+ boxGroupActiveComputed + ' '+fullContent">
				<div class="button is-warning " style="float:right" @click='toggleGroupBox'>
					<i class="fa fa-arrow-down" v-if='!boxGroupActive'></i>
					<i class="fa fa-arrow-up" v-if='boxGroupActive'></i>
				</div>

				<div class="is-clearfix"></div>
				<el-tabs type="border-card">
				  <el-tab-pane :label="'Grupo '+ item" v-for='item in qtd_groups' v-bind:key='item'>
				  	<div class="card-container" >
				  		
				  		<small class="is-uppercase has-text-weight-bold">Grupo {{item}}</small>
					  	<ol class="lista-estudantes">
					  		<li>
					  			<div class="tag is-dark">Fulano de Tal</div>
					  		</li>
					  		<li>
					  			<div class="tag is-dark">Fulano de Tal</div>
					  		</li>
					  		<li>
					  			<div class="tag is-dark">Fulano de Tal</div>
					  		</li>
					  		<li>
					  			<div class="tag is-dark">Fulano de Tal</div>
					  		</li>
					  	</ol>
					  </div>
				  </el-tab-pane>
				  
				</el-tabs>
			</div>
			<div class="columns is-desktop">
				<div class="column">
					<div class="columns">
						<div class="column">
							<div class="field">
							  <label class="label">Data</label>
							  <div class="control">
							    <el-date-picker
							      v-model="aula.data"
							      type="date"
							      value-format='yyyy-MM-dd'
							      format='dd | MMM | yyyy'
							      placeholder="Data da Aula">
							    </el-date-picker>
							  </div>
							</div>
						</div>
						<div class="column">
							<div class="field">
							  <label class="label">Horas/Aula</label>
							  <div class="control">
							    <el-select v-model="aula.qtd_aulas" placeholder="Horas/Aula">
								    <el-option
								      v-for="item in classTimeOptions"
								      :key="item.id"
								      :label="item.label"
								      :value="item.id">
								    </el-option>
								  </el-select>
							  </div>
							</div>
						</div>
					</div>
				  <div class="columns">
				  	<div class="column">
				  		<div class="field">
							  <label class="label">Atv. Coletiva</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Atv. Coletiva"  v-model='aula.q_coletiva'/>
							  </div>
							</div>
							<div class="field">
							  <label class="label">Meta Coletiva</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Meta Coletiva"  v-model='aula.m_coletiva'/>
							  </div>
							</div>
							<div class="field">
							  <label class="label">Bonif. Coletiva</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Bonif. Coletiva"  v-model='aula.b_coletiva'/>
							  </div>
							</div>
				  	</div>
				  	<div class="column">
				  		<div class="field">
							  <label class="label">Atv. Individual</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Atv. Individual"  v-model='aula.q_individual' />
							  </div>
							</div>
							<div class="field">
							  <label class="label">Meta Individual</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Meta Individual"  v-model='aula.m_individual'/>
							  </div>
							</div>
							<div class="field">
							  <label class="label">Bonif. Individual</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Bonif. Individual" v-model='aula.b_individual'/>
							  </div>
							</div>
				  	</div>
				  	<div class="column">
				  		<div class="field">
							  <label class="label">Bonif. Gr. Base</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Bonif. Gr. Base"  v-model='aula.b_cc'/>
							  </div>
							</div>
							<div class="field">
							  <label class="label">Meta Cooperativa</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Meta Cooperativa"  v-model='aula.m_cooperativa'/>
							  </div>
							</div>
							<div class="field">
							  <label class="label">Bonif. Cooperativa</label>
							  <div class="control">
							    <input type="number" class="input" placeholder="Bonif. Cooperativa"  v-model='aula.b_cooperativa'/>
							  </div>
							</div>
				  	</div>
				  </div>
				  <div class="columns">
				  	<div class="column">
					  	<h3 class="is-size-5">
					  		Conteúdos
					  		<small><a class="button is-small" href="#"><i class="fa fa-plus" ></i></a></small>
					  	</h3>
					  	<table class="table table-content is-fullwidth">
					  		<tbody>
					  			<tr v-for='item in aula.conteudos' v-bind:key='item.id'>
					  				<td>
					  					<input class="input" type="text" placeholder=" ... " v-model='item.descricao' />
					  				</td>
					  				<td style="width: 40px">
					  					<div class="buttons has-addons">
						  					<div class="button is-small is-danger">
						  						<i class="fa fa-trash"></i>
						  					</div>
						  					
						  				</div>
					  				</td>
					  			</tr>
					  		</tbody>
					  	</table>

					  </div>
				  </div>
				  <div class="columns">
				  	<div class="column">
					  	<h3 class="is-size-5">
					  		Observações
					  	</h3>
					  	<textarea class="input" style="height:120px; width:100%; resize: none" v-model='aula.observacao'>
					  	</textarea>
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
					  				<th> Presença</th>
					  				<th> Grupo</th>
					  				<th> Individual</th>
					  				<th> Coletiva</th>
					  			</tr>
					  		</thead>
					  		<tbody>
					  			<tr v-for='e in aula.estudantes' v-bind:key='e.id'>
					  				<td>
					  					{{e.codigo}}
					  				</td>
					  				<td>
					  					{{e.nome}}
					  				</td>
					  				<td style="width: 30px">
					  					<div v-if='!e.presenca.falta' class="button is-small is-success" @click='setAbsent(e.presenca)'>
					  						<i class="fa fa-thumbs-up"></i>
					  					</div>
					  					<div v-if='e.presenca.falta' class="button is-small is-danger" @click='setPresent(e.presenca)'>
					  						<i class="fa fa-thumbs-down"></i>
					  					</div>
					  				</td>
					  				<td style="width: 30px" class="td-groups">
					  					<div v-if='e.presenca.grupo' class="button is-small is-light" :style='getColor(e.presenca.grupo)'>
					  						<b>{{e.presenca.grupo}}</b>
					  					</div>
					  					<div v-if='!e.presenca.grupo' class="button is-small is-light">
					  						@
					  					</div>
					  					<div class="group-opt">
					  						<ul>
					  							<li v-for='c in qtd_groups'>
					  								<div class="button is-small is-light" :style='getColor(c)' @click="setGroup(e.presenca, c)">
								  						<b>{{c}}</b>
								  					</div>
					  							</li>
					  							<li>
					  								<div class="button is-small is-light"  @click="unsetGroup(e.presenca)" title='Remover Grupo'>
								  						<b>@</b>
								  					</div>
					  							</li>
					  						</ul>
					  					</div>
					  				</td>
					  				<td style="width: 30px" class="input-student">
					  					<input class="input" type="number" placeholder=" ... " v-model='e.presenca.individual' />
					  				</td>
					  				<td style="width: 30px" class="input-student">
					  					<input class="input" type="number" placeholder=" ... " v-model='e.presenca.coletiva' />
					  				</td>
					  			</tr>
					  		</tbody>
					  	</table>

					  </div>
				  </div>
				 </div>
				</div>
				<div :class="'box-padding '+ boxGroupActiveComputed">
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
	import { mapState } from 'vuex'

	export default {
		watch: {
	    '$route.params': function (params) {
	      this.load(params);
	    }
	  },
	  computed:{
	  	boxGroupActiveComputed(){
	  		if(this.boxGroupActive){
	  			return 'box-show'
	  		}else{
	  			return ''
	  		}
	  	},
	  	...mapState({
      fullContent: state => {
        if(state.session.hideMenu){
          return ""
        }else{
          return "box-full-content"
        }
      }
    })
	  },
		data(){
			return {
				classTimeOptions: [
					{id: 1, label: '1 (50 min)' },
					{id: 2, label: '2 (100 min)' },
					{id: 3, label: '3 (150 min)' },
					{id: 4, label: '4 (200 min)' },
					{id: 5, label: '5 (250 min)' },
					{id: 6, label: '6 (300 min)' },
					{id: 7, label: '7 (350 min)' },
					{id: 8, label: '8 (400 min)' },
					{id: 9, label: '9 (450 min)' }
				],
				boxGroupActive: false,
				color:  [
				'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
			  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
			  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
			  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
			  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
			  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
			  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
			  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
			  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
			  ],
			  qtd_groups:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
				date: null,
				classTime: null,
				course: null,
				turma: null,
				course_id: null,
				turma_id: null,
				aula_id: null,
				aula: null,
			}
		},
		methods:{
			getColor(group){
				return 'background:'+this.color[group];
			},
			setGroup(e, g){
				e.grupo = g;
			},
			unsetGroup(e){
				e.grupo = null;
			},
			setPresent(e){
				console.log(e)
				e.falta = false;
			},
			setAbsent(e){
				console.log(e)
				e.falta = true;
			},
			toggleGroupBox(){
				this.boxGroupActive = !this.boxGroupActive;
			},
			load(params){
				const disciplinas = this.$store.state.session.disciplinas
				console.log(params, disciplinas)
				this.course = utils.getCourseFromNumber(disciplinas, params.course);
				this.turma = utils.getTurmaFromNumber(disciplinas, params.course, params.turma);
				this.course_id = params.course;
				this.turma_id = params.turma;
				this.aula_id = params.aula;
				Store.dispatch('teacher/getAula', {
        	aula: this.aula_id, 
        	course: this.course_id,
        	turma: this.turma_id
      	}).then(r=>{
      		this.aula = r;
      	},()=>{} );
			},
		},
		mounted(){
			this.load(this.$route.params)
		}


	}
	

</script>


<style scoped>
	.card-container{
		padding: 0px 0px;
		overflow-y: auto;
		height: 120px;
		
	}
	.box-padding{
		height: 120px;
		transition: 0.5s all;
	}
	
	.group-box{
		position:fixed;
		height: 200px;
		z-index:501;
		bottom:-20px;
		left:0px;
		width:100%;
		transition: 0.5s all;
	}
	.box-show{
		bottom: -5px;
		height:50px;

	}
	.box-full-content{
		padding-left:250px;
	}
	.group-box .button{
		margin:4px 0px;
	}
	.td-groups{
		position: relative;
	}
	.td-groups:hover .group-opt{
		display:inline;
	}
	.group-opt{
		width:200px;
		left:-30px;
		top: 35px;
		position:absolute;
		z-index:500;
		display:none;
		background: #FFF;
	}

	.group-opt ul{
		margin: 0px;
		padding: 0px;
	}
	.group-opt ul li{
		float:left;
		margin:1px;
		opacity: 0.5;
		

	}
	.group-opt ul li:hover{
		opacity:1;
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