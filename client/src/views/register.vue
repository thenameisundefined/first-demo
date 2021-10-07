<template>
  <div class="register-class-centainer">
    <Row type="flex" justify="end">
      <Col span="10">
        <Card class="card-class">
          <div class="header-label">注册界面</div>
          <Form
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            :label-width="140"
          >
            <FormItem prop="name" label="用户名：">
              <Input
                type="text"
                v-model="formInline.name"
                placeholder="Username"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password" label="密码：">
              <Input
                type="password"
                v-model="formInline.password"
                placeholder="Password"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="passwordCheck" label="再次输入密码：">
              <Input
                type="password"
                placeholder="Password"
                v-model="formInline.passwordCheck"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="email" label="邮箱：">
              <Input
                type="text"
                v-model="formInline.email"
                placeholder="请输入邮箱地址"
              >
              </Input>
            </FormItem>
            <FormItem prop="identifier" label="请选择角色:">
              <Select v-model="formInline.identifier">
                <Option
                  v-for="item in roleList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem>
              <Button
                class="form-button"
                type="primary"
                @click="handleSubmit()"
              >
                Signin
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Register extends Vue {
  validatemail = (rule, value, callback) => {
    if (value.search(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g)) {
    callback('邮箱格式不正确');
    } else {
      callback('');
    }
  };
  validatePass = (rule,value,callback) => {
      if(value !== this.formInline.password) {
          callback('两次密码不匹配')
      } else {
          callback();
      }
  };
  formInline = {
    name: "",
    password: "",
    email: "",
    passwordCheck:"",
    identifier:""
  };
  ruleInline = {
    name: [
      {
        required: true,
        message: "Please fill in the user name",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "Please fill in the password.",
        trigger: "blur",
      },
      {
        type: "string",
        min: 6,
        message: "The password length cannot be less than 6 bits",
        trigger: "blur",
      },
    ],
    passwordCheck: [
      {
        trigger: "blur",
        validator: this.validatePass,
      },
    ],
    email: [
      {
        trigger: "blur",
        validator: this.validatemail,
      },
    ],
  };
  roleList = [
    {
      label: "管理员",
      value: "admin",
    },
    {
      label: "用户",
      value: "user",
    },
  ]; 
  public handleSubmit() {
    (this.$refs.formInline as any).validate((valid) => {
        (this as any).$axios.post('api/user/register',this.formInline).
        then(res => {
        (this.$refs.formInline as any).$Message.success("注册成功");
        (this as any).$router.push('/');
        }).catch(err => {
           (this.$refs.formInline as any).$Message.error("注册失败");
        })
    //   if (valid) {
    //     (this.$refs.formInline as any).$Message.success("succeed");
    //   } else {
    //     (this.$refs.formInline as any).$Message.error("false");
    //   }
    });
  }
}
</script>
<style lang="less">
.register-class-centainer {
  .header-label {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .card-class {
    margin-right: 200px;
    margin-top: 80px;
    .form-button {
      width: 195px;
    }
  }
}
</style>