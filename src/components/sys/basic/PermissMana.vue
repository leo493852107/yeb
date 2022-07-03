<template>
  <div>
    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入英文名称" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" v-model="role.nameZh" placeholder="请输入中文名称"></el-input>
      <el-button size="small" type="primary" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse accordion @change="changeCollapse">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete"></el-button>
            </div>
            <el-tree show-checkbox :data="allMenus" :props="defaultProps"></el-tree>
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
      }
    }
  },
  mounted() {
    this.getAllRolesData();
  },
  methods: {
    changeCollapse(rid) {
      if (rid) {
        this.getAllMenus();
      }
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
