<template>
  <div class="Event">
    <el-row>
      <el-col :span="24"><div class="grid-content">
        <h2 class="title" v-if="eventInfo.abstractText">事件 - {{ eventInfo.abstractText.split('，')[0] }}</h2>
        <el-divider class="title-line"></el-divider>
        <el-col :span="20" class="entity-col" ><div class="main-text">
          <p>{{ eventInfo.abstractText }}</p>
          </div></el-col>
          
        <!-- 如果未来需要展示事件图片 -->
        <!-- <el-col :span="18" class="entity-col">
          <div>
            <el-image style="width: 270px; height: 270px" :src="pic"></el-image>
          </div>
        </el-col> -->

        </div></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="24"><div class="grid-content list">
        <h2 class="subtitle">相关文章</h2>
        <el-divider class="subtitle-line"></el-divider>
        <el-card v-for="item in relatedArticle" :key="item.id" class="box-card" shadow="hover">
          <h3 @click="this.$router.push({name:'Article',params:{id:item.id}})">{{ item.title }}</h3>
          <p v-if="item.keywords">
          主题：{{ item.theme }}<br><br>
          关键词：{{ item.keywords.join(' ') }}<br><br>
          {{ item.content.substr(0,100)+'...' }}
          </p>
          <br>
          <p>{{item.time}}</p>
        </el-card>
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
 const pic = require('../assets/鲑鱼之乱.jpg');

export default {
  name: 'Event',
  components: {
  },
  data () {
    return {
      pic,
      type: 0,
      eid:'',
      entityInfo:[],
      relatedArticle:[],
      timeData:null,

      eventInfo:[],
      articleInfo: []
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  // 在mounted中获取数据
  mounted () {
    this.axios
    .get('/event/'+this.eid)
    .then(response => {
      this.eventInfo = response.data;
      console.log(this.eventInfo)
    })
    this.axios
    .get('/article/event/'+this.eid)
    .then(response => {
      this.relatedArticle = response.data;
      console.log(this.relatedArticle)
    })

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.eid = this.$route.params.id
      console.log(this.eid)
    }
  }
}
</script>

<style>
  .Event {
    width: 960px;
    margin: 0 auto;
  }

  .Event .slogan {
	color: rgba(80, 80, 80, 1);
	font-size: 35px;
	font-weight: bold;
	font-style: italic;
    margin-top: 90px;
    margin-bottom: 30px;
    text-align: center;
  }

  .Event .el-row {
    margin-bottom: 30px;
  }
  .Event .el-col {
    border-radius: 4px;
  }
  .Event .entity-col {
    padding: 0 !important;
    margin-bottom: 15px;
    margin-right: 15px;
  }
  .Event .main-text {
    padding: 20px !important;
    margin-top: 0px;
    margin-left: 30px;
    margin-right: 40px;
  }
  .Event .grid-content {
    background: transparent;
    border-radius: 4px;
    min-height: 36px;
    padding: 10px;
  }
  .Event .list {
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 30px;
  }
  .Event .row-bg {
    padding: 10px;
    background-color: #f9fafc;
  }

  .Event .title {
    margin-top: 70px;
    margin-bottom: 20px;
    color: rgba(80, 80, 80, 1)
  }
  .Event .subtitle {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    color: rgba(80, 80, 80, 1)
  }

  .Event .title-line {
    margin-top: 5px !important;
    margin-bottom: 20px !important;
    width: 300px !important;
    background: rgb(175, 175, 175) !important;
  }
  .Event .el-divider .el-divider--horizontal .subtitle-line {
    text-align: center !important;
    margin-top: 0px !important;
    margin-bottom: 20px !important;
    width: 1500px !important;
    background: rgb(175, 175, 175) !important;
  }

  div.is-active {
    box-shadow: 0px 5px 12px 0px rgba(150, 150, 150, 0.5);
  }

  .Event .box-card {
    padding: 35px;
    margin-bottom: 20px;
    color: rgba(80, 80, 80, 1);
  }

  .Event .el-pagination {
    text-align: center;
  }
</style>