<template>
  <div class="SixDegrees">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h2 class="title">六度搜索</h2>
          <el-divider class="sixdegrees-title-line"></el-divider>

          <el-input placeholder="输入第一个实体" v-model="startName" style="width: 30%; margin-left: 150px; margin-top: 50px;"></el-input>
          <el-input placeholder="输入第二个实体" v-model="endName" style="width: 37%;">
            <template #append>
              <el-button id="selfclick" icon="el-icon-search" v-on:click="searchSix()">
              </el-button>
            </template>
          </el-input>
          <p style="margin-top: 30px; margin-left: 160px; color: #424242">示例：蔡英文—马英九，江启臣—蔡英文</p>

          <el-card class="box-card" shadow="hover" style="margin-top: 80px;">
            <h2 class="subtitle" style="margin-top: 20px; text-align: center;">{{ startNameTitle }} — {{ endNameTitle }}</h2>
            <el-divider class="sixdegrees-subtitle-line"></el-divider>

            <div style="margin-left: 300px;">
              <button class="button" id="B0" v-on:click="btn_click(0)">一跳</button>
              <button class="button" id="B1" v-on:click="btn_click(1)">两跳</button>
              <button class="button" id="B2" v-on:click="btn_click(2)">三跳</button>
              <button class="button" id="B3" v-on:click="btn_click(3)">四跳</button>
              <button class="button" id="B4" v-on:click="btn_click(4)">全部</button>
            </div>

            <div>
              <div id="sixDegreesElem" style="width: 100%; height: 1000px;"></div>
            </div>

            <el-col :span="24" class="entity-col">
              <table style="border: 1px solid #ddd; margin-left: 70px; width: 750px; margin-bottom: 90px;">
                <tr>
                  <td style="border: 1px solid #ddd; text-align: center; width: 70px; font-weight: bold; font-size: 20px;">路径长度</td>
                  <td style="border: 1px solid #ddd; text-align: center; width: 500px; font-weight: bold; font-size: 20px;">路径内容</td>
                </tr>

                <tr v-for="(val, key, i) in pathDTOList" :key="i">
                  <td style="border: 1px solid #ddd; text-align: center; font-weight: bold; width: 70px; font-size: 17px;">{{ val.length }}</td>
                  <td style="border: 1px solid #ddd; width: 500px; text-align: left; font-size: 17px;">{{ val.content }}</td>
                </tr>
             </table>
            </el-col>
          </el-card>

        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
// @ is an alias to /src

import * as echarts from 'echarts';
require('echarts/theme/macarons'); // 引入主题

export default {
  name: 'SixDegrees',
  components: {
  },
     
  data() {
    return {
      startEid: '',
      endEid: '',
      startName: '',
      endName: '',
      startNameTitle: '',
      endNameTitle: '',
      networkDTOList: [],
      pathDTOList: [],
      preChoice: 4,
      cnt: 4
    };
  },

  props: [''],

  computed: {
  },

  created() {
    this.fetchData();
  },

  mounted() {
    console.log(this.startEid, this.endEid);
    this.axios
    .get('/sixsearch/result?startEid=' + 'Q233984' + '&endEid=' + 'Q19216')
    .then(response => {
      this.networkDTOList = response.data.networkDTOList;
      this.pathDTOList = response.data.pathDTOList;
      this.changePathFormat();
      this.changeLinkValueFormat();
      console.log(this.networkDTOList);
      console.log(this.pathDTOList);

      this.startNameTitle = "蔡英文";
      this.endNameTitle = "马英九";

      var preButton = document.getElementById("B" + this.preChoice.toString());
      preButton.style.cssText = "border-width: 2px;";
      this.drawChart(4);
    });

  },   

  watch: {
    '$route': 'fetchData'
  },   

  methods: {
    searchSix() {
      // console.log(this.cnt);
      if (this.cnt == 1) {
        this.cnt = 4;
        // console.log(this.cnt);
        return;
      }

      this.axios
      .get('/entity/celebrity/condition', {
        params: {
          'name': this.startName
        },
      })
      .then(response => {
        this.startEid = response.data[0].eid;
        console.log(this.startEid);
      });

      this.axios
      .get('/entity/celebrity/condition', {
        params: {
          'name': this.endName
        },
      })
      .then(response => {
        this.endEid = response.data[0].eid;
        console.log(this.endEid);
      });
               
      this.axios
      .get('/sixsearch/result?startEid=' + this.startEid + '&endEid=' + this.endEid)
      .then(response => {
        this.networkDTOList = response.data.networkDTOList;
        this.pathDTOList = response.data.pathDTOList;
        this.changePathFormat();
        this.changeLinkValueFormat();
        this.startNameTitle = this.startName;
        this.endNameTitle = this.endName;

        console.log(this.networkDTOList);
        console.log(this.pathDTOList);

        this.cnt -= 1;
        if (this.cnt > 0) {
          var pagebutton = document.getElementById("selfclick");
          pagebutton.click();
        }
      });

      if (this.startEid != null && this.endEid != null) {
        this.btn_click(4);
      }
    },

    changePathFormat() {
      var path = [];
      for (var i in this.pathDTOList) {
        path = this.pathDTOList[i].content.split(",");
        // console.log(path);
        for (var j = 1; j < path.length - 2; j += 2) {
          path[j] = "---(" + path[j] + ")-->";
        }
        this.pathDTOList[i].content = path.join("");
        // console.log(path);
      }
    },

    changeLinkValueFormat() {
      var linkValue = [];
      for (var i in this.networkDTOList) {
        var linkList = this.networkDTOList[i].links;
        for (var j in linkList) {
          linkValue = linkList[j].value.split(" ");
          linkList[j].value = linkValue.join("/");
        }
        this.networkDTOList[i].links = linkList;
      }
    },

    btn_click: function(num) {
      var preButton = document.getElementById("B" + this.preChoice.toString());
      preButton.style.cssText = "border-width: 0px;";

      var button = document.getElementById("B" + num.toString());
      button.style.cssText = "border-width: 2px;";

      this.drawChart(num);
      this.preChoice = num;
    },

    fetchData() {
      this.id = this.$route.params.id;
    },
          
    drawChart(num) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("sixDegreesElem"));

      var allNodes = [];
      if (this.networkDTOList[num].nodes.length == 0) {
        myChart = echarts.init(document.getElementById("sixDegreesElem")).dispose();
        return;
      }
      else {
        for (var i in this.networkDTOList[num].nodes) {
          allNodes.push({'name': this.networkDTOList[num].nodes[i].nodeName, 'des': this.networkDTOList[num].nodes[i].des, 'symbol': "image://data:image/png;base64," + this.networkDTOList[num].nodes[i].symbol});
        }
      }

      // 指定图表的配置项和数据
      let option = {
        title: { 
          // text: "江启臣图谱" 
        },
        tooltip: {
          formatter: function(param) {
            // console.log("输出",param);
            // tooltip这里的formatter参数param可以得到series中的data数据
            return param.data.des;
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 80,
            focusNodeAdjacency: true, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
            roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ["none", "arrow"], //边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头
            edgeSymbolSize: [10, 10],
            force: {
              repulsion: 2800, //节点之间的斥力因子
              edgeLength: [150, 300]
            },
            draggable: true,
            //定义节点的样式
            itemStyle: {
              color: "#CFEEE9"
            },
            //连线的样式
            lineStyle: {
              width: 2,
              color: "#000"
            },
            //连线上的标记样式
            edgeLabel: {
              show: true,
              fontSize: 14,
              formatter: function(param) {
                //tooltip这里的formatter参数param可以得到series中的data数据
                return param.data.value;
              },
              color: "#000"
            },
            //节点上是否显示文字
            label: {
              show: true,
              fontWeight: "bold",
              fontSize: 18
            },
            data: [
              {
                name: allNodes[0].name,
                des: allNodes[0].des,
                symbol: allNodes[0].symbol,
                symbolSize: 100,
                //节点图形的样式
                itemStyle: {
                  color: "#f08080"
                }
              },
              {
                name: allNodes[1].name,
                des: allNodes[1].des,
                symbol: allNodes[1].symbol,
                symbolSize: 100,
                //节点图形的样式
                itemStyle: {
                  color: "#f08080"
                }
              }
            ].concat(allNodes.slice(2)),

            links: this.networkDTOList[num].links
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
.button {
  background-color: #DCDCDC; 
  border-width: 0px; 
  border-color: black; 
  font: 500 16px Arial; 
  padding: 6px 10px; 
  margin-left: 10px;
}

.table {
  border-collapse: collapse;
  border-spacing: 0;
  background-color: transparent;
  display: table;
  width: 100%;
  max-width: 100%;
  margin-left: 45px;
}

.table td {
  text-align: center;
  vertical-align: middle;
}

.table-bordered {
  border: 1px solid #ddd;
}

.column {
  font-size: 16px;
  font-weight: bold;
  width: 250px !important;
  height: 30px;
  border: 1px solid #333;
}

.value {
  font-size: 16px;
  width: 300px !important;
  height: 30px;
  border: 1px solid #333;
}

.outlinkValue {
  font-size: 12px;
  width: 100%;
  height: 30px;
  border: 1px solid #333;
}

.SixDegrees {
  width: 960px;
  margin: 0 auto;
}

.SixDegrees .pie-wrap {
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
}

.el-row {
  margin-bottom: 30px;
}

.el-col {
  border-radius: 4px;
}

.entity-col {
  padding: 0 !important;
  margin-bottom: 15px;
  margin-right: 15px;
}

.grid-content {
  background: transparent;
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
}

.list {
  background: #FFFFFF;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  padding: 30px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.title {
  margin-top: 70px;
  margin-bottom: 20px;
  color: rgba(80, 80, 80, 1)
}

.subtitle {
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  color: rgba(80, 80, 80, 1)
}

.sixdegrees-title-line {
  margin-top: 5px !important;
  margin-bottom: 30px !important;
  width: 180px !important;
  background: rgb(175, 175, 175) !important;
}

.sixdegrees-subtitle-line {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  margin-left: 200px !important;
  width: 500px !important;
  background: rgb(175, 175, 175) !important;
}

.table-subtitle-line {
  margin-top: 0px !important;
  margin-bottom: 9px !important;
  margin-left: 70px !important;
  width: 750px !important;
  background: rgb(175, 175, 175) !important;
}

.box-card {
  margin-bottom: 20px;
  color: rgba(80, 80, 80, 1);
}

</style>

{"mode":"full","isActive":false}