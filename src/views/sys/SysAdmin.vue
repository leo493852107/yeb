<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 10px">
      <el-input placeholder="用户名搜索用户" prefix-icon="el-icon-search" style="width: 400px; margin-right: 10px"></el-input>
      <el-button icon="el-icon-search" type="primary">搜索</el-button>
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin, index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete"></el-button>
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
            >
            </el-switch>
          </div>
          <div>
            用户角色:
            <el-tag style="margin-right: 10px" type="success" v-for="(role, index) in admin.roles" :key="index">
              {{ role.nameZh }}
            </el-tag>
            <el-button type="text" icon="el-icon-more"></el-button>
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
      admins: []
    }
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    getAdmins() {
      this.getRequest('/system/admin/').then(response => {
        if (response) {
          this.admins = response;
        }
      })
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
