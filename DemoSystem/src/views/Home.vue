<template>
  <div class="home">
    <h1 class="slogan">最快最全 台海信息聚合平台</h1>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content">
          <h2 class="title">热点事件</h2>
          <el-divider class="title-line"></el-divider>
          <el-carousel :interval="5000" type="card" height="220px">
            <!-- <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item> -->

            <el-carousel-item>
              <el-row>
                <el-col :span="24">
                  <el-col :span="12" class="card-col" style="width: 600px">
                  <div class="event_box">
                    <h2
                      class="title"
                      @click="
                        this.$router.push({
                          name: 'Event',
                          params: { id: eventList[0].eid },
                        })
                      "
                    >
                      {{ eventList[0].abstractText.split('，')[0] }}
                      <!-- {{ eventList[0].abstractText.substr(0,20)+"..." }} -->
                    </h2>
                    <el-divider class="title-line"></el-divider>
                  </div>
                  </el-col>
                  <el-col :span="12" class="">
                    <el-image 
                      style="width: 240px; height: 220px" 
                       :src="imgURL_1"
                    ></el-image>
                  </el-col>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row>
                <el-col :span="24">
                  <el-col :span="12" class="card-col" style="width: 600px">
                  <div class="event_box">
                    <h2
                      class="title"
                      @click="
                        this.$router.push({
                          name: 'Event',
                          params: { id: eventList[1].eid },
                        })
                      "
                    >
                      {{ eventList[1].abstractText.split('，')[1] }}
                      <!-- {{ eventList[1].abstractText.substr(1,20)+"..." }} -->
                    </h2>
                    <el-divider class="title-line"></el-divider>
                  </div>
                  </el-col>
                  <el-col :span="12" class="">
                    <el-image 
                      style="width: 240px; height: 220px" 
                       :src="imgURL_2"
                    ></el-image>
                  </el-col>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row>
                <el-col :span="24">
                  <el-col :span="12" class="card-col" style="width: 600px">
                  <div class="event_box">
                    <h2
                      class="title"
                      @click="
                        this.$router.push({
                          name: 'Event',
                          params: { id: eventList[2].eid },
                        })
                      "
                    >
                      {{ eventList[2].abstractText.split('，')[2] }}
                      <!-- {{ eventList[2].abstractText.substr(2,20)+"..." }} -->
                    </h2>
                    <el-divider class="title-line"></el-divider>
                  </div>
                  </el-col>
                  <el-col :span="12" class="">
                    <el-image 
                      style="width: 240px; height: 220px" 
                       :src="imgURL_3"
                    ></el-image>
                  </el-col>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel></div
      ></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="16"
        ><div class="grid-content list">
          <h2 class="title">热点文章</h2>
          <el-divider class="title-line"></el-divider>
          <div v-for="item in articleList" :key="item.id">
            <el-card class="box-card" shadow="hover">
              <h3
                @click="
                  this.$router.push({
                    name: 'Article',
                    params: { id: item.id },
                  })
                "
              >
                {{ item.title }}
              </h3>
              <p>{{ item.content.substr(0,60) }}……</p>
            </el-card>
          </div>
          <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content list">
          <h2 class="title">热点实体</h2>
          <el-divider class="title-line-short"></el-divider>
          <div v-for="item in entityList" :key="item.id">
            <el-card class="box-card" shadow="hover">
              <h5
                @click="
                  this.$router.push({
                    name: 'EntityPerson',
                    params: { id: item.id },
                  })
                "
              >
                {{ item.name }}
              </h5>
            </el-card>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      eventList: [
        {abstractText:'',eid:''},
        {abstractText:'',eid:''},
        {abstractText:'',eid:''}
      ],
      entityList: [
        { id: "Q233984", name: "蔡英文" },
        { id: "Q8279603", name: "江启臣" },
        { id: "Q19216", name: "马英九" },
        { id: "Q8274029", name: "洪秀柱" },
      ],
      articleList: [],
      imgURL_1: '',
      imgURL_2: '',
      imgURL_3: '',
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.axios
    .get('/article/latest')
    .then(response => {
      this.articleList = response.data;
      console.log(this.articleList)
    })

    this.axios
    .get('/event/latest')
    .then(response => {
      this.eventList = response.data;
      console.log(this.eventList)
      this.imgURL_1 = 'data:image/png;base64,' + this.eventList[0].relatedImgList[0];
      this.imgURL_2 = 'data:image/png;base64,' + this.eventList[1].relatedImgList[0];
      this.imgURL_3 = 'data:image/png;base64,' + this.eventList[2].relatedImgList[0];
    })
  },
};
</script>

<style>
.home {
  width: 960px;
  margin: 0 auto;
}

.slogan {
  color: rgba(80, 80, 80, 1);
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
  margin-top: 90px;
  margin-bottom: 30px;
  text-align: center;
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
.card-col {
  padding: 0px;
}
.grid-content {
  background: transparent;
  border-radius: 4px;
  min-height: 36px;
  padding: 10px;
}
.list {
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 2px;
  padding: 30px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.title {
  margin: 0;
  color: rgba(80, 80, 80, 1);
}

.title-line {
  margin-top: 5px !important;
  margin-bottom: 20px !important;
  width: 150px !important;
  background: rgb(175, 175, 175) !important;
}

.title-line-short {
  margin-top: 5px !important;
  margin-bottom: 20px !important;
  width: 150px !important;
  background: rgb(175, 175, 175) !important;
}

.el-carousel {
  padding-top: 0px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

div.is-active {
  box-shadow: 0px 5px 12px 0px rgba(150, 150, 150, 0.5);
}

.box-card {
  margin-bottom: 20px;
  color: rgba(80, 80, 80, 1);
}

.el-pagination {
  text-align: center;
}
.box-card h3,
h5 {
  cursor: pointer;
}
.home .event_box {
  margin: 0px;
}
</style>