<template>
  <div class="frameContainers">
    <header
      class="headNav"
      :style="{paddingTop:statusBarHeight+'px' ,height: navHeight + 'px' }">
      <div class="back_img"><img  :style="{height:(navHeight-18)+'px',width:(navHeight-14)+'px'}" src="../assets/images/icon_left.png"/></div>
      <div class="nav_title">自定义标题</div>
      <div class="search"><img  :style="{height:(navHeight-18)+'px',width:(navHeight-18)+'px'}" src="../assets/images/icon_search.png"/></div>
    </header>
  </div>
</template>

<script>
  import app from "../App"
  export default {
    name: "headFrame",
    data(){
      return{
        pixelRatio: app.getSysInfo().pixelRatio, //系统像素比
        statusBarHeight: app.getSysInfo().statusBarHeight, //系统状态栏高度
        navHeight: "", //顶部导航栏高度
        headAreaHeight:app.getSysInfo().pixelRatio * 35 / app.getSysInfo().pixelRatio, //顶部内容区域高度
        headAreaMarTop: "", //顶部内容区域外边距
        headleftBoxW: "", //顶部内容左侧区域外边距
        headRightBoxW: "", //顶部内容右侧区域外边距
        containersHeight: "", //页面内容区域高度
      }
    },
    mounted () {
      //IOS 与 安卓进行差异化处理
      if (app.getSysInfo().system.substring(0, 3) == "iOS") {
        this.navHeight = this.pixelRatio * 40 / this.pixelRatio;
        this.headAreaMarTop = this.pixelRatio * 0.5 / this.pixelRatio;
        this.headleftBoxW = app.getSysInfo().windowWidth - this.pixelRatio * 100 / this.pixelRatio;
        this.headRightBoxW = this.pixelRatio * 100 / this.pixelRatio;
        this.containersHeight = app.getSysInfo().windowHeight - (this.statusBarHeight + this.pixelRatio * 40 / this.pixelRatio);
      } else {
        this.navHeight = this.pixelRatio * 45 / this.pixelRatio;
        this.headAreaMarTop = this.pixelRatio * 2.5 / this.pixelRatio;
        this.headleftBoxW =  app.getSysInfo().windowWidth - this.pixelRatio * 110 / this.pixelRatio;
        this.headRightBoxW = this.pixelRatio * 110 / this.pixelRatio;
        this.containersHeight = app.getSysInfo().windowHeight -  (this.statusBarHeight + this.pixelRatio * 45 / this.pixelRatio);
      }
    }
  };
</script>

<style lang="scss">
  .frameContainers {
    .headNav {
      display: flex;
      align-items: center;
      border-top: 0.5px solid rgba(180,180,180,0.2);
      border-bottom: 0.5px solid rgba(180,180,180,0.2);
      .back_img{
        padding-left: 10px;
        display: flex;
      }
      .nav_title{
        font-size: 14px;
        text-align: center;
      }
      .search{
        padding-left: 40px;
        display: flex;
      }
    }
  }
</style>
