<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 10px">
      <el-input v-model="keywords" placeholder="用户名搜索用户" prefix-icon="el-icon-search"
                style="width: 400px; margin-right: 10px"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin, index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete"
                     @click="deleteAdmin(admin)"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="userface-img">
          </div>
        </div>
        <div class="userinfo-container">
          <div>用户名: {{ admin.name }}</div>
          <div>电话: {{ admin.phone }}</div>
          <div>手机: {{ admin.telephone }}</div>
          <div>地址: {{ admin.address }}</div>
          <div>状态:
            <el-switch
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                @change="enabledChange(admin)"
            >
            </el-switch>
          </div>
          <div>
            用户角色:
            <el-tag style="margin-right: 10px" type="success" v-for="(role, index) in admin.roles" :key="index">
              {{ role.nameZh }}
            </el-tag>
            <el-popover
                placement="right"
                title="角色列表"
                width="200"
                @show="showPop(admin)"
                @hide="hidePop(admin)"
                trigger="click">
              <el-select v-model="selectRoles" multiple placeholder="请选择">
                <el-option
                    v-for="(r, index) in allRoles"
                    :key="index"
                    :label="r.nameZh"
                    :value="r.id">
                </el-option>
              </el-select>
              <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
            </el-popover>
          </div>
          <div>
            备注: {{ admin.remark }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysAdmin",
  data() {
    return {
      admins: [],
      keywords: '',
      allRoles: [],
      selectRoles: []
    }
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    hidePop(admin) {
      let roles = [];
      Object.assign(roles, admin.roles);
      let flag = false;
      if (roles.length !== this.selectRoles.length) {
        flag = true;
      } else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectRoles.length; j++) {
            let sr = this.selectRoles[j];
            if (role.id === sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length !== 0) {
          flag = true;
        }
      }
      if (flag) {
        let url = '/system/admin/role?adminId=' + admin.id;
        this.selectRoles.forEach(item => {
          url += '&rids=' + item;
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.getAdmins();
          }
        })
      }
    },
    showPop(admin) {
      this.initAllRoles();
      let roles = admin.roles;
      this.selectRoles = [];
      roles.forEach(r => {
        this.selectRoles.push(r.id);
      });
    },
    initAllRoles() {
      this.getRequest('/system/admin/roles').then(resp => {
        if (resp) {
          this.allRoles = resp;
        }
      })
    },
    enabledChange(admin) {
      this.putRequest('/system/admin/', admin).then(resp => {
        if (resp) {
          this.getAdmins();
        }
      })
    },
    getAdmins() {
      this.getRequest('/system/admin/?keywords=' + this.keywords).then(response => {
        if (response) {
          this.admins = response;
        }
      })
    },
    doSearch() {
      this.getAdmins();
    },
    deleteAdmin(admin) {
      this.$confirm('此操作将永久删除[' + admin.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/admin/' + admin.id).then(response => {
          if (response) {
            this.getAdmins();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.admin-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
}

.admin-card {
  width: 350px;
  margin-bottom: 20px;
}

.userface-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userinfo-container {
  font-size: 12px;
  color: #409eff;
}
</style>
