<template>
  <div class="login-class-centainer">
    <Row type="flex" justify="end" >
    <Col  span="8">
    <Card class="card-class">
      <div class="header-label">
        登陆界面
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <FormItem prop="email" label="邮箱：">
          <Input type="text" v-model="formInline.email" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem  prop="password" label="密码：">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="Password"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div class="btn">
      <Button class="form-button" type="primary" @click="handleSubmit()">
      Signin
      </Button>
      </div>
      <div class="toRegister">
      <router-link to="/register">还没有账号?点击注册</router-link>
      </div>
    </Card>
    </Col>
    </Row>
  </div>
</template>
<script lang="ts">
 import {Vue, Component} from 'vue-property-decorator';
 import jwt_decode from 'jwt-decode';
 @Component({
     components:{}
 })
export default class Index extends Vue{
    formInline = {
        email: '',
        password: ''
    };
    ruleInline = {
      email: [
        { required: true, 
          message: 'Please fill in the user name', 
          trigger: 'blur' 
        }
      ],
      password: [
        { required: true,
         message: 'Please fill in the password.', 
         trigger: 'blur' 
         },
        { 
        type: 'string', 
        min: 6, 
        message: 'The password length cannot be less than 6 bits',
         trigger: 'blur' 
        }
      ]
    };
    public handleSubmit() {
      (this.$refs.formInline as any).validate((valid) => {
        (this as any).$axios.post('api/user/login',this.formInline).then(res=>{
        if(res){
          const {token} = res.data;
          const decode = jwt_decode(token);
          (this as any).$store.dispatch('setAuth', !(!decode));
          (this as any).$store.dispatch('setUser', decode );
          localStorage.setItem('eltoken',token);
        (this.$refs.formInline  as any).$Message.success("登陆成功");
        (this as any).$router.push('/index');
        } else {
          (this.$refs.formInline  as any).$Message.error("登陆失败");
        }
       }).catch(err=>{
        (this.$refs.formInline  as any).$Message.error("登陆失败");
        (this as any).$router.push('/register');
       })
    })
  }
}
</script>
<style lang="less">
.login-class-centainer{
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
  .toRegister{
    text-align: right;
    font-size:10px;
  }
  .btn{
    margin-bottom: 10px;
    text-align: center;
    margin-left: 80px;
  }
}
</style>