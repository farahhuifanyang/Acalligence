<template>
  <div class="search">
    <h1 class="slogan">最快最全 台海信息聚合平台</h1>
    
    <!-- <img src="../assets/BUPT_logo.png"  height='250' alt=""> -->
    <el-input
    placeholder="请输入内容"
    @keydown.enter="search_way"
    v-model="query">
    <template #append>
        <el-button icon="el-icon-search" @click="search_way">
        </el-button>
    </template>
    </el-input>
    <el-radio-group v-model="radio">
      <el-radio :label="3">实体</el-radio>
      <el-radio :label="6">事件</el-radio>
      <el-radio :label="9">文章</el-radio>
    </el-radio-group>
    
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
.search{
  width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items:center;
}
.search .slogan {
  color: rgba(80, 80, 80, 1);
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin-top: 90px;
  margin-bottom: 30px;
  text-align: center;
}
.search .el-input{
  width: 650px;
	height: 40px;
	text-indent: 5px;
	font-size: 14px;
  margin-top: 50px;
  margin-bottom: 40px;
}
</style>
<script>
// 在这里引入组件
// 在这里声明组件
export default {
  name: 'Search',
  components: {
    
  },
  // 用于设定checkbox初始选项
  data () {
    return {
      radio: 3,
      query: this.radio
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

    }
  }

}
</script>
