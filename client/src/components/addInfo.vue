<template>
  <div class="add-class">
    <Modal
      v-model="showInfoModal"
      title="新建支出"
      :mask-closable="false"
      class="modal-class"
    >
      <div class="div-class">
        <span>收支类型：</span><Input v-model="type" class="input-class" />
      </div>
      <div class="div-class">
        <span>收支描述：</span><Input v-model="describe" class="input-class" />
      </div>
      <div class="div-class">
        <span>收入：</span><Input v-model="income" class="input-class" />
      </div>
      <div class="div-class">
        <span>支出：</span><Input v-model="expend" class="input-class" />
      </div>
      <div class="div-class">
        <span>现金：</span><Input v-model="cash" class="input-class" />
      </div>
      <div class="div-class">
        <span>备注：</span><Input v-model="remark" class="input-class" />
      </div>
      <div slot="footer" class="footer-class">
        <Button @click="cancel">取消</Button>
        <Button @click="ok">确定</Button>
      </div>
      <div slot="close" class="close-class" @click="cancel">
        <Icon type="ios-close" />
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class AddInfo extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  showInfoModal: boolean;
  type = "";
  describe = "";
  income = "";
  expend = "";
  cash = "";
  remark = "";
  InfoObj = {
    type: "",
    describe: "",
    income: "",
    expend: "",
    cash: "",
    remark: "",
  };
  public ok() {
    this.InfoObj.type = this.type;
    this.InfoObj.describe = this.describe;
    this.InfoObj.income = this.income;
    this.InfoObj.expend = this.expend;
    this.InfoObj.cash = this.cash;
    this.InfoObj.remark = this.remark;
    (this as any).$axios.post("api/profile/add",this.InfoObj).then((res) => {
      if (res) {
        (this as any).$Message.success("创建成功");
        this.$emit("update:showInfoModal", false);
        (this.$parent as any).getList();
      } else {
        (this as any).$Message.error("创建失败");
      }
    });
  }
  public cancel() {
    this.$emit("update:showInfoModal", false);
  }
}
</script>
<style lang="less">
.add-class {
  .footer-class {
    display: flex;
    justify-content: end;
  }
}
.modal-class {
  .div-class {
    margin: 10px 20px;
    span {
      width: 80px;
      display: inline-block;
    }
  }
}
.input-class {
  width: 240px !important;
}
</style>