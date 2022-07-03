<template>
  <div>
    <div>
      <el-input v-model="jobLevel.name" placeholder="添加职称等级" prefix-icon="el-icon-plus" style="width: 300px"
                size="small"></el-input>
      <el-select size="small" style="margin-left: 8px" v-model="jobLevel.titleLevel" placeholder="请选择">
        <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button size="small" style="margin-left: 8px" type="primary" icon="el-icon-plus" @click="addJobLevel">添加
      </el-button>
      <el-table
          :data="jobLevelTable"
          stripe
          border
          size="small"
          style="width: 70%; margin-top: 10px">
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称等级"
            width="150">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="enabled"
            label="是否启用"
            width="150">
          <template v-slot="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-if="!scope.row.enabled" type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200">
          <template v-slot="scope">
            <el-button size="small" type="success" @click="editHandler(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%">
      <table>
        <tr>
          <td>
            <el-tag>职位名称</el-tag>
          </td>
          <td>
            <el-input style="margin-left: 8px" v-model="updateJobLevel.name" size="small"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag>职位等级</el-tag>
          </td>
          <td>
            <el-select size="small" style="margin-left: 8px" v-model="updateJobLevel.titleLevel" placeholder="请选择">
              <el-option
                  v-for="item in titleLevels"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag>是否启用</el-tag>
          </td>
          <td>
            <el-switch
                style="margin-left: 8px"
                v-model="updateJobLevel.enabled"
                active-color="#13ce66"
                active-text="启用"
                inactive-color="#ff4949"
                inactive-text="未启用">
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JobLevelMana",
  data() {
    return {
      jobLevel: {
        name: '',
        titleLevel: ''
      },
      updateJobLevel: {
        name: '',
        titleLevel: '',
        enabled: false
      },
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
        '员级',
      ],
      jobLevelTable: [],
      dialogVisible: false
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    doUpdate() {
      this.putRequest('/system/basic/joblevel/', this.updateJobLevel).then(response => {
        if (response) {
          this.getAllData();
          this.dialogVisible = false;
        }
      })
    },
    editHandler(data) {
      this.dialogVisible = true;
      Object.assign(this.updateJobLevel, data);
      this.updateJobLevel.createDate = '';
    },
    deleteHandler(data) {
      this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/joblevel/' + data.id).then(response => {
          if (response) {
            this.getAllData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addJobLevel() {
      if (this.jobLevel.name && this.jobLevel.titleLevel) {
        this.postRequest('/system/basic/joblevel/', this.jobLevel).then(response => {
          if (response) {
            this.getAllData();
          }
        })
      } else {
        this.$message.error('字段不能为空错误');
      }
    },
    getAllData() {
      this.getRequest('/system/basic/joblevel/').then(response => {
        if (response) {
          this.jobLevelTable = response;
          this.jobLevel.name = '';
          this.jobLevel.titleLevel = '';
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
