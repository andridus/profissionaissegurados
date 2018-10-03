<template>
  <div class="schola-loading-container">
    <div class="schola-loading">

      <i class="fa fa-spinner fa-spin"> </i>
      <p>Aguarde...</p>
      <p class="msg">{{msg}}</p>
    </div>
  </div> 
</template>

<script>
export default {
  props:['msg']
}
</script>

<style scoped>
  .schola-loading-container{
    position:fixed;
    background: #FFFFFF99;
    width:100%;
    height:100%;
    top: 0px;
    z-index:3000;
    transition: all 0.5s;
  }
  .schola-loading{
    position: fixed;
    width: 400px;
    padding: 40px 25px;
    font-weight: bold;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: #D5E6FFEE;
    text-align:center;
    color: #000;
    border-radius:0px;
    
    z-index: 1600;
    
    opacity: 1;
  }
  .hide{
    opacity: 0;
  }
  .msg{
    font-weight: normal
  }

</style>
