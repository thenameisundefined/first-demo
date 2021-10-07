<template>
  <div class="nav-class">
    <header class="header-class">
      <Row>
        <Col span="8" class="left-container">
          <Icon type="logo-android" class="icon-class" />
          <span class="font-class">在线管理系统</span>
        </Col>
        <Col offset="8" span="8" class="right-container">
          <div class="user-class">
            <img :src="user.icon" class="art-class" />
            <p class="welcome">欢迎{{ user.name }}</p>
            <Dropdown class="drop-class">
              <a href="javascript:void(0)">
                <Icon type="md-arrow-dropdown" class="down-class" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="getUser">用户信息</DropdownItem>
                <DropdownItem @click.native="quit">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </header>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Nav extends Vue {
  user:{};
  created(){
      this.user = (this as any).$store.getters.user;
  }
  getUser(){
      console.log(this.user);
  }
  quit() {
    localStorage.removeItem('eltoken');
    (this as any).$store.dispatch('clear');
    (this as any).$router.push('/login');
  }
}
</script>
<style lang="less">
.nav-class {
  .header-class {
    height: 60px;
    background: #515a6e;
  }
  .left-container {
    color: #ffffff;
    text-align: left;
    line-height: 60px;
    padding-left: 50px;
    .icon-class {
      color: #22fff2;
      margin-right: 20px;
      font-size: 26px;
      margin-top: -12px;
    }
    .font-class {
      font-size: 26px;
    }
  }
  .right-container {
    .user-class {
      color: #ffffff;
      text-align: right;
      padding-top: 10px;
      padding-right: 40px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: end;
      .art-class {
        width: 30px;
        height: 30px;
        border-radius: 100%;
      }
      .welcome {
        margin-top: 8px;
        margin-left: 10px;
      }
      .drop-class {
        margin: 8px 10px;
        .down-class {
          color: #ffffff;
          font-size: 16px;
        }
        .ivu-dropdown-menu{
          text-align: center; 
        }
      }
    }
  }
}
</style>