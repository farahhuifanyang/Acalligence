<template>
  <div class="EEG">
    <el-row>
      <el-col :span="9" :offset="1">
        <el-input
          placeholder="鲑鱼之乱"
          v-model="query">
          <template #append>
              <el-button icon="el-icon-search" @click="search_way">
              </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="8">
        <div class='EEG_checkbox'>
          <el-checkbox v-model="checked1" label="抽象因果关系" size="small"></el-checkbox>
          <el-checkbox v-model="checked2" label="事件泛化" size="small"></el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="17" :offset="1">
        <div class='GraphSpace'>
        <div id="EEG" style="height:600px;"></div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class='GraphInfo' style="height:600px;">
          <div class='InfoHeader'>
            原因
          </div>
          <div class='InfoContent'>
            <span style="color:#dc3545;font-size:15px">连锁寿司店「寿司郎」鲑鱼免费吃活动</span>
          </div>
          <div class='InfoHeader'>
            上下文
          </div>
          <div class='InfoContent'>
            <span style="color:#007bff;font-size:15px">李来希对「鲑鱼世代」表示感慨</span>
          </div>
          <div class='InfoHeader'>
            结果
          </div>
          <div class='InfoContent'>
            <span style="font-size:15px"><span style="color:#dc3545;">连锁寿司店「寿司郎」鲑鱼免费吃活动</span>，吸引至少3百名台湾年轻人改名，活动期间有人藉此赚外快，也有人因为改完名差点不回来。对于改名的鲑鱼们，年纪多落在民国87至92年次大学生，网路上有网友将这些「鲑鱼」封为「鲑鱼世代」。 全国公务人员协会前理事长<span style="color:#007bff;">李来希对「鲑鱼世代」表示感慨</span>，只为一餐鲑鱼寿司饭就丢掉父母给的印记，哪天诱惑稍微加码一下，是不是连祖宗的姓氏也可以抛弃？</span>
          </div>
        </div>
      </el-col>
    </el-row>    

  </div>
</template>
<style>
body {
  margin:0;
  padding:0;
}
html{
  height:100%;
}
.EEG{
  /* width: 1080px; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* align-items:center; */
}
.EEG .el-input{
  height: 30px;
	text-indent: 5px;
	font-size: 14px;
  margin-top: 20px;
  margin-bottom: 0px;
}
.EEG .el-checkbox{
  height: 30px;
	text-indent: 5px;
	font-size: 14px;
  margin-top: 25px;
  margin-bottom: 0px;
  margin-right: 1px;
}
.EEG .GraphSpace{
  background-color: #fff;
  border:1px solid #ced4da;
  border-radius:.25rem;
  margin-right: 5px;
}
.EEG .GraphInfo{
  background-color: #fff;
  border:1px solid #ced4da;
  border-radius:.25rem;
  margin-left: 5px;


}
.EEG .GraphInfo .InfoHeader{
  background-color: #f0f1f2;
  border-top: 1px solid #ced4da;
  padding: 5px 8px;
}
.EEG .GraphInfo .InfoContent{
  height: 32px;
  background-color: #f8f9fa;
  border-top: 1px solid #ced4da;
  padding: 5px 8px;
  margin-bottom: 10px;
}
</style>
<script>
import * as echarts from 'echarts';
export default {
  name: 'EventEvolutionaryGraph',
  components: {
    
  },
  // 用于设定checkbox初始选项
  data () {
    return {
      radio: 3,
      query: this.radio,
      checked1: true,
      checked2: false,
    };
  },
  methods:{
    search_way() {
      if (this.radio == '9'){
        this.$router.push({name:'SearchResult',params:{type:3,query:this.query}});
      }
      else if (this.radio == '6'){
        this.$router.push({name:'SearchResult',params:{type:2,query:this.query}});
      }
      else if (this.radio == '3'){
        this.$router.push({name:'SearchResult',params:{type:1,query:this.query}});
      }

    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("EEG"));
      // 指定图表的配置项和数据
      let option = {
        title: { 
          text: "鲑鱼之乱" 
        },
        tooltip: {
          formatter: function(param) {
            // console.log("输出",param);
            //tooltip这里的formatter参数param可以得到series中的data数据
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
              color: "#000",
              length:20
            },
            //连线上的标记样式
            edgeLabel: {
              show: true,
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
              fontSize: 20
            },
            data: [
              {
                name: "鲑鱼之乱",
                //节点图形的样式
                symbolSize: 100,
                itemStyle: {
                  color: "#465c8b",
                },
              },
              {
                name: "「寿司郎」鲑鱼免费吃活动",
                des: "连锁寿司店「寿司郎」鲑鱼免费吃活动",
                label: {
                  fontSize:12,
                },
                itemStyle: {
                  color: "#dc3545",
                },
              },
              {
                name: "台中男生改名「张鲑鱼之梦」",
                des: "台中1名男大生在活动推出期间，改名「张鲑鱼之梦」",
                
                label: {
                  fontSize:12,
                },
                itemStyle: {
                  color: "#dc3545",
                },
              },
              {
                name: "网络称改名者「鲑鱼世代」",
                des: "",
                label: {
                  fontSize:12,
                },
              },
              {
                name: "吕秋远发文批评改名现象",
                des: "",
                label: {
                  fontSize:12,
                },
              },
              {
                name: "台中市46人改名鲑鱼",
                des: "",
                label: {
                  fontSize:12,
                },
                itemStyle: {
                  color: "#dc3545",
                },
              },
              {
                name: "5只鲑鱼改回原名",
                des: "",
                label: {
                  fontSize: 12
                }
              },
              {
                name: "李来希对「鲑鱼世代」表示感慨",
                des: "",
                label: {
                  fontSize: 12
                }
              },
            ],
            links: [
              {
                source: "「寿司郎」鲑鱼免费吃活动",
                target: "鲑鱼之乱",
                value: "0.8"
              },
              {
                source: "台中男生改名「张鲑鱼之梦」",
                target: "鲑鱼之乱",
                value: "0.2",
              },
              {
                source: "鲑鱼之乱",
                target: "网络称改名者「鲑鱼世代」",
                value: "0.2"
              },
              {
                source: "鲑鱼之乱",
                target: "吕秋远发文批评改名现象",
                value: "0.1"
              },
              {
                source: "台中市46人改名鲑鱼",
                target: "鲑鱼之乱",
                value: "0.3"
              },
              {
                source: "鲑鱼之乱",
                target: "5只鲑鱼改回原名",
                value: "0.2"
              },
              {
                source: "鲑鱼之乱",
                target: "李来希对「鲑鱼世代」表示感慨",
                value: "0.2"
              },
              
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  }

}
</script>
