<template>
  <div class="app-container">
    <el-form :inline="true" :model="userInfoQuery" class="demo-form-inline">
      <el-form-item label="性别">
        <el-select v-model="userInfoQuery.gender" placeholder="性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生开始时间">
         <el-date-picker
            v-model="userInfoQuery.startTime"
            type="datetime"
            format= "yyyy-MM-dd HH:mm:ss"
            value-format= "yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="出生结束时间"> 
         <el-date-picker
            v-model="userInfoQuery.endTime"
            type="datetime"
            format= "yyyy-MM-dd HH:mm:ss"
            value-format= "yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUserInfo">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userInfo" stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        :formatter="getGender"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="politicalFace"
        label="政治面貌"
        :formatter="getPoliticalFace"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="job" label="职业" :formatter="getJob" width="180">
      </el-table-column>
         <el-table-column prop="birthday" label="生日" width="180">
      </el-table-column>
      <el-table-column prop="name" label="偏好" width="180"> </el-table-column>
      <el-table-column prop="name" label="用户价值"> </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right; padding: 10px 35px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userInfoQuery.pageIndex"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="userInfoQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import userInfoApi from "@/api/basicTag";
export default {
  data() {
    return {
      userInfo: [],
      userInfoQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.listUserInfo();
  },
  methods: {
    searchUserInfo() {
      this.listUserInfo();
    },
    listUserInfo() {
      userInfoApi.listUserInfo(this.userInfoQuery).then((response) => {
        this.userInfo = response.data.items;
        this.total = response.data.total;
      });
    },
    //获取性别
    getGender(row, column, cellValue) {
      if (cellValue == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    //获取职位
    getJob(row, column, cellValue) {
      //1学生、2公务员、3军人、4警察、5教师、6白领
      if (cellValue == 1) {
        return "学生";
      } else if (cellValue == 2) {
        return "公务员";
      } else if (cellValue == 3) {
        return "军人";
      } else if (cellValue == 4) {
        return "警察";
      } else if (cellValue == 5) {
        return "教师";
      } else {
        return "白领";
      }
    },
    getPoliticalFace(row, column, cellValue) {
      //政治面貌：1群众、2党员、3无党派人士
      if (cellValue == 1) {
        return "群众";
      } else if (cellValue == 2) {
        return "党员";
      } else {
        return "无党派人士";
      }
    },
    handleSizeChange(val) {
      this.userInfoQuery.pageSize = val;
      this.listUserInfo();
    },
    handleCurrentChange(row) {
      this.userInfoQuery.pageIndex = row;
      this.listUserInfo();
    },
  },
};
</script>
