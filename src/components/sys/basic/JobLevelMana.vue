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
    </div>
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
          <el-button size="small" type="success">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
        '员级',
      ],
      jobLevelTable: []
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    deleteHandler(data){
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
