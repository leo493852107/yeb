<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <el-input style="width: 300px;margin-right: 10px" prefix-icon="el-icon-search"
                  v-model="empName"
                  @keydown.enter.native="getEmps"
                  @clear="getEmps"
                  placeholder="请输入员工名进行搜索.." clearable></el-input>
        <el-button type="primary" prefix-icon="el-icon-search" @click="getEmps">搜索</el-button>
        <el-button type="primary">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success">
          <i class="fa fa-level-up" aria-hidden="true"></i>
          导入数据
        </el-button>
        <el-button type="success">
          <i class="fa fa-level-down" aria-hidden="true"></i>
          导出数据
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="emps"
          stripe
          border
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            fixed
            align="left"
            width="90">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            align="left"
            width="50">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻情况"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            align="left"
            width="50">
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            align="left"
            width="80">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="email"
            label="email"
            align="left"
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            align="left"
            width="270">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="部门"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="joblevel.name"
            label="职称"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="position.name"
            label="职位"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="聘用方式"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            align="left"
            width="80">
        </el-table-column>
        <el-table-column
            prop="school"
            label="学校"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="specialty"
            label="专业"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="workState"
            label="在职装填"
            align="left"
            width="70">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同开始日期"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同截止日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            label="合同期限"
            align="left"
            width="100">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.contractTerm }}</el-tag>
            年
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="200">
          <template slot-scope="scope">
            <el-button style="padding: 3px" size="mini">编辑</el-button>
            <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
            <el-button style="padding: 3px" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <el-pagination
            background
            layout="sizes, prev, pager, next, jumper, ->, total"
            @current-change="currentChange"
            @size-change="sizeChange"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <el-form ref="empForm" v-model="emp">
          <el-row>
            <el-col :span="6">
              <el-form-item label="名字:" prop="name">
                <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px;" v-model="emp.name"
                          placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="emp.gender" style="margin-top: 10px">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                    v-model="emp.birthday"
                    type="date"
                    size="mini"
                    style="width: 150px;"
                    value-format="yyyy-MM-dd"
                    placeholder="出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政治面貌:" prop="politicId">
                <el-select v-model="emp.politicId" size="mini" style="width: 200px;" placeholder="政治面貌">
                  <el-option
                      v-for="item in politicsStatus"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="民族:" prop="nationId">
                <el-select v-model="emp.nationId" size="mini" style="width: 150px;" placeholder="民族">
                  <el-option
                      v-for="item in nations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="籍贯:" prop="nativePlace">
                <el-input v-model="emp.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit" size="mini"
                          style="width: 120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="emp.email" placeholder="请输入邮箱" prefix-icon="el-icon-message" size="mini"
                          style="width: 150px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="emp.address" placeholder="请输入联系地址" prefix-icon="el-icon-edit" size="mini"
                          style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="职位:" prop="posId">
                <el-select v-model="emp.posId" size="mini" style="width: 120px;" placeholder="职位">
                  <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="职称:" prop="jobLevelId">
                <el-select v-model="emp.jobLevelId" size="mini" style="width: 120px;" placeholder="职称">
                  <el-option
                      v-for="item in jobLevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属部门:" prop="departmentId">
                <el-popover
                    placement="bottom"
                    title="请选择部门"
                    width="200"
                    trigger="manual"
                    v-model="visible">
                  <el-tree :data="allDeps"
                           default-expand-all="true"
                           :props="defaultProps"
                           @node-click="handleNodeClick"></el-tree>
                  <div slot="reference" style="width: 150px; display: inline-flex; border: 1px solid #dedede; height: 24px;
                border-radius: 5px; cursor: pointer; align-items: center; font-size: 13px; padding-left: 8px;" @click="showDepView">{{ inputDepName }}
                  </div>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话号码:" prop="phone">
                <el-input v-model="emp.phone" placeholder="请输入电话号码" prefix-icon="el-icon-edit" size="mini"
                          style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工号:" prop="workId">
                <el-input v-model="emp.workId" placeholder="请输入工号" prefix-icon="el-icon-edit" size="mini"
                          style="width: 150px" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学历:" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" size="mini" style="width: 120px;" placeholder="学历">
                  <el-option
                      v-for="item in tiptopDegree"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业院校:" prop="school">
                <el-input v-model="emp.school" placeholder="请输入毕业院校" prefix-icon="el-icon-edit" size="mini"
                          style="width: 150px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称:" prop="specialty">
                <el-input v-model="emp.specialty" placeholder="请输入专业名称" prefix-icon="el-icon-edit" size="mini"
                          style="width: 200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="入职日期:" prop="beginDate">
                <el-date-picker
                    v-model="emp.beginDate"
                    type="date"
                    size="mini"
                    style="width: 130px;"
                    value-format="yyyy-MM-dd"
                    placeholder="入职日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="转正日期:" prop="conversionTime">
                <el-date-picker
                    v-model="emp.conversionTime"
                    type="date"
                    size="mini"
                    style="width: 130px;"
                    value-format="yyyy-MM-dd"
                    placeholder="转正日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同开始日期:" prop="beginContract">
                <el-date-picker
                    v-model="emp.beginContract"
                    type="date"
                    size="mini"
                    style="width: 130px;"
                    value-format="yyyy-MM-dd"
                    placeholder="合同开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="合同截止日期:" prop="endContract">
                <el-date-picker
                    v-model="emp.endContract"
                    type="date"
                    size="mini"
                    style="width: 130px;"
                    value-format="yyyy-MM-dd"
                    placeholder="合同截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="身份证:" prop="idCard">
                <el-input v-model="emp.idCard" placeholder="请输入身份证" prefix-icon="el-icon-edit" size="mini"
                          style="width: 180px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="聘用形式:" prop="engageForm">
                <el-radio-group v-model="emp.engageForm" style="margin-top: 10px">
                  <el-radio label="劳工合同">劳工合同</el-radio>
                  <el-radio label="劳务合同">劳务合同</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况:" prop="wedlock">
                <el-radio-group v-model="emp.wedlock" style="margin-top: 10px">
                  <el-radio label="已婚">已婚</el-radio>
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="离异">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      allDeps: [],
      inputDepName: '',
      visible: false,
      emps: [],
      loading: false,
      total: 0,
      currentPage: 1,
      size: 10,
      empName: '',
      dialogVisible: false,
      emp: {
        'name': '',
        'gender': '',
        'birthday': '',
        'idCard': '',
        'wedlock': '',
        'nationId': '',
        'nativePlace': '',
        'politicId': null,
        'email': '',
        'phone': '',
        'address': '',
        'departmentId': null,
        'jobLevelId': null,
        'posId': null,
        'engageForm': '',
        'tiptopDegree': '',
        'specialty': '',
        'school': '',
        'beginDate': '',
        'workState': '',
        'workId': '',
        'contractTerm': null,
        'conversionTime': '',
        'notworkDate': null,
        'beginContract': '',
        'endContract': '',
        'workAge': null,
        'salaryId': null
      },
      nations: [],
      jobLevels: [],
      politicsStatus: [],
      positions: [],
      tiptopDegree: ['博士', '硕士', '专科', '大专', '高中', '初中', '小学', '其他']
    }
  },
  mounted() {
    this.getEmps();
    this.initData();
  },
  methods: {
    handleNodeClick(data) {
      this.inputDepName = data.name;
      this.emp.departmentId = data.id;
      this.visible = !this.visible;
    },
    showDepView() {
      this.visible = !this.visible;
    },
    getMaxWorkId() {
      this.getRequest('/employee/basic/maxWorkID').then(resp => {
        if (resp) {
          this.emp.workId = resp.obj;
        }
      })
    },
    getPositions() {
      this.getRequest('/employee/basic/Positions').then(resp => {
        if (resp) {
          this.positions = resp;
        }
      })
    },
    initData() {
      if (!window.sessionStorage.getItem('nations')) {
        this.getRequest('/employee/basic/nations').then(resp => {
          if (resp) {
            this.nations = resp;
            window.sessionStorage.setItem('nations', JSON.stringify(resp));
          }
        })
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem('nations'));
      }
      if (!window.sessionStorage.getItem('jobLevels')) {
        this.getRequest('/employee/basic/joblevels').then(resp => {
          if (resp) {
            this.jobLevels = resp;
            window.sessionStorage.setItem('jobLevels', JSON.stringify(resp));
          }
        })
      } else {
        this.jobLevels = JSON.parse(window.sessionStorage.getItem('jobLevels'));
      }
      if (!window.sessionStorage.getItem('politicsStatus')) {
        this.getRequest('/employee/basic/politicsStatus').then(resp => {
          if (resp) {
            this.politicsStatus = resp;
            window.sessionStorage.setItem('politicsStatus', JSON.stringify(resp));
          }
        })
      } else {
        this.politicsStatus = JSON.parse(window.sessionStorage.getItem('politicsStatus'));
      }
      if (!window.sessionStorage.getItem('allDeps')) {
        this.getRequest('/employee/basic/deps').then(resp => {
          if (resp) {
            this.allDeps = resp;
            window.sessionStorage.setItem('allDeps', JSON.stringify(resp));
          }
        })
      } else {
        this.allDeps = JSON.parse(window.sessionStorage.getItem('allDeps'));
      }
    },
    showAddEmpView() {
      this.getMaxWorkId();
      this.getPositions();
      this.dialogVisible = true;
    },
    sizeChange(size) {
      this.size = size;
      this.getEmps();
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getEmps();
    },
    getEmps() {
      this.loading = true;
      this.getRequest('/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.empName).then(resp => {
        this.loading = false;
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
