<template>
    <div>
        <h1 class="is-size-5"><small class="is-size-6 is-uppercase has-text-weight-bold">Sala de aula</small> | <span class="is-uppercase">{{parseCourse(course)}}</span> </h1>
        <br />
        <el-button-group>
				  
				</el-button-group>
       <hr />
			
    </div>
</template>


<script>
import moment from 'moment'
import { mapState } from 'vuex'
import utils from '@/utils'

export default {
		components:{
			

		},
		watch: {
	    '$route.params.course': function (course) {
	      this.load(course);
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
	  		activeIndex2: '1',
        turma: 'academico',
        turmaLabel: 'Acadêmico',
        tableData: [
				  {
				    id: 29180,
				    data: '2018-05-24',
				    qtd_aulas: 1,
				    disciplina: 'CURSO 3',
				    professor: 'Amaro Valentim Silveira do Nascimento',
				    sigla: 'CIT 3',
				    curso: 'CIT 3',
				    ano: '2018',
				    criado_em: '2018-05-21T14:59:21',
				    atualizado_em: '2018-09-03T09:39:16',
				    conteudos: [
				      {
				        descricao: 'CALORIMETRIA',
				        aula_id: 29180
				      }
				    ]
				  },
				  {
				    id: 29142,
				    data: '2018-05-17',
				    qtd_aulas: 2,
				    disciplina: 'CURSO 3',
				    professor: 'Amaro Valentim Silveira do Nascimento',
				    sigla: 'CIT 3',
				    curso: 'CIT 3',
				    ano: '2018',
				    criado_em: '2018-05-23T09:31:21',
				    atualizado_em: '2018-05-23T09:54:57',
				    conteudos: [
				      {
				        descricao: 'PROPAGAÇÃO DE CALOR',
				        aula_id: 29142
				      }
				    ]
				  },
				  {
				    id: 28819,
				    data: '2018-05-10',
				    qtd_aulas: 2,
				    disciplina: 'CURSO 3',
				    professor: 'Amaro Valentim Silveira do Nascimento',
				    sigla: 'CIT 3',
				    curso: 'CIT 3',
				    ano: '2018',
				    criado_em: '2018-05-12T15:57:35',
				    atualizado_em: '2018-05-12T16:26:30',
				    conteudos: [
				      {
				        descricao: 'Escalas termométricas',
				        aula_id: 28819
				      }
				    ]
				  }
				]
      }
	  },
		methods:{
			parseCourse(course){
				console.log(course)
				return utils.getCourseFromNumber(this.disciplinas, course)
			},
			novaAula(){
				
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
				return moment(data).format('DD | MMM')
			},
			load(course){
				this.course = course;
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
    	const course = this.$router.currentRoute.params.course;
    	this.load(course);
    	
    }
}
</script>

<style scoped>

</style>
