<template>
  <div class="box">
    <el-backtop target=".box" bottom="80" right="100"></el-backtop>
    <el-container>
      <el-header>
        <div class="logo">
          <h1>Acalligence 科技情报分析系统</h1>
        </div>
        <div class="menu">
          <el-menu
            :default-active="0"
            class="el-menu-demo"
            background-color="#465c8b"
            text-color="#bababa"
            active-text-color="#eaeaea"
            mode="horizontal"
            router="true"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/Search">搜索</el-menu-item>
            <el-menu-item index="/EventEvolutionaryGraph"
              >事理图谱</el-menu-item
            >
            <!-- <el-menu-item index="/Organization">政府组织架构</el-menu-item> -->
            <el-menu-item index="/SixDegrees">六度搜索</el-menu-item>
            <!-- <el-popover trigger="hover" content="正在开发中，敬请期待"
              ><template #reference>
                <el-menu-item index="3" disabled="true">六度搜索</el-menu-item>
              </template></el-popover
            > -->
            <!-- <el-popover trigger="hover" content="正在开发中，敬请期待"><template #reference>
              <el-menu-item index="4" disabled=true>问答</el-menu-item>
            </template></el-popover> -->
          </el-menu>
        </div>
        <div class="content">联系我们</div>
        <el-input
          size="small"
          placeholder="快速查找实体"
          prefix-icon="el-icon-search"
          v-model="quickQuery"
        >
        </el-input>
      </el-header>
      <el-main>
        <div class="header_space"></div>
        <router-view v-slot="{ Component }">
          <keep-alive include="SearchResult">
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <div class="footer_space"></div>
      </el-main>
      <el-footer>
        <div class="footer_content">
          北京邮电大学 计算机学院 数据科学与服务中心<br />联系方式 00000000
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 引入组件
// 声明组件
export default {
  name: "App",
  components: {},
  data() {
    return {
      quickQuery: "",
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.box {
  height: 100%;
  overflow-x: hidden;
}

.el-main {
  padding: 0 !important;
}
.el-header {
  padding: 0 90px !important;
  width: 100%;
  height: 80px !important;
  background-color: #465c8b;
  line-height: 150%;
  box-shadow: 0px 5px 10px 0px rgba(150, 150, 150, 0.5);
  text-align: center;
  position: fixed;
  z-index: 999;
}
.header_space {
  height: 80px;
}
.logo {
  height: 100%;
  text-align: center;
  color: #eaeaea;
  float: left;
  display: flex;
  align-items: center;
}
.content {
  width: 57px;
  height: 100%;
  float: right;
  color: #eaeaea;
  font-size: 12px;
  margin-left: 25px;
  display: flex;
  align-items: center;
}
.el-header .el-input {
  display: block;
  width: 140px;
  height: 100%;
  float: right;
  align-items: center;
  text-indent: 2px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.el-header .el-input input {
  border-radius: 50vh;
  background-color: #f7f7f7;
}
.menu {
  height: 100%;
  text-align: center;
  float: left;
  display: flex;
  align-items: center;
  margin-left: 80px;
}
.el-menu {
  height: 80px !important;
}
.menu ul li {
  line-height: 80px !important;
  height: 80px !important;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
.el-footer {
  height: 100px !important;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(90, 90, 90, 0.75);
  font-size: 12px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
}
.footer_content {
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  line-height: 150%;
  text-align: center;
}
.footer_space {
  height: 100px;
  margin-top: 80px;
}

.el-container {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  position: relative;
}
</style>
