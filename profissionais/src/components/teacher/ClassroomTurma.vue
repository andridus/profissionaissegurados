<template>
    <div>
        <h1 class="is-size-5"><small class="is-size-6 is-uppercase has-text-weight-bold">Sala de aula</small> | <span class="is-uppercase"><small>{{parseCourse(course)}}</small> | <strong>{{parseTurma(course,turma)}}</strong></span> </h1>
        <br />
        <el-button-group>
				  <el-button type="primary" icon="el-icon-news" @click='novaAula'> Aula</el-button>
				  <el-button type="warning" icon="el-icon-tickets" @click='novaProva'> Prova</el-button>
				  <el-button type="default" icon="el-icon-date" @click='verDiario'> Diário</el-button>
				  <el-button type="default" icon="el-icon-sort" @click='verFaltas'> Faltas</el-button>
				  <el-button type="default" icon="el-icon-document"> Boletim</el-button>
				  <el-button type="default" icon="el-icon-star-on"> IDACI</el-button>
				</el-button-group>
			<hr />
			<h3 class="is-size-5">Provas</h3>
			<el-table
		    :data="provas"
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
		      prop="data"
		      label="Data"
		      width="100">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{ formatData(scope.row.data) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="media"
		      label="Media"
		      width="100">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{scope.row.media }}</span>
		      </template>
		    </el-table-column>
		    
		    <el-table-column
		      prop="atualizado_em"
		      label="Atualizado"
		      >
		      <template slot-scope="scope">
		      	<i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ formatAtualizacao(scope.row.atualizado_em) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label=""
		      width="110">
		      <template slot-scope="scope">
		        <el-button-group>
		          <el-button type="default" size="small" @click='openProva(scope.row)'><i class="fas fa-pencil-alt" ></i></el-button>
		          <el-button type="danger" size="small" ><i class="fas fa-trash"></i></el-button>
		        </el-button-group>
		      </template>
		    </el-table-column>
		  </el-table>
       <hr />
       <h3 class="is-size-5">Aulas</h3>
			<el-table
		    :data="aulas"
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
		      prop="data"
		      label="Data"
		      width="100">
		      <template slot-scope="scope">
		        <span style="margin-left: 10px">{{ formatData(scope.row.data) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="conteudos"
		      label="Conteúdos"
		      >
		      <template slot-scope="scope">
		        
		        <span style="margin-left: 10px">{{ formatConteudo(scope.row.conteudos) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="atualizado_em"
		      label="Atualizado"
		      width="150">
		      <template slot-scope="scope">
		      	<i class="el-icon-time"></i>
		        <span style="margin-left: 10px">{{ formatAtualizacao(scope.row.atualizado_em) }}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label=""
		      width="110">
		      <template slot-scope="scope">
		        <el-button-group>
		          <el-button type="default" size="small" @click='openClass(scope.row)'><i class="fas fa-pencil-alt" ></i></el-button>
		          <el-button type="danger" size="small" ><i class="fas fa-trash"></i></el-button>
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
		components:{
			

		},
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
	  		course: null,
	  		turma: null,
	  		activeIndex2: '1',
        turma: 'academico',
        turmaLabel: 'Acadêmico',
        aulas: [],
        provas: []
      }
	  },
		methods:{
			openClass(item){

				this.$router.push(`/teacher/classroom/${item.disciplina_id}/${item.turma_id}/class/${item.id}`)
			},
			openProva(item){

				this.$router.push(`/teacher/classroom/${item.disciplina_id}/${item.turma_id}/prova/${item.id}`)
			},
			verDiario(item){
				this.$router.push(`/teacher/classroom/${this.course}/${this.turma}/diario`)
			},
			verFaltas(item){
				this.$router.push(`/teacher/classroom/${this.course}/${this.turma}/faltas`)
			},
			parseCourse(course){
				return utils.getCourseFromNumber(this.disciplinas, course)
			},
			parseTurma(course, turma){
				return utils.getTurmaFromNumber(this.disciplinas, course, turma)
			},
			novaAula(){
				
				this.$router.push(`/teacher/classroom/${this.$router.currentRoute.params.course}/${this.$router.currentRoute.params.turma}/new-class`)
			},
			novaProva(){
				
				this.$router.push(`/teacher/classroom/${this.$router.currentRoute.params.course}/${this.$router.currentRoute.params.turma}/new-class`)
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
      		console.log(this.provas)
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
    	this.load(params);
    	
    }
}
</script>

<style scoped>

</style>
