<template>
  <div class="page404-class">
  </div>
</template>
<script lang="ts">
 import {Vue, Component} from 'vue-property-decorator';
 @Component({
     components:{}
 })
export default class Page404 extends Vue{
}
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
}
.page404-class{
    width: 100%;
    height: 100%;
    background: url('../assets/404.png') no-repeat;
    background-size: cover;
}
</style>