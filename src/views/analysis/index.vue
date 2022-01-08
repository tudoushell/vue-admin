<template>
  <div class="app-container">
    <el-form :inline="true" :model="analysisQuery" class="demo-form-inline">
      <el-form-item label="数据分析">
        <el-select v-model="analysisQuery.way" placeholder="选择">
          <el-option label="男女数据" value="gender"></el-option>
          <el-option label="出生日期人数" value="birthday"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="main" style="height: 500px; width: 100%">
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import analysisAPI from "@/api/analysis";
export default {
  data() {
    return {
      analysisQuery: {},
      genderData: {},
      birthdayData: {},
      name: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    dataQuery() {
      let way = this.analysisQuery.way;
      if (way == "gender") {
        analysisAPI.listGenderCount().then((response) => {
          this.genderData = response.data;
          this.setGenderEcharts();
          this.name = "男女比例";
          this.show = 1;
        });
      } else {
        analysisAPI.listBirthdayCount().then((response) => {
          this.birthdayData = response.data;
          this.setBirthdayEcharts();
          this.name = "出生人数";
        });
      }
    },
    setGenderEcharts() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: this.name,
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.genderData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    },
    setBirthdayEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          type: "category",
          data: this.birthdayData.dayList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.birthdayData.dataList,
            type: "line",
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
    },
  },
};
</script>
