<template>
  <div class="Home">
    <Layout class="layout-class">
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        class="sider-class"
      >
        <Menu active-name="1-1" theme="dark" width="auto">
          <MenuItem name="1-1" to="/info">
            <Icon type="ios-navigate"></Icon>用户信息
          </MenuItem>
          <MenuItem name="1-2" to="/profile">
            <Icon type="ios-search"></Icon>资金流水
          </MenuItem>
          <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>设置</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Content
        :style="{ margin: '20px', background: '#fff', minHeight: '260px' }"
      >
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {},
})
export default class App extends Vue {
  created() {
    (this as any).$router.push("/info");
  }
}
</script>
<style lang="less">
.Home {
  height: 100%;
  background: #ffffff;
  text-align: left;
  .layout-class {
    height: 100%;
    width: 100%;
    position: relative;
    justify-content: left;
    .sider-class {
      height: 100% !important;
    }
  }
}
</style>
