<template>
  <div class="profile-class">
    <div class="header-class">
      <div class="left-class">
        <span>时间筛选：</span>
        <Input class="input-class" /> -- <Input class="input-class" />
        <Button class="btn-class"> 筛选</Button>
      </div>
      <div class="right-class">
        <Button @click="add">添加</Button>
      </div>
    </div>
    <InfoModal :showInfoModal.sync="showInfoModal"></InfoModal>
    <EditModal :showEditModal.sync="showEditModal"  :EditInfo = "EditInfo"></EditModal>
    <Table
      border
      :columns="profileColumns"
      :data="profleData"
      class="table-class"
    >
      <template slot="name"> </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="edit(row)"
          >编辑</Button
        >
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import InfoModal from "../components/addInfo.vue";
import EditModal from "../components/editInfo.vue";
@Component({
  components: {
    InfoModal,
    EditModal,
  },
})
export default class Profile extends Vue {
  profileColumns = [
    {
      title: "创建时间",
      align: "center",
      key: "Data",
    },
    {
      title: "收支类型",
      align: "center",
      key: "type",
    },
    {
      title: "收支描述",
      align: "center",
      key: "describe",
    },
    {
      title: "收入",
      align: "center",
      key: "income",
    },
    {
      title: "支出",
      align: "center",
      key: "expend",
    },
    {
      title: "现金",
      align: "center",
      key: "cash",
    },
    {
      title: "备注",
      align: "center",
      key: "remark",
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      slot: "action",
    },
  ];
  profleData = [];
  showInfoModal = false;
  showEditModal = false;
  EditInfo = '';
  public getList() {
    (this as any).$axios.get("api/profile/get").then((res) => {
      const Data = res.data;
      Data.forEach((item) => {
        this.profleData.push(item);
      });
    });
  }
  public edit(val) {
      this.showEditModal = true;
      this.EditInfo = val;
  }
  public remove(val) {
    const url = `api/profile/delete/${val._id}`;
    (this as any).$axios.delete(url).then((res) => {
      if (res) {
        (this as any).$Message.success("删除成功");
        this.getList();
      } else {
        (this as any).$Message.error("删除失败");
      }
    });
  }
  public add() {
    this.showInfoModal = true;
  }
  created() {
    this.getList();
  }
}
</script>
<style lang="less">
.profile-class {
  .header-class {
    display: flex;
    justify-content: space-between;
    .left-class {
      margin: 12px 20px;
      .btn-class {
        margin-left: 20px;
        background: #0c8f12;
      }
    }
    .input-class {
      width: 80px;
    }
    .right-class {
      margin: 20px 20px;
    }
  }
  .table-class {
    margin-left: 20px;
  }
}
</style>