
<template>
  <List class="list-class">
    <ListItem >
      <ListItemMeta
        :avatar="avatar"
        :title="user.name"
      />
    </ListItem>
    <ListItem class = "list-font-class">
      <ListItemMeta
        :title="user.identifier"
      />
    </ListItem>
    <ListItem class = "list-font-class">
      <ListItemMeta
        :title="user.email"
      />
    </ListItem>
  </List>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page404 extends Vue {
    avatar = '';
    user = {};
    userInfo ='';
    created(){
        this.user = (this as any).$store.getters.user;
        this.avatar = (this.user as any).icon;
        if(!/姓名：/.exec((this.user as any).name)){
        (this.user as any).name = `姓名：${(this.user as any).name}`;
        (this.user as any).email = `邮箱：${(this.user as any).email}`;
        (this.user as any).identifier = `角色: ${(this.user as any).identifier}`;
      }
    }
}
</script>
<style lang="less">
.list-class{
    margin:10px 14px;
}
.list-font-class{
    margin-left: 48px;
}
</style>