<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Index from "./views/index.vue";
import Page404 from "./views/404.vue";
import jwt_decode from 'jwt-decode';
@Component({
  components: {
    Index,
    Page404,
  },
})
export default class App extends Vue {
  created(){
    const decode = jwt_decode(localStorage.eltoken);
    (this as any).$store.dispatch("setAuth", !(!decode));
    (this as any).$store.dispatch("setUser", decode);
  }
}
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  margin: 0;
  background: url("assets/index.png") no-repeat;
  background-size: cover;
  text-align: center;
}
</style>
