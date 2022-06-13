<template>
  <div class="SearchResult">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <h2 class="title">搜索 - {{ type }} - {{ query_save }} </h2>
          <el-divider class="title-line"></el-divider>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="24"><div class="grid-content list">
        <h2 class="subtitle">相关内容</h2>
        <el-divider class="subtitle-line"></el-divider>
        <div v-if="type == '实体'">
          <div v-for="item in entityInfo" :key="item.id">
            <el-card  class="box-card" shadow="hover">
              <!-- <div v-if="item.id == 'Q233984'">
                <h3 @click="this.$router.push({name:'EntityPerson',params:{id:item.id}})">{{ item.name }}</h3>
              </div>
              <div v-else>
                <h3 @click="this.$router.push({name:'EntityPerson1',params:{id:item.id}})">{{ item.name }}</h3>
              </div> -->
              <h3 @click="this.$router.push({name:'EntityPerson',params:{id:item.eid}})">{{ item.name }}</h3>
              <p>{{ item.summary }}</p>
            </el-card>
          </div>
          
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
          </el-pagination>
        </div>
        <div v-else-if="type=='事件'">
          <div v-for="item in eventInfo" :key="item.eid">
            <el-card class="box-card" shadow="hover">
              <h3 @click="this.$router.push({name:'Event',params:{id:item.eid}})">{{ item.abstract.split('，')[0] }}</h3>
              <p>摘要<br>{{ item.abstract }}</p>
              <br>
              <p>{{ item.timestamp.split('.')[0].replace('T',' ') }}</p>
            </el-card>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
          </el-pagination>
        </div>
        <div v-else>
          <div v-for="item in articleInfo" :key="item.id">
            <el-card class="box-card" shadow="hover">
              <h3 @click="this.$router.push({name:'Article',params:{id:item.id}})">{{ item.title }}</h3>
              <p v-if="item.keywords">
              主题：{{ item.theme }}<br><br>
              关键词：{{ item.keywords.join(' ') }}<br><br>
              {{ item.content.substr(0,100)+'...' }}
              </p>
              <br>
              <p>{{item.time}}</p>
            </el-card>
          </div>
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
          </el-pagination> -->
        </div>


        
        </div></el-col>
    </el-row>
  </div>
</template>
<style>
  .SearchResult {
    width: 960px;
    margin: 0 auto;
  }

  .SearchResult .slogan {
	color: rgba(80, 80, 80, 1);
	font-size: 35px;
	font-weight: bold;
	font-style: italic;
    margin-top: 90px;
    margin-bottom: 30px;
    text-align: center;
  }

  .SearchResult .el-row {
    margin-bottom: 30px;
  }
  .SearchResult .el-col {
    border-radius: 4px;
  }
  .SearchResult .entity-col {
    padding: 0 !important;
    margin-bottom: 15px;
    margin-right: 15px;
  }
  .SearchResult .main-text {
    padding: 20px !important;
    margin-top: 0px;
    margin-left: 30px;
    margin-right: 40px;
  }
  .SearchResult .grid-content {
    background: transparent;
    border-radius: 4px;
    min-height: 36px;
    padding: 10px;
  }
  .SearchResult .list {
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 30px;
  }
  .SearchResult .row-bg {
    padding: 10px;
    background-color: #f9fafc;
  }

  .SearchResult .title {
    margin-top: 70px;
    margin-bottom: 20px;
    color: rgba(80, 80, 80, 1)
  }
  .SearchResult .subtitle {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    color: rgba(80, 80, 80, 1)
  }

  .SearchResult .title-line {
    margin-top: 5px !important;
    margin-bottom: 20px !important;
    width: 300px !important;
    background: rgb(175, 175, 175) !important;
  }
  .SearchResult .el-divider .el-divider--horizontal .subtitle-line {
    text-align: center !important;
    margin-top: 0px !important;
    margin-bottom: 20px !important;
    width: 1500px !important;
    background: rgb(175, 175, 175) !important;
  }

  div.is-active {
    box-shadow: 0px 5px 12px 0px rgba(150, 150, 150, 0.5);
  }

  .SearchResult .box-card {
    padding: 35px;
    margin-bottom: 0px;
    color: rgba(80, 80, 80, 1);
  }

  .SearchResult .el-pagination {
    text-align: center;
  }
  .SearchResult .box-card h3{
    cursor: pointer;

  }
</style>
<script>


export default {
  name: 'SearchResult',
  components: {
  },
  // 用于设定checkbox初始选项
  data () {
      return {
        type: 0,
        query: '',
        entityInfo:[],
        timeData:null,
        query_save:'',
        eventInfo:[],
        articleInfo: []
      };
    },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  beforeRouteEnter (to, from, next) {
    if(from.name!='EntityPerson'&&from.name!='Event'&&from.name!='Article')
    { 
        to.meta.ifDoFresh = true; 
    } 
    next(); 
  },
  activated(){ 
    console.log("activated")
    //开启了keepAlive:true后再次进入，以前的搜索条件和页数都不会变，无论什么情况都调用一下获取数据的接口，这样就能得到当前搜索条件和页数的最新数据
    if(this.$route.meta.ifDoFresh){
    //重置ifDoFresh
      this.$route.meta.ifDoFresh = false;
      //获取列表数据方法第一参数为是否重置搜索条件和页数
          this.getData();
      }else{
          console.log("stay")
      }
  },
  // 在mounted中获取数据
  mounted () {

    console.log("mounted")
    this.getData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      if (this.$route.params.type == 1){
        this.type = '实体'
      }
      else if(this.$route.params.type == 2){
        this.type = '事件'
      }
      else if(this.$route.params.type == 3){
        this.type = '文章'
      }
      this.query = this.$route.params.query
    },
    getData(){
      this.query_save = this.query
      if (this.type=='实体'){
        this.axios
          .get('/entity/celebrity/condition',{
              params: {
                'name': this.query
              },
          })
          .then(response => {
            this.entityInfo = response.data;
            console.log(this.entityInfo)
          })
      }
      else if (this.type == '事件'){
        this.axios
          .get('/event/',{
              params: {
                'keyword': this.query
              },
          })
          .then(response => {
            this.eventInfo = response.data;
            console.log(this.eventInfo)
            console.log(this.eventInfo[0].eid)

          })
      }
      else {
        this.axios
          .get('/article/condition',{
              params: {
                'keywords': this.query
              },
          })
          .then(response => {
            this.articleInfo = response.data;
            console.log(this.articleInfo)
          })
      }
    }
  }
  
}
</script>
