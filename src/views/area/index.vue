<template>
  <div class="app-container">
    <section>
      <!--工具条-->
      <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getAreas">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>-->

      <div class="element_box">
        <div class="area_form_box">
          <div class="area_input">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
              <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
              </el-select>-->
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="area_addBtn">新增用户</div>
        </div>

        <!--列表-->
        <div class="element_table">
          <el-table
            v-loading="listLoading"
            :data="areas"
            default-expand-all="true"
            row-key="id"
            highlight-current-row
            class="el_table zlp"
          >
            <el-table-column prop="name" label="名称" style="width: 20%" />
            <el-table-column prop="areaCode" label="区域编码" style="width: 20%" />
            <el-table-column prop="fullName" label="区域全名" style="width: 20%" />
            <el-table-column prop="type" label="区域类型" style="width: 20%" />
            <el-table-column label="操作" style="width: 20%">
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--编辑界面-->
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
          <el-form-item label="上级区域" prop="pid">
            <el-select v-model="editForm.pid" placeholder="请选择">
              <el-option
                v-for="item in parentAreas"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item style label="区域编码" auto-complete="off">
            <el-input v-model="editForm.areaCode" auto-complete="off" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="全名" prop="fullName">
            <el-input v-model="editForm.fullName" :min="0" :max="200" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="editForm.type" placeholder="请选择">
              <el-option
                v-for="item in areaTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogFormVisible=false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="updateData">添加</el-button>
          <el-button v-else type="primary" @click="updateData">修改</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { tree, list, del, save, get } from "../../api/area";

import { getDictByType } from "../../api/dict";

export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      listLoading: false,
      areas: [],
      parentAreas: [],
      areaTypes: [],
      editFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        fullName: [{ required: true, message: "请输入全称", trigger: "blur" }]
      },
      // 编辑界面数据
      editForm: {
        id: "0",
        pid: "",
        areaCode: "",
        name: "",
        fullName: "",
        parentName: "",
        type: ""
      }
    };
  },
  mounted() {
    this.getAreas();
    this.getParentAreas();
    this.getAreaType();
  },
  methods: {
    // 获取区域列表
    getAreas() {
      const para = {
        data: { name: this.filters.name }
      };
      this.listLoading = true;
      tree(para).then(res => {
        this.areas = res.data;
        this.listLoading = false;
      });
    },
    // 获取区域列表
    getParentAreas() {
      const para = {
        data: {}
      };
      this.listLoading = true;
      list(para).then(res => {
        this.parentAreas = res.data;
        this.listLoading = false;
      });
    },
    // 获取区域列表
    getAreaType() {
      this.listLoading = true;
      getDictByType("sys_area_type").then(res => {
        this.areaTypes = res.data;
        this.listLoading = false;
      });
    },
    // 获取区域详情
    getAreaDetail(id) {
      const para = {
        data: { id }
      };
      get(para).then(res => {
        this.editForm = Object.assign({}, res.data);
      });
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          const para = { data: { id: row.id } };
          del(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAreas();
          });
        })
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.getAreaDetail(row.id);
      this.dialogFormVisible = true;
    },
    // 显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      this.getAreaDetail();
      this.dialogFormVisible = true;
    },
    // 编辑
    updateData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          const para = { data: this.editForm };
          save(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["editForm"].resetFields();
            this.dialogFormVisible = false;
            this.getAreas();
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.area_input {
  width: 260px;
  height: 40px;
}
.el-table__header-wrapper table {
  background: red !important;
}
.area_form_box {
  display: flex;
  justify-content: space-between;
}
.area_form_box {
  width: 100%;
  height: 60px;
  /* padding: 20px 0 20px 0; */
  /* box-sizing: border-box; */
  border-bottom: 1px #d3dbe7 solid;
}
.area_addBtn {
  width: 100px;
  height: 40px;
  background: rgba(77, 115, 244, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  text-align: center;
}
.app-main {
  background: navy;
}
.element_box {
  width: 100%;
  background: #ffffff;
}
.el-input__inner {
  border: none;
  background: red;
}
.element_box {
  width: 100%;
  /* padding: 25px; */
  padding: 20px 56px 78px 42px;
  box-sizing: border-box;
}
.element_table {
  width: 100%;
  margin-top: 32px;
  border:1px solid rgba(241,244,250,1);
}
.element_table table{
  padding: 0 63px 0 159px;
}
.el-table__body-wrapper  table {
  padding: 0 63px 0 159px; 
}
.el_table table {
  padding: 10px;
}
</style>
