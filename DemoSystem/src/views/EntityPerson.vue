<template>
  <div class="EntityPerson">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h2 class="title">实体 - 人物 - {{ entityPersonInfo.name }}</h2>
          <el-divider class="title-line"></el-divider>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">人物简介</h3>
            <el-divider class="subtitle-line"></el-divider>

            <el-col :span="18" class="entity-col">
              <div>
                <!-- <el-image style="width: 180px; height: 180px; padding: 20px" :src="require('../assets/' + entityPersonInfo.personImgName)"></el-image> -->
                <!-- <el-image style="width: 180px; height: 180px; padding: 20px" :src="require('../assets/江启臣.jpg')"></el-image> -->
                <p style="width: 180px; padding: 20px">{{ entityPersonInfo.summary }}</p>
              </div>
            </el-col>

            <el-col :span="24" class="entity-col">
              <table class="table table-striped table-bordered" style="width: 570px; margin-bottom: 90px">
                <tr v-if="entityPersonInfo.name != null">
                  <td class="column">名称</td>
                  <td class="value">{{ entityPersonInfo.name }}</td>
                </tr>
                <tr v-if="entityPersonInfo.name_cht != null">
                  <td class="column">名称(繁)</td>
                  <td class="value">{{ entityPersonInfo.name_cht }}</td>
                </tr>
                <tr v-if="entityPersonInfo.alias != null">
                  <td class="column">别名</td>
                  <td class="value" v-if="entityPersonInfo.alias.length == 1">
                    {{ entityPersonInfo.alias[0] }}
                  </td>
                  <td class="value" v-if="entityPersonInfo.alias.length > 1">
                    <li class="table-list" v-for="(sub, i) in entityPersonInfo.alias" :key="i">
                      {{ sub }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityPersonInfo.gender != null">
                  <td class="column">性别</td>
                  <td class="value">{{ entityPersonInfo.gender }}</td>
                </tr>
                <tr v-if="entityPersonInfo.birthDay != null">
                  <td class="column">生日</td>
                  <td class="value">{{ entityPersonInfo.birthDay }}</td>
                </tr>
                <tr v-if="entityPersonInfo.birthPlace != null">
                  <td class="column">出生地</td>
                  <td class="value">{{ entityPersonInfo.birthPlace }}</td>
                </tr>
                <tr v-if="entityPersonInfo.father != null">
                  <td class="column">父亲</td>
                  <td class="value">{{ entityPersonInfo.father }}</td>
                </tr>
                <tr v-if="entityPersonInfo.mother != null">
                  <td class="column">母亲</td>
                  <td class="value">{{ entityPersonInfo.mother }}</td>
                </tr>
                <tr v-if="entityPersonInfo.sibling != null">
                  <td class="column">兄弟姐妹</td>
                  <td class="value">{{ entityPersonInfo.sibling }}</td>
                </tr>
                <tr v-if="entityPersonInfo.spouse != null">
                  <td class="column">配偶</td>
                  <td class="value">{{ entityPersonInfo.spouse }}</td>
                </tr>
                <tr v-if="entityPersonInfo.child != null">
                  <td class="column">子女</td>
                  <td class="value">{{ entityPersonInfo.child }}</td>
                </tr>
                <tr v-if="entityPersonInfo.ancestralHome != null">
                  <td class="column">祖籍</td>
                  <td class="value">{{ entityPersonInfo.ancestralHome }}</td>
                </tr>
                <tr v-if="entityPersonInfo.occupation != null">
                  <td class="column">职业</td>
                  <td class="value" v-if="entityPersonInfo.occupation.length == 1">
                    {{ entityPersonInfo.occupation[0] }}
                  </td>
                  <td class="value" v-if="entityPersonInfo.occupation.length > 1">
                    <li class="table-list" v-for="(sub, i) in entityPersonInfo.occupation" :key="i">
                      {{ sub }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityPersonInfo.party != null">
                  <td class="column">党派</td>
                  <td class="value">{{ entityPersonInfo.party }}</td>
                </tr>

                <tr v-if="entityPersonInfo.position != null">
                  <td colspan="2" class="column">任职经历</td>
                </tr>
                <tr v-for="(val, key, i) in entityPersonInfo.position" :key="i">
                  <td class="column">{{ key }}</td>
                  <td class="value">{{ val }}</td>
                </tr>

                <tr v-if="entityPersonInfo.education != null">
                  <td colspan="2" class="column">教育经历</td>
                </tr>
                <tr v-for="(val, key, i) in entityPersonInfo.education" :key="i">
                  <td class="column">{{ key }}</td>
                  <td class="value">{{ val }}</td>
                </tr>

                <tr v-if="entityPersonInfo.webSite != null">
                  <td colspan="2" class="column">官方主页</td>
                </tr>
                <tr v-for="(val, key, i) in entityPersonInfo.webSite" :key="i">
                  <td class="column">{{ key }}</td>
                  <td class="value">{{ val }}</td>
                </tr>

                <tr v-if="entityPersonInfo.outLink != null">
                  <td class="column">外部链接</td>
                  <td class="value">{{ outlink }}</td>
                </tr>
              </table>

            </el-col>
          </el-card>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">五维人格</h3>
            <el-divider class="subtitle-line"></el-divider>
            <div>
              <div id="radar_canvas" class="echart" style="width: 100%; height: 600px;"></div>
            </div>
          </el-card>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">关系网络</h3>
            <el-divider class="subtitle-line"></el-divider>
            <div>
              <div id="relation" style="width: 100%; height: 1000px;"></div>
            </div>
          </el-card>

<!--           <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">社会评价</h3>
            <el-divider class="subtitle-line"></el-divider>
            <div id="chartPie" class="pie-wrap"></div>
          </el-card>
 -->
          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">相关事件</h3>
            <el-divider class="subtitle-line"></el-divider>
            <el-col :span="30" class="entity-col" style="margin-bottom: 50px;">
              <div v-for="(item, i) in event" :key="i">
                <el-card v-if="i < 10" class="event-box-card" shadow="hover">
                  <!--               <el-image style="width: 400px; height: 250px; margin-left: 250px" :src="require('../assets/' + entityPersonInfo.eventImgName)"></el-image>  -->
                  <h3 style="margin-left: 10px;">{{ item.name }}</h3>
                  <p>{{ item.abstractText }}</p>
                  <p style="text-align: right; margin-right: 20px; margin-top: 20px;">{{ item.eid.slice(0, 10) }}</p>
                </el-card>
              </div>
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
  name: 'EntityPerson',
  components: {
  },
     
  data() {
    return {
      id: '',

      chartPie: null,

      entityPersonInfo: '',
      outlink: '',

      personality: '',

      network: '',

      event: [],

      assessments: [
        {value: 335, name: '非常不满意'},
        {value: 310, name: '较不满意'},
        {value: 234, name: '中立'},
        {value: 135, name: '较满意'},
        {value: 1548, name: '非常满意'}
      ]

    };
  },

  props: [''],

  computed: {
  },

  created() {
    this.fetchData();
  },

  mounted() {
    console.log(this.id);

    this.axios
    .get('/entity/celebrity/' + this.id)
    .then(response => {
      this.entityPersonInfo = response.data;
      console.log(this.entityPersonInfo);
      this.outlink = decodeURI(this.entityPersonInfo.outLink);
    });
    this.axios
    .get('/event/byeid/' + this.id)
    .then(eventResp => {
      this.event = eventResp.data.slice(0, 10);
      this.selectEventTitle();
      console.log(this.event);
    });
    this.axios
    .get('/personality/' + this.id)
    .then(personalityResp => {
      this.personality = [personalityResp.data.agreeableness, personalityResp.data.openness, personalityResp.data.conscientious, personalityResp.data.extraversion, personalityResp.data.neuroticism];
      console.log(this.personality);
      this.initRadar('radar_canvas');
    });
    this.axios
    .get('/network/' + this.id)
    .then(networkResp => {
      this.network = networkResp.data;
      console.log(this.network);
      this.drawChart();
    });

    // this.$nextTick(() => {
    //   this.drawPieChart();
    //   this.initRadar('radar_canvas');
    //   this.drawChart();
    // });
  },   

  watch: {
    '$route': 'fetchData'
  },   

  methods: {
    fetchData() {
      this.id = this.$route.params.id;
    },

    selectEventTitle() {
      for (var i in this.event) {
        this.event[i].name = this.event[i].abstractText.split(/\s*[，,]\s*/)[0];
        // console.log(this.event[i].name);
      }
    },
          
    initRadar() {
      let charts = echarts.init(document.getElementById('radar_canvas'));
      var option = {
        title: {
          text: '',
          textStyle: {
            color: 'rgba(221,221,221,1)', //标题颜色
            fontSize: 50,
            lineHeight: 20,
          },
          // 标题的位置，此时放在图的底边
          left: 'center',
          top: 'bottom',
        },
        // 图表的位置
        grid: {
          position: 'center',
        },
        tooltip : {
          //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
          confine: true,
          enterable: true, //鼠标是否可以移动到tooltip区域内
        },
        radar: {
          shape: 'circle',
          splitNumber: 5, // 雷达图圈数设置
          name: {
            textStyle: {
                color: '#838D9E',
                fontSize: 20,
            },
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,.1)',
            },
          },
          indicator: [
            {
              name: '宜人性', 
              max: 5,
              axisLabel: {
                show: true,
                fontSize: 12,
                color: '#838D9E',
                showMaxLabel: false, // 不显示最大值，即外圈不显示数字30
                showMinLabel: true, // 显示最小数字，即中心点显示0
              },
            },
            { name: '开放性', max: 5},
            { name: '责任心', max: 5},
            { name: '外倾性', max: 5},
            { name: '神经质性', max: 5},
          ],
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
            show: false,
            areaStyle: {
              color: 'rgba(255,0,0,0)', // 图表背景的颜色
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(131,141,158,.1)', // 设置网格的颜色
            },
          },
        },
        series: [{
          name: '雷达图', // tooltip中的标题
          type: 'radar', //表示是雷达图
          symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
          symbolSize: 8, // 拐点的大小

          areaStyle: {
            normal: {
              width: 1,
              opacity: 0.2,
            },
          },
          data: [
            {
              value: this.personality,
              name: '',
              itemStyle: {
                normal: {
                  color: 'rgba(60,135,213,.3)',
                  lineStyle: {
                    width: 1,
                    color: 'rgba(60,135,213,.3)',
                  },
                },
              },
            },
          ],
        }],
      };
      
      charts.setOption(option);
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("relation"));

      var allNodes = [];
      for (var i in this.network.nodes) {
        allNodes.push({'name': this.network.nodes[i].nodeName, 'des': this.network.nodes[i].des});
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
              repulsion: 2500, //节点之间的斥力因子
              edgeLength: [30, 50]
            },
            draggable: true,
            //定义节点的样式
            itemStyle: {
              color: "#eba844"
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
                symbolSize: 100,
                //节点图形的样式
                itemStyle: {
                  color: "#900"
                }
              }
            ].concat(allNodes.slice(1)),

            links: this.network.links
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    drawPieChart() {
      let mytextStyle = {
        color: "#333",                          
        fontSize: 18,                            
      };
      let mylabel = {
        show: true,                 
        position: "right",          
        offset: [30, 40],             
        formatter: '{b} : {c} ({d}%)',      
        textStyle: mytextStyle
      };

      this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');

      var legendData = [];
      for (var i in this.assessments) {
        legendData.push(this.assessments[i].name);
      }
      
      this.chartPie.setOption({
        title: {
          text: this.entityPersonInfo.name,
          subtext: '社会评价',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: legendData,
          left: "center",                              
          top: "bottom",                              
          orient: "horizontal",                        
        },
        series: [
          {
            name: '社会评价',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: this.assessments,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {           
              emphasis: mylabel
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
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
  font-size: 14px;
  width: 300px !important;
  height: 30px;
  border: 1px solid #333;
}

.table-list {
  text-align: center !important;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.EntityPerson {
  width: 960px;
  margin: 0 auto;
}

.EntityPerson .pie-wrap {
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

.title-line {
  margin-top: 5px !important;
  margin-bottom: 30px !important;
  width: 300px !important;
  background: rgb(175, 175, 175) !important;
}

.subtitle-line {
  margin-top: 0px !important;
  margin-bottom: 20px !important;
  width: 150px !important;
  background: rgb(175, 175, 175) !important;
}

.box-card {
  margin-bottom: 20px;
  color: rgba(80, 80, 80, 1);
}

.event-box-card {
  padding: 30px;
  color: rgba(80, 80, 80, 1);
}

</style>
