<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="部门管理" name="DeptMana"><dept-mana></dept-mana></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><pos-mana></pos-mana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><job-level-mana></job-level-mana></el-tab-pane>
      <el-tab-pane label="职称管理" name="EcMana"><ec-mana></ec-mana></el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana"><permiss-mana></permiss-mana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DeptMana from "@/components/sys/basic/DeptMana";
import EcMana from "@/components/sys/basic/EcMana";
import JobLevelMana from "@/components/sys/basic/JobLevelMana";
import PermissMana from "@/components/sys/basic/PermissMana";
import PosMana from "@/components/sys/basic/PosMana";

export default {
  name: "SysBasic",
  data() {
    return {
      activeName: 'DeptMana'
    }
  },
  components: {
    DeptMana,
    EcMana,
    JobLevelMana,
    PermissMana,
    PosMana
  }

}
</script>

<style scoped>

</style>
