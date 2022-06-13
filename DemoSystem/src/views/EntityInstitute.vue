<template>
  <div class="EntityInstitute">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h2 class="title">实体 - 机构 - {{ entityInstituteInfo.name }}</h2>
          <el-divider class="title-line"></el-divider>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">机构简介</h3>
            <el-divider class="subtitle-line"></el-divider>

            <el-col :span="18" class="entity-col">
              <div>
                <el-image style="width: 180px; height: 180px; padding: 20px" :src="require('../assets/' + entityInstituteInfo.instituteImgName)"></el-image>
                <p style="width: 180px; padding: 20px">{{ entityInstituteInfo.abstract }}</p>
              </div>
            </el-col>

            <el-col :span="24" class="entity-col">
              <table class="table table-striped table-bordered" style="width: 570px; margin-bottom: 90px">
                <tr v-if="entityInstituteInfo.name != null">
                  <td class="institute-column">名称</td>
                  <td class="institute-value">{{ entityInstituteInfo.name }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.name_cht != null">
                  <td class="institute-column">名称(繁)</td>
                  <td class="institute-value">{{ entityInstituteInfo.name_cht }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.foundDate != null">
                  <td class="institute-column">建立日</td>
                  <td class="institute-value">{{ entityInstituteInfo.foundDate }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.founder != null">
                  <td class="institute-column">创建者</td>
                  <td class="institute-value">{{ entityInstituteInfo.founder }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.predecessor != null">
                  <td class="institute-column">前身</td>
                  <td class="institute-value">{{ entityInstituteInfo.predecessor }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.subordinate != null">
                  <td class="institute-column">下属机构</td>
                  <td class="institute-value">
                    <li class="institute-table-list" v-for="(sub, i) in entityInstituteInfo.subordinate" :key="i">
                      {{ sub }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityInstituteInfo.core != null">
                  <td class="institute-column">核心机构</td>
                  <td class="institute-value">
                    <li class="institute-table-list" v-for="(sub, i) in entityInstituteInfo.core" :key="i">
                      {{ sub }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityInstituteInfo.member != null">
                  <td class="institute-column">成员人数</td>
                  <td class="institute-value">{{ entityInstituteInfo.member }}</td>
                </tr>
                <tr v-if="entityInstituteInfo.leaders != null">
                  <td class="institute-column">历任领袖</td>
                  <td class="institute-value">
                    <li class="institute-table-list" v-for="(val, key, i) in entityInstituteInfo.leaders" :key="i">
                      {{ key }}：{{ val }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityInstituteInfo.factions != null">
                  <td class="institute-column">内部派系</td>
                  <td class="institute-value">
                    <li class="institute-table-list" v-for="(val, key, i) in entityInstituteInfo.factions" :key="i">
                      {{ key }}：{{ val }}
                    </li>
                  </td>
                </tr>
                <tr v-if="entityInstituteInfo.webSite != null">
                  <td colspan="2" class="institute-column">官方主页</td>
                </tr>
                <tr v-for="(val, key, i) in entityInstituteInfo.webSite" :key="i">
                  <td class="institute-column">{{ key }}</td>
                  <td class="institute-value">{{ val }}</td>
                </tr>

              </table>
            </el-col>
          </el-card>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">关系网络</h3>
            <el-divider class="subtitle-line"></el-divider>
            <div>
              <div id="relation1" style="width: 100%; height: 1000px;"></div>
            </div>
          </el-card>

          <el-card class="box-card" shadow="hover">
            <h3 class="subtitle">内部网络</h3>
            <el-divider class="subtitle-line"></el-divider>
            <div>
              <div id="relation2" style="width: 100%; height: 1000px;"></div>
            </div>
          </el-card>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import * as echarts from 'echarts';

export default {
  name: 'EntityInstitute',
  components: {
  },

  data() {
    return {
      id: '',

      entityInstituteInfo: {
        "instituteImgName": "225px-Emblem_of_the_Kuomintang.svg.png",
        "abstract": `中国国民党，简称国民党，是中华民国主要政党之一，也是目前中华民国的最大在野党及立法院第二大党，现任党主席为立法委员江启臣，另有永久中国国民党总理孙中山、永久中国国民党总裁蒋中正。国民党最初前身为1894年11月24日成立于夏威夷共和国檀香山的革命团体兴中会，后先后改组为中国同盟会、国民党和中华革命党，1919年10月10日经孙中山于上海法租界改组而改用现名。从1928年国民政府完成国民革命军北伐并在形式上统一中国起，该党曾是中华民国长期掌权的执政党，直到2000年总统选举落败而首次成为在野党，2008年到2016年二度执政，2016年总统选举败选后二度在野至今。以该党为首的泛蓝阵营，与以民主进步党为首的泛绿阵营并列为中华民国两大政治势力。`,

        "name": "民主进步党",
        "name_cht": "民主進步黨",
        "foundDate": "1986-09-28",
        "predecessor": "党外运动",
        "subordinate": [
            "民主进步党青年发展部",
            "台湾青年民主联盟"
        ],
        "core": [
            "全国代表大会",
            "中央执行委员会"
        ],
        "member": "约21万",
        "leaders": {
            "1986~1987": "江鹏坚 第一届主席",
            "1987~1988": "姚嘉文 第二届党主席",
            "1988~1991": "黄信介 第三届党主席",
            "1991~1993": "许信良 第五届党主席",
            "1994~1996": "施明德 第六届党主席",
            "1996~1996": "張俊雄 第六届代理党主席",
            "1996~1998": "许信良 第七届党主席",
            "1998~2000": "林义雄 第八届党主席",
            "2000~2002": "谢长廷 第九届党主席",
            "2002~2005": "陈水扁 第十屆黨主席",
            "2005~2005": "吕秀莲 第十一届代理黨主席",
            "2005~2006": "蘇貞昌 第十一屆黨主席",
            "2006~2007": "游錫堃 第十二屆黨主席",
            "2007~2008": "陈水扁 第十二屆黨主席",
            "2008~2008": "謝長廷 第十二屆代理黨主席",
            "2008~2012": "蔡英文 第十二、十三屆黨主席",
            "2012~2014": "蘇貞昌 第十四屆黨主席",
            "2014~2018": "蔡英文 第十五屆黨主席",
            "2018~2019": "林右昌 第十六屆代理黨主席",
            "2019~2020": "卓荣泰 第十六屆黨主席",
            "2020~今": "蔡英文 第十七屆黨主席"
        },
        "factions": {
            "美丽岛系": "1984年党外公政会（美丽岛系predecessor）成立。曾与新潮流系一起是建党之初的两大派系，黄信介创办《美丽岛杂志》，同年因美丽岛事件被捕入狱。以黄信介、许信良、施明德等美丽岛事件当事人为代表，但随着1996年之后施明德竞选立法院长失败、许信良的退党以及1999年黄信介逝世等因素而逐渐没落，其成员后来转入新世纪办公室或新动力办公室。",
            "新潮流系": "1983年党外编联会（新潮流系predecessor）成立。从民进党成立之前就存在的派系，以《新潮流杂志》的编采与撰稿人为班底组成，该派系早年的主要政纲为中间偏左、群众运动路线以及社会民主，近年则以务实为导向；明确的政纲与强而有力的派系纪律，使该派系成为党内最具实力的派系。代表人物有前任行政院副院长的邱义仁、前台湾证交所董事长吴乃仁、前立法委员洪奇昌等。",
            "福利国连线": "代表人物由前民进党主席暨前行政院院长谢长廷、前海基会董事长张俊雄等人。1992年谢长廷结合尤清、苏贞昌、姚嘉文成立福利国连线，2006年解散后，内部分裂为以谢长廷为首的“谢系”及以苏贞昌为首的“苏系”",
            "正义连线": "1992年由陈水扁所创，是陈水扁在党内的主要力量，除了陈之外，还有前立法委员沈富雄、高志鹏等人。",
            "新世纪国会办公室": "以前任海基会副秘书长、民进党的建党元老之一张俊宏为领军。",
            "新动力国会办公室": "1999年许荣淑结合剩余美系山头成立“新动力办公室”",
            "绿色友谊连线": "2004年以陈胜宏为首，召集过去部分美系人马成立“绿色友谊连线”",
            "主流联盟": "2000年陈水扁掌权后，蔡同荣结合福利国连线、正义连线及新世纪、新动力部分等势力，形成松散的主流联盟",
            "台独联盟": "主要是1998年后返台的海外“台独”人士，以前行政院环保署署长李应元为代表。1978年“台湾党外助选团”成立，1987年改名为“台湾独立建国联盟”，1988年独盟返台，逐渐形成党内第三势力，1996年底，独盟主张激进台独另组建国党",
            "一边一国连线": "2010年由陈致中主导组成“一边一国连线”以许添财及陈唐山和陈致中为首的次团。",
            "正常国家促进会": "简称“正国会”，由原本游锡堃所领导的游系改组，并与谢系等友好派系所属成员共同合作，为现今仅次于新潮流系的第二大派系。目前主要领导人为前中华民国交通部部长林佳龙，兼任台湾智库董事长，两者关系密切。2016大选后，主要由游系改组而成，并与谢系合作而形成的新兴派系",
            "新未来智库": "2016大选后，由苏系立委及幕僚团队所组成。起先是由苏系立委成立联合问政办公室和长期与苏贞昌友好的幕僚智囊筹组新未来智库，也延续苏系长期与新系友好合作的情势。",
            "涌言会": "以三立电视董事长林崑海为代表的政治联盟组织，值得一提是林崑海本人并没有民主进步党党籍，以立委王定宇、前三立主播、现任立委林楚茵为代表，是民主进步党少数蓝绿通吃的派系，曾在2018年民主进步党中常委选举与英派联手。"
        },
        "webSite": {
            "官网": "https://www.dpp.org.tw/",
            "facebook": "https://www.facebook.com/dpptw",
            "twitter": "https://twitter.com/DPPonline"
        },

        "relationNet": {
          "mainNode": {
              name: "中国国民党",
              des: "机构名"
          },

          "otherNodes": [
            {
              name: "兴中会",
              des: "中华民国主要政党之一"
            },
            {
              name: "国家政策研究基金会",
              des: "台湾地方派系"
            },
            {
              name: "中国国民党青年团",
              des: "台湾地区名"
            },
            {
              name: "革命实践研究院",
              des: "政治地位"
            },
            {
              name: "泛蓝",
              des: "大学"
            },
            {
              name: "国际民主联盟",
              des: "中国国民党籍政治人物"
            },
            {
              name: "亚太民主联盟",
              des: "主席就任日期"
            }
          ],

          "links": [
            {
              source: "中国国民党",
              target: "兴中会",
              value: "前身"
            },
            {
              source: "中国国民党",
              target: "国家政策研究基金会",
              value: "智库"
            },
            {
              source: "中国国民党",
              target: "中国国民党青年团",
              value: "青年组织"
            },
            {
              source: "中国国民党",
              target: "革命实践研究院",
              value: "教育组织"
            },
            {
              source: "中国国民党",
              target: "泛蓝",
              value: "国内组织"
            },
            {
              source: "中国国民党",
              target: "国际民主联盟",
              value: "国际组织"
            },
            {
              source: "中国国民党",
              target: "亚太民主联盟",
              value: "区域组织"
            }
          ]
        },

        "innerNet": {
          "mainNode": {
              name: "中国国民党",
              des: "人名"
          },

          "otherNodes": [
            {
              name: "孙中山",
              des: "中华民国主要政党之一"
            },
            {
              name: "蒋中正",
              des: "台湾地方派系"
            },
            {
              name: "江启臣",
              des: "台湾地区名"
            },
            {
              name: "李乾龙",
              des: "政治地位"
            },
            {
              name: "李彦秀",
              des: "大学"
            },
            {
              name: "费鸿泰",
              des: "中国国民党籍政治人物"
            },
            {
              name: "郑丽文",
              des: "主席就任日期"
            }
          ],

          "links": [
            {
              source: "中国国民党",
              target: "孙中山",
              value: "总理"
            },
            {
              source: "中国国民党",
              target: "蒋中正",
              value: "总裁"
              // des: "中国国民党有关诗词中最出名的诗篇"
            },
            {
              source: "中国国民党",
              target: "江启臣",
              value: "主席"
            },
            {
              source: "中国国民党",
              target: "李乾龙",
              value: "秘书长"
            },
            {
              source: "中国国民党",
              target: "李彦秀",
              value: "副秘书长"
            },
            {
              source: "中国国民党",
              target: "费鸿泰",
              value: "立法院党团总召集人"
            },
            {
              source: "中国国民党",
              target: "郑丽文",
              value: "立法院党团书记长"
            }
          ]
        }
      }
    }
  },

  created() {
    this.fetchData()
  },

  mounted () {
    console.log(this.id)
    this.axios.get('/entityInstitute/' + this.id).then(response => {
      this.entityInstituteInfo = response.data;
      // console.log(this.entityInstituteInfo);
    });

    this.drawChart();
  },

  watch:{
    '$route': 'fetchData'
  },   

  methods: {
    fetchData () {
      this.id = this.$route.params.id
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById("relation1"));
      // 指定图表的配置项和数据
      let option1 = {
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
                name: this.entityInstituteInfo.relationNet.mainNode.name,
                descripion: this.entityInstituteInfo.relationNet.mainNode.des,
                symbolSize: 100,
                //节点图形的样式
                itemStyle: {
                  color: "#900"
                }
              }
            ].concat(this.entityInstituteInfo.relationNet.otherNodes),

            links: this.entityInstituteInfo.relationNet.links
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);


      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById("relation2"));
      // 指定图表的配置项和数据
      let option2 = {
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
                name: this.entityInstituteInfo.innerNet.mainNode.name,
                descripion: this.entityInstituteInfo.innerNet.mainNode.des,
                symbolSize: 100,
                //节点图形的样式
                itemStyle: {
                  color: "#900"
                }
              }
            ].concat(this.entityInstituteInfo.innerNet.otherNodes),

            links: this.entityInstituteInfo.innerNet.links
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option2);
    }
  }
}
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

.institute-column {
  font-size: 16px;
  font-weight: bold;
  width: 20%;
  height: 30px;
  border: 1px solid #333;
}

.institute-value {
  font-size: 16px;
  width: 100%;
  height: 30px;
  border: 1px solid #333;
}

.institute-table-list {
  text-align: left;
  margin-left: 30px;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.outlinkValue {
  font-size: 12px;
  width: 100%;
  height: 30px;
  border: 1px solid #333;
}

.EntityInstitute {
  width: 960px;
  margin: 0 auto;
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

.intro-text-block {
  padding: 20px !important;
  margin-bottom: 15px;
  margin-right: 15px;
}

.grid-content {
  background: transparent;
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
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
  margin-bottom: 20px !important;
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
</style>