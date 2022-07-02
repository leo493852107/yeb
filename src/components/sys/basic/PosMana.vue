<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          v-model="pos.name"
          suffix-icon="el-icon-plus"
          placeholder="请输入职位">
      </el-input>
      <el-button icon="el-icon-plus" type="primary" size="small">添加</el-button>
    </div>
    <div>
      <el-table class="posManaMain"
                :data="positions"
                stripe
                border
                size="small"
                style="width: 80%">
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
        <el-table-column
            prop="enable"
            label="是否启用"
            width="120">
        </el-table-column>
      </el-table>
    </div>
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
      positions: []
    }
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
</style>
