<template>
	<div class="pagina-diario first-pagina-diario" :style='"zoom:"+zoom' v-if='dados'>
	  <div class="pagina-content">
      <div class="titulo"><div class="caixa"></div> REGISTRO DE FREQUÊNCIA - SEM PERÍODO LETIVO</div>
      <div class="cabecalho">
      	        <table class="table table-bordered table-cabecalho">
          <tr>
            <td colspan="3">Disciplina: <span>CURSO 3</span></td>
            <td>Ano/Série: <span>1</span></td>
          </tr>
          <tr>
            <td>Turma: <span> CIT 3</span> </td>
            <td>Turno: <span>Integral</span></td>
            <td>Mês: <span>{{monthFormated}}</span></td>
            <td>Ano Letivo: <span>2018</span></td>
          </tr>
        </table>
        <table class="table table-bordered table-frequencia">
        	<tr >
            <td style="position:relative"><div class="n zinho">Nº</div><div class="b zinho">_____</div> <div class="data zinho">Data</div></td>
	          <td v-for='day in daysInMoth' v-bind:key='day'>{{day}}</td>
	          
	          <td>Faltas</td>
        	</tr>
          <tr v-for='e in dados.estudantes' v-bind:key='e.id'>
          	<td>{{e.codigo}}</td>
            <td v-for='d in daysInMoth' v-bind:key='d'>
            	{{faltaFromDay(d, e)}}
            </td>
	          
	          <td>{{totalFalta(e)}}</td>
        	</tr>
       
        </table>
      </div>
      <div class="rodape">
        <div class="barra"></div> 
        <div class="efis">F/5</div>
        SEDUC - Secretaria de Educação do Estado do Ceará
      </div>
    </div>
  </div>
</template>
<script>
	import moment from 'moment'
export default {
	props: ['zoom', 'dados', 'mes', 'curso', 'turma'],
	computed:{
		daysInMoth(){
			const days = moment(this.mes, 'YYYY-MM-DD').daysInMonth();
			return Array.apply(null, { length: days }).map(Function.call, Number)
		},
		monthFormated(){
			return moment(this.mes, 'YYYY-MM-DD').format("MMMM")
		},
	},
	methods:{
		faltaFromDay(d, e){
			const day = d + 1;
			const aulas = this.dados.aulas;
			const faltas = aulas.reduce((acc, a)=>{
				const diaAula = parseInt(moment(a.data, 'YYYY-MM-DD').format('D'));
					
				if(!isNaN(diaAula)){

					if(diaAula == day){

						return a.presencas.reduce((acc1, p)=>{
							if(p.eid == e.id) {
								const falta = parseInt(p.falta);
								if(!isNaN(falta))
									return falta + acc1;
							}
							return acc1
						},acc)
						
						
					}

				}

				return acc
			},0)

			return faltas ? faltas : ''

		},
		totalFalta(e){
			const aulas = this.dados.aulas;
			const faltas = aulas.reduce((acc, a)=>{
					return a.presencas.reduce((acc1, p)=>{
						if(p.eid == e.id) {
							const falta = parseInt(p.falta);
							
							if(!isNaN(falta) && falta != 0)
								return falta + acc1;
						}
						return acc1
					},acc)
									
			},0)

			return faltas ? faltas : ''

		}
	}
}
</script>

<style>
	div.pagina-diariohide{
    display: none!important;
	}
	div.pagina-diario{
	    border:0px  solid #000; 
	    width:200mm; 
	    height:280mm; 
	    padding:2.5mm; 
	    margin:auto; 
	    background:#fff;
	    position:relative;
	    margin-bottom: 5mm;
	    
	}
	div.pagina-diario div.page{
	    height:270mm!important;
	    width: 180mm!important;
	    border:1px solid red!important;
	}
	div.pagina-content{
	    /*zoom: 88%;*/
	}
	div.titulo{
	    font-family: 'FuturaBTBold'!important;
	    font-weight: bold;
	    font-size:12pt;
	    margin-bottom: 2mm;
	    margin-top: 2mm;
	    color:#222;
	}
	div.titulo div.caixa{
	    width: 8mm;
	    height: 5.5mm;
	    background: #999;
	    float:left;
	    margin-right: 2mm;
	    margin-left: 4mm;
	}

	div.rodape{
	    font-family: 'FuturaBTBold'!important;
	    font-size:8pt;
	    color:#ccc;
	    position: absolute;
	    width: 190mm;
	    margin: auto;
	    bottom:5mm;
	    left:10mm;
	}
	div.rodape div.barra{
	    width: 180mm;
	    height: 0.5mm;
	    background: #ccc;
	    margin-right: 2mm;
	}
	div.rodape div.efis{
	    width: 12mm;
	    height: 7mm;
	    background: #fff;
	    border:1px #ccc solid;
	    color: #000;
	    font-size: 13pt;
	    position: absolute;
	    right: 10mm;
	    top:-2mm;
	    text-align: center;
	}

	div.rodape-left{
	    font-family: 'FuturaBTBold'!important;
	    font-size:8pt;
	    color:#ccc;
	    position: absolute;
	    width: 180mm;
	    margin: auto;
	    bottom:5mm;
	    left:10mm;
	    text-align: right;
	}
	div.rodape-left div.barra{
	    width: 180mm;
	    height: 0.5mm;
	    background: #ccc;
	    margin-right: 2mm;
	}
	div.rodape-left div.efis{
	    width: 12mm;
	    height: 7mm;
	    background: #fff;
	    border:1px #ccc solid;
	    color: #222;
	    font-size: 13pt;
	    position: absolute;
	    left: 0mm;
	    top:-2mm;
	    text-align: center;
	}
	table.diario-tabela{
	    margin:auto;
	    margin-bottom: 2mm;
	    width: 177mm;
	}
	table.diario-tabela-hino{
	    margin:auto;
	    margin-bottom: 2mm;
	    margin-top: 5mm;
	    width: 180mm;
	}
	table.diario-tabela-visual{
	    margin:auto;
	    margin-bottom: 2mm;
	    margin-top: 5mm;
	    width: 170mm;
	}
	table.diario-tabela-visual div.box-visual{
	    width:19mm;
	    height:25.4mm;
	    border-radius:10px;
	    margin-bottom: 2mm;
	    border: 1px solid #999; 
	}
	table.diario-tabela-visual td{
	    padding:0px!important;
	}
	table.diario-tabela td{
	    border: 1px solid #888!important;
	    color:#222;
	}
	table.diario-tabela-hino td{
	    border: 1px solid #888!important;
	    color:#222;
	    padding-left: 15mm!important;
	}
	table.diario-tabela-hino td.bandeiras{
	    border: 1px solid #888!important;
	    color:#222;
	    text-align: center;
	    padding-left: 0mm!important;
	}
	table.diario-tabela-hino td div.legenda{
	    font-family: 'FuturaBT'!important;
	    font-size: 8pt;
	    color:#666;
	    margin-bottom: 2mm;
	}
	table.diario-tabela div.tabela-titulo{
	    font-family: 'FuturaBTBold'!important;
	    margin-bottom: 3mm;
	    margin-top: -2mm;
	    font-size: 9pt

	}
	div.diario-paragrafo{
	    font-family: 'FuturaBT'!important;
	    font-size: 8pt;
	    color:#222;
	    line-height: 9pt;
	    
	}
	div.composicao{
	    font-family: 'FuturaBT'!important;
	    font-size: 9pt;
	    color:#888;
	    line-height: 10pt;
	    margin-top: 10mm
	}
	div.marcador{
	    margin-top: 2mm;
	    margin-bottom: 1mm;
	    margin-left: -15mm;
	    text-align: center;
	}
	table.diario-tabela ul{
	    font-family: 'FuturaBT'!important;
	    font-size: 10pt!important;
	    padding-left: 2mm;
	    margin-bottom: -1mm;
	    margin-top: -1mm;
	}
	table.diario-tabela ul li{
	    line-height: 12pt!important;
	}
	table.diario-tabela div.span{
	    font-family: 'FuturaBT'!important;
	    padding-left: 2mm;
	}
	table.table-cabecalho{
	    width: 170mm!important;
	    margin: auto;
	    border:0px solid #222!important;
	    margin-bottom: 2mm;
	}
	table.table-cabecalho td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:0px solid #222!important;

	}
	table.table-cabecalho td span{
	    font-size: 10pt!important;
	    font-family: 'FuturaBT'!important;
	    text-transform: uppercase!important;
	}
	table.table-frequencia{

	    width: 180mm!important;
	    margin: auto;
	    border:1px solid #222!important
	}
	table.table-frequencia td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    width: 5mm;
	    text-align: center;
	    font-size: 8pt;
	}
	table.table-frequencia td:first-child{
	    width: 8mm!important;
	}
	table.table-frequencia tr:nth-child(even) td{
	    background-color: #eee;
	}
	table.table-frequencia td:last-child{
	    width: 15mm!important;
	}
	table div.zinho{
	    position: absolute;
	    font-size: 5pt;

	}
	table div.data{
	    position: absolute;

	    top:-0.3mm;
	    right:0.5mm;
	}
	table div.n{
	    position: absolute;

	    bottom:0mm;
	    left:0.5mm;
	}
	table div.b{
	   

	    -webkit-transform: rotate(30deg);
	    -moz-transform: rotate(30deg);
	    -o-transform: rotate(30deg);
	    writing-mode: lr-tb;

	    position: absolute;
	    font-size: 9pt;
	    bottom:1mm;
	    left:0.3mm;
	    color:#222;
	}

	table.table-conteudos{

	    width: 180mm!important;
	    margin: auto;
	    border:1px solid #222!important
	}

	table.table-conteudos td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    height: 5.5mm;
	    text-align: left;
	    font-size: 9pt;
	    vertical-align: middle;
	    padding-left: 2mm!important;
	    padding-right: 2mm!important;
	}
	table.table-conteudos td.titulos{
	    font-family: 'FuturaBTBold'!important;
	    font-size: 10pt;
	    color:#222;
	    background-color: #eee;
	    padding-left: 2mm!important;
	}

	table.table-previstas{

	    width: 180mm!important;
	    margin: auto;
	    border:1px solid #222!important;
	    margin-top: 3mm;
	    
	}

	table.table-previstas td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    height: 7mm;
	    text-align: center;
	    font-size: 8pt;
	    vertical-align: middle;
	}
	table.table-previstas td.prevs{
	    height: 10mm!important;

	}
	table.table-previstas div.prevs-info{
	    font-size: 10pt;
	    color:#333;
	}
	table.table-assinaturas{

	    width: 180mm!important;
	    margin: auto;
	    margin-top: 5mm;
	    border:0.0mm solid #222!important
	}

	table.table-assinaturas td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    height: 7mm;
	    text-align: center;
	    font-size: 8.5pt;
	    vertical-align: middle;
	}

	table.table-mapa_notas{

	    width: 180mm!important;
	    margin: auto;
	    border:1px solid #222!important
	}
	table.table-mapa_notas td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    width: 5mm;
	    height: 3.8mm;
	    text-align: center;
	    font-size: 6pt;
	}
	table.table-mapa_notas td:first-child{
	    width: 8mm!important;
	}
	table.table-mapa_notas tr:nth-child(even) td{
	    background-color: #eee;
	}

	table.table-mapa_notas_final{

	    width: 140mm!important;
	    margin: auto;
	    border:1px solid #222!important
	}
	table.table-mapa_notas_final tr:nth-child(even) td{
	    background-color: #eee;
	}
	table.table-mapa_notas_final td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    width: 5mm;
	    height: 3.8mm;
	    text-align: center;
	    font-size: 6pt;
	}
	table.table-mapa_notas_final td:first-child{
	    width: 8mm!important;
	}
	table.table-mapa_notas_final td.bg-gray{
	    background-color: #eee;
	}


	table.table-relacao-alunos{

	    width: 140mm!important;
	    margin: auto;
	    border:1px solid #222!important
	}
	table.table-relacao-alunos tr:nth-child(even) td{
	    background-color: #eee;
	}
	table.table-relacao-alunos td{
	    padding:0px!important;
	    font-family: 'FuturaBT'!important;
	    border:1px solid #222!important;
	    width: 5mm;
	    height: 3.8mm;
	    text-align: left;
	    padding-left:2mm!important;
	    font-size: 8pt;
	}
	table.table-relacao-alunos td:first-child{
	    width: 5mm!important;
	}
	table.table-relacao-alunos td.bg-gray{
	    background-color: #eee;
	}
	.logo-eeep-diario{
	    margin:auto; 
	    width:113mm; 
	    margin-left:38mm; 
	    margin-top:10mm;
	}
	.conteudo_capa{
	    position: absolute;
	}
	.diario-title{
	    font-family: 'FuturaBTBold'!important;
	    color:#111;
	    font-size: 30pt!important;
	    text-align: center!important;
	    width:113mm!important; 
	    margin-left:38mm!important; 
	    margin-top: 5mm;
	}
	.estabelecimento{
	    /*position: absolute;*/
	    font-family: 'FuturaBTBold'!important;
	    text-transform: uppercase;
	    margin-top:10mm;
	    width: 140mm;
	    margin-left:25mm;
	    color:#444;
	    padding:2mm;
	    border:0.5mm solid #555;
	}
	.estabelecimento_legenda{
	    /*position: absolute;*/
	    font-family: 'FuturaBT'!important;
	    text-transform: uppercase;
	    width: 140mm;
	    margin-left:25mm;
	    color:#444;
	    padding:2mm;
	    text-align: center;
	}
	.rotulo_tabela{
	    margin-left:25mm;
	    width: 140mm;
	    margin-top:5mm;
	}
	.rotulo_tabela td{
	    text-transform: uppercase;
	    padding:2mm;
	    border:0.5mm solid #555;
	    font-family: 'FuturaBT'!important;
	}
	.rotulo_tabela td span{
	    font-family: 'FuturaBTBold'!important;
	}
	.ano_letivo{
	    /*position: absolute;*/
	    font-family: 'FuturaBTBold'!important;
	    text-transform: uppercase;
	    width: 140mm;
	    margin-left:25mm;
	    color:#444;
	    padding:2mm;
	    font-size: 15pt;
	    text-align: center;
	    margin-top: -5mm;
	}
	.ano_letivo_legenda{
	    font-family: 'FuturaBT'!important;
	    text-transform: uppercase;
	    width: 140mm;
	    margin-left:25mm;
	    margin-top: 5mm;

	    color:#444;
	    padding:2mm;
	    text-align: center;

	}

	.horario_das_aulas{
	    margin-left:25mm;
	    width: 140mm;
	    margin-top:-2mm;
	}
	.horario_das_aulas td{
	    text-align: center;
	    text-transform: uppercase;
	    border:0.5mm solid #555;
	    font-family: 'FuturaBT'!important;
	    height: 7mm;
	}
	.horario_das_aulas tr.cabeca td{
	    text-align: center;
	    text-transform: uppercase;
	    border:0.5mm solid #555;
	    font-family: 'FuturaBT'!important;
	    background-color: #efefef;
	}
	.horario_das_aulas td span{
	    font-family: 'FuturaBTBold'!important;
	}
	.horario_legenda{
	    font-family: 'FuturaBT'!important;
	    text-transform: uppercase;
	    width: 140mm;
	    margin-left:25mm;
	    color:#444;
	    padding:2mm;
	    text-align: center;

	}
</style>