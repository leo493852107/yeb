<template>
  <div style="width: 500px">
    <el-input
        placeholder="输入关键字进行过滤"
        prefix-icon="el-icon-search"
        v-model="filterText">
    </el-input>

    <el-tree
        :data="deps"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }"
            style="display: flex;justify-content: space-between; width: 100%">
        <span>{{ data.name }}</span>
        <span>
          <el-button
              type="primary"
              size="mini"
              class="depBtn"
              @click="() => addDep(data)">
            添加
          </el-button>
          <el-button
              type="danger"
              size="mini"
              class="depBtn"
              @click="() => deleteDep(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
        title="添加部门"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>上级部门</el-tag>
            </td>
            <td>{{ parentDepName }}</td>
          </tr>
          <tr>
            <td>
              <el-tag>部门名称</el-tag>
            </td>
            <td>
              <el-input v-model="depObj.name" placeholder="请输入部门名称"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DeptMana",
  data() {
    return {
      filterText: '',
      deps: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      depObj: {
        name: '',
        parentId: -1
      },
      parentDepName: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getAllDepts();
  },
  methods: {
    addDep(data) {
      this.parentDepName = data.name;
      this.depObj.parentId = data.id;
      this.dialogVisible = true;
    },
    initDep() {
      this.depObj = {
        name: '',
        parentId: -1
      };
      this.parentDepName = '';
    },
    // 递归查询所有部门信息，deps 查询到的整个数组，dep 添加的部门
    addDep2Deps(deps, depObj) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id === depObj.parentId) {
          d.children = d.children.concat(depObj); // 把 depObj 加为 d 的子部门
          if (d.children.length > 0) {
            d.isParent = true;
          }
          return;
        } else {
          this.addDep2Deps(d.children, depObj);
        }
      }
    },
    doAddDep() {
      this.postRequest('/system/basic/department/', this.depObj).then(response => {
        if (response) {
          this.dialogVisible = false;
          // 要修复后端就可以用，现在 response.obj 是空
          this.addDep2Deps(this.deps, response.obj);
          this.initDep();
        }
      })
    },
    removeDepFromDeps(p, deps, id) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id === id) {
          deps.splice(i, 1);
          if (deps.length === 0) {
            p.isParent = false;
          }
          return;
        } else {
          this.removeDepFromDeps(d, d.children, id);
        }
      }
    },
    deleteDep(node, data) {
      if (!data.isParent) {
        this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/department/' + data.id).then(response => {
            if (response) {
              // 从节点删除
              this.removeDepFromDeps(null, this.deps, data.id);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message.error('父部门禁止删除');
      }
    },
    getAllDepts() {
      this.getRequest('/system/basic/department/').then(response => {
        if (response) {
          this.deps = response;
        }
      })
    },
    filterNode(value, data) {
      // true展示节点 false隐藏节点
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
}
</script>

<style>
.depBtn {
  padding: 2px;
}
</style>
