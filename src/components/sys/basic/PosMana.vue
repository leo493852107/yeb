<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          v-model="pos.name"
          suffix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          placeholder="请输入职位">
      </el-input>
      <el-button icon="el-icon-plus" type="primary" size="small"
                 @click="addPosition">添加
      </el-button>
      <el-button type="danger" size="small" style="margin-left: 8px"
                 :disabled="this.multipleSelection.length===0"
                 @click="deleteBatch">批量删除
      </el-button>
    </div>
    <div>
      <el-table class="posManaMain"
                :data="positions"
                stripe
                border
                size="small"
                @selection-change="handleSelectionChange"
                style="width: 80%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input v-model="updatePos.name" class="updatePosInput" size="small"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      positions: [],
      dialogVisible: false,
      updatePos: {
        name: ''
      },
      multipleSelection: []
    }
  },
  methods: {
    deleteBatch() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id+'&';
        })
        this.deleteRequest('/system/basic/pos/' + ids).then(response => {
          if (response) {
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    doUpdate() {
      this.putRequest('/system/basic/pos/', this.updatePos).then(response => {
        if (response) {
          this.initPositions();
          this.dialogVisible = false;
        }
      })
    },
    initPositions() {
      this.getRequest('/system/basic/pos/').then(response => {
        if (response) {
          this.positions = response;
        }
      })
    },
    addPosition() {
      if (this.pos.name) {
        this.postRequest('/system/basic/pos/', this.pos).then(response => {
          if (response) {
            this.initPositions();
            this.pos.name = '';
          }
        })
      } else {
        this.$message.error("职位名称不能为空");
      }
    },
    handleEdit(index, data) {
      // 拷贝
      Object.assign(this.updatePos, data);
      this.dialogVisible = true;
      this.updatePos.createDate = ''; // 不修改创建时间
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/' + data.id).then(response => {
          if (response) {
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.initPositions();
  }
}
</script>

<style>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

.posManaMain {
  margin-top: 10px;
}

.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
</style>
