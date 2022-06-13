<template>
  <div class="Article">
    <el-row>
      <el-col :span="24"><div class="grid-content">
        <h2 class="title">文章 - {{articleInfo.title}}</h2>
        <el-divider class="title-line"></el-divider>
        <el-card class="box-card" shadow="hover" v-if="articleInfo">
          <h3 class="subtitle">{{ articleInfo.title }}</h3>
          <h5 class="subtitle">&#128101;{{ articleInfo.theme }}     &#128197;{{ articleInfo.time }} </h5>
          <h5 class="subtitle">{{ articleInfo.keywords.join(' ') }}</h5>
          <el-divider class="subtitle-line"></el-divider>
          <el-col :span="24" class="entity-col">
            <div class="main-text" v-if="articleInfo.content">
              <p v-for="item in articleInfo.content.split('\\n')" :key="item.id">
                {{ item }}<br>
              </p>
              <p>
                <a :href="articleInfo.url" style="color:grey;font-size=16px">原文链接</a>
              </p>
            </div></el-col>
        </el-card>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
  import VueWordCloud from 'vuewordcloud';
// @ is an alias to /src

export default {
  name: 'Article',
  components: {
      [VueWordCloud.name]: VueWordCloud
  },
  data () {
    return {
      id:'',
      type: 0,
      query: '',
      info:null,
      timeData:null,
      articleInfo:''

    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  mounted () {
    console.log(this.id)
    this.axios
    .get('/article/'+this.id)
    .then(response => {
      this.articleInfo = response.data;
      console.log(this.eventInfo)
    })
  },
  methods: {
    fetchData () {
      this.id = this.$route.params.id
  }
}
}
</script>

<style>
  .Article {
    width: 960px;
    margin: 0 auto;
  }

  .Article .slogan {
	color: rgba(80, 80, 80, 1);
	font-size: 35px;
	font-weight: bold;
	font-style: italic;
    margin-top: 90px;
    margin-bottom: 30px;
    text-align: center;
  }

  .Article .el-row {
    margin-bottom: 30px;
  }
  .Article .el-col {
    border-radius: 4px;
  }
  .Article .entity-col {
    padding: 0 !important;
    margin-bottom: 15px;
    margin-right: 15px;
  }
  .Article .main-text {
    padding: 10px !important;
    margin-top: 0px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .Article .grid-content {
    background: transparent;
    border-radius: 4px;
    min-height: 36px;
    padding: 10px;
  }
  .Article .list {
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 30px;
  }
  .Article .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .Article .title {
    margin-top: 70px;
    margin-bottom: 20px;
    color: rgba(80, 80, 80, 1)
  }
  .Article .subtitle {
    text-align: center !important;
    margin-top: 20px;
    margin-bottom: 0px;
    color: rgba(80, 80, 80, 1)
  }

  .Article .title-line {
    margin-top: 5px !important;
    margin-bottom: 20px !important;
    width: 300px !important;
    background: rgb(175, 175, 175) !important;
  }
  .Article .el-divider .el-divider--horizontal .subtitle-line {
    text-align: center !important;
    margin-top: 0px !important;
    margin-bottom: 20px !important;
    width: 150px !important;
    background: rgb(175, 175, 175) !important;
  }

  div.is-active {
    box-shadow: 0px 5px 12px 0px rgba(150, 150, 150, 0.5);
  }

  .Article .box-card {
    margin-bottom: 20px;
    color: rgba(80, 80, 80, 1);
  }

  .Article .el-pagination {
    text-align: center;
  }
</style>