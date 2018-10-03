import moment from 'moment'
export default {
 reduceString(str, num){
      const s1 = str.split(" ")
      const s2 = s1.map(x =>{
        if(x.length>num){
          return x.substring(0,num-1) + ".";
        }else return x;
      })
      return s2.join(" ")
      
    },
	getCourseFromNumber(disciplinas, n){
        const num = parseInt(n);
        if(!isNaN(num)){
          if(disciplinas){
            const disc = disciplinas.filter(d => d.id == num)
            if(disc.length == 1){
              return this.reduceString(disc[0].disciplina.toUpperCase(),6);
            }  
          }
          
        }
        return n
      },
  getTurmaFromNumber(disciplinas, nd, n){
    const num = parseInt(nd);
    if(!isNaN(num)){
      if(disciplinas){
        const disc = disciplinas.filter(d => d.id == num)
        if(disc.length == 1){
          const num1 = parseInt(n);
          const turma = disc[0].turmas.filter(t => t.tid == num1)
          if(turma.length == 1){
            const mano = parseInt(moment().format("YYYY"))
            const ano = parseInt(turma[0].ano);
            if(!isNaN(ano)){
              return this.reduceString((turma[0].turma + " " + (mano - ano + 1)).toUpperCase(),5);
            }
          }
            
        }  
      }
      
    }
    return n
  },
}