<template>
  <div class="index-class-centainer">
    <Nav>
    </Nav>
    <Home>
    </Home>
  </div>
</template>
<script lang="ts">
 import {Vue, Component} from 'vue-property-decorator';
 import Nav from '../components/nav.vue';
 import Home from '../views/Home.vue';
 @Component({
     components:{
       Nav : Nav,
       Home : Home
     }
 })
export default class Index extends Vue{
}
</script>
<style lang="less">
.index-class-centainer{
  height: 100%;
  background: #ffffff;
  .header-label{
    margin-top:10px;
    margin-bottom: 10px;
  }
  .card-class{
    margin-right: 200px;
    margin-top:80px;
    .form-button{
      width: 195px;
    }
  }
}
</style>