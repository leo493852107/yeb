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
        ref="tree">
    </el-tree>
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
      }
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

<style scoped>

</style>
