<template>
  <div class="edit-class">
    <Modal
      v-model="showEditModal"
      title="编辑支出"
      :mask-closable="false"
      class="modal-class"
    >
      <Form :model="EditForm" label-position="left" :label-width="100">
        <FormItem label="收支类型：">
          <Input v-model="EditForm.type"></Input>
        </FormItem>
        <FormItem label="收支描述：">
          <Input v-model="EditForm.describe"></Input>
        </FormItem>
        <FormItem label="收入：">
          <Input v-model="EditForm.income"></Input>
        </FormItem>
        <FormItem label="支出：">
          <Input v-model="EditForm.expend"></Input>
        </FormItem>
        <FormItem label="现金：">
          <Input v-model="EditForm.cash"></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="EditForm.remark"></Input>
        </FormItem>
      </Form>
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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
export default class EditInfo extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  showEditModal: boolean;
  @Prop({})
  EditInfo: any;
  @Watch("showEditModal", {
    deep: true,
    immediate: true,
  })
  getInfo() {
    this.EditForm = this.EditInfo;
  }
  EditForm = {
    type: "",
    describe: "",
    income: "",
    expend: "",
    cash: "",
    remark: "",
  };
  public ok() {
    const url = `api/profile/edit/${this.EditInfo._id}`;
    (this as any).$axios.post(url, this.EditForm).then((res) => {
      if (res) {
        (this as any).$Message.success("编辑成功");
        this.$emit("update:showEditModal", false);
        (this.$parent as any).getList();
      } else {
        (this as any).$Message.error("编辑失败");
      }
    });
  }
  public cancel() {
    this.$emit("update:showEditModal", false);
  }
}
</script>
<style lang="less">
</style>