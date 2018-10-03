<template>
  <div  class="embed-conteudo has-text-centered" v-if='data' style="margin-top:30px;">
    <div class="title is-6 has-text-weight-bold"> Recursos</div>
    <div class="subtitle is-6">
      Recursos são arquivos que você disponibiliza para seus estudantes <br /><i>(Materiais necessários ou extras para a aula)</i>.
    </div>
    <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">Click to upload</el-button>
    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
  </el-upload>
    <hr />
    <div class="title is-6 has-text-weight-bold" style="margin-bottom:0px;"> Adicionar Recurso</div>
     <el-tabs >
      <el-tab-pane label="Enviar arquivo">
        formulário de input
      </el-tab-pane>
      <el-tab-pane label="Adicionar da Bilioteca">
        importar biblioteca
      </el-tab-pane>
      <el-tab-pane label="Link externo">
       formulário de input
      </el-tab-pane>
    </el-tabs>
  </div>  
</template>

<script>
  export default {
    props: ['data'],
    data() {
        return {
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      },
     methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  };
</script>

<style scoped>
  .embed-conteudo{

  } 

</style>