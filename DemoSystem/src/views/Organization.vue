<template>
  <div class="EEG">

      <!-- <div id="EEG" style="width:90%;height:600px;"></div> -->


        <div class='GraphSpace'>
        <div id="EEG" style="width:90%;height:1000px;"></div>
        </div>

      


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

.EEG .GraphSpace{
  background-color: #fff;
  border:1px solid #ced4da;
  border-radius:.25rem;
  margin-right: 5px;
  margin-left: 5px;
}

</style>
<script>
import * as echarts from 'echarts';

export default {
  name: 'Search',
  components: {
    
  },
  // 用于设定checkbox初始选项
  data () {
    return {
    graph_data:'',
    };
  },
  methods:{
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("EEG"));
      myChart.hideLoading();
      console.log(this.graph_data[0])
      this.graph_data[0].children.forEach(function (datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
            trigger: 'item',
            formatter(params){
              console.log(params)
              var return_str = '';
              for(var i=0;i<params.data.desc.length;i++){
                return_str += params.data.desc[i]+'<br>'
              }
              return return_str;
            },
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: this.graph_data,

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                roam: true,
                symbolSize: 7,

                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 15
                },

                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },

                emphasis: {
                    focus: 'descendant'
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.graph_data = require('../assets/Organization.json');


    this.drawChart();
    

  }

}
</script>
