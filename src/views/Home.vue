<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu index="1" v-for="(item, index) in this.$router.options.routes" :key="index" v-if="!item.hidden">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child, indexj) in item.children">{{child.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {}
}
</script>

<style>

</style>
