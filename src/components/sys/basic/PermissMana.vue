<template>
  <div>
    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入英文名称" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" v-model="role.nameZh" placeholder="请输入中文名称" @keydown.enter.native="addRole"></el-input>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addRole">添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse v-model="activeName" accordion @change="changeCollapse">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete" @click="deleteRole(r)">删除</el-button>
            </div>
            <div>
              <el-tree show-checkbox
                       :data="allMenus"
                       :props="defaultProps"
                       ref="tree"
                       :key="index"
                       node-key="id"
                       :default-checked-keys="selectedMenus"
              ></el-tree>
              <div style="display: flex;justify-content: flex-end">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="doUpdate(r.id, index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedMenus: [],
      activeName: -1
    }
  },
  mounted() {
    this.getAllRolesData();
  },
  methods: {
    deleteRole(role){
      this.$confirm('此操作将永久删除[' + role.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/permission/role/' + role.id).then(response => {
          if (response) {
            this.getAllRolesData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addRole() {
      if (this.role.name && this.role.nameZh) {
        this.postRequest('/system/basic/permission/role', this.role).then(response => {
          if (response) {
            this.getAllRolesData();
            this.role.name = '';
            this.role.nameZh = '';
          }
        })
      } else {
        this.$message.error('字段不能为空');
      }
    },
    cancelUpdate() {
      this.activeName = -1;
    },
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      let selectedKeys = tree.getCheckedKeys(true);
      let url = '/system/basic/permission/?rid=' + rid;
      selectedKeys.forEach(key => {
        url += '&mids=' + key;
      });
      this.putRequest(url).then(response => {
        if (response) {
          this.activeName = -1;
        }
      })

      console.log(tree);
      console.log(selectedKeys);
    },
    changeCollapse(rid) {
      if (rid) {
        this.getAllMenus();
        this.getSelectedMenus(rid);
      }
    },
    getSelectedMenus(rid) {
      this.getRequest('/system/basic/permission/mid/' + rid).then(response => {
        if (response) {
          this.selectedMenus = response;
        }
      })
    },
    getAllMenus() {
      this.getRequest('/system/basic/permission/menus').then(response => {
        if (response) {
          this.allMenus = response;
        }
      });
    },
    getAllRolesData() {
      this.getRequest('/system/basic/permission/').then(response => {
        if (response) {
          this.roles = response;
        }
      })
    }
  }
}
</script>

<style>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}

.permissManaTool .el-input {
  width: 300px;
  margin-right: 8px;
}

.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>
