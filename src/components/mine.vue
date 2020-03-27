<template>
    <div class="home" :style="{height:(info.windowHeight)+'px',width:(info.screenWidth*0.8)+'px'}" v-if="data">
      <header>
        <div class="avar">店长</div>
        <div class="h_daturn">
          <div class="h_identity">
            <span>{{data.user_name}}</span>
            <div class="icon">店长</div>
          </div>
          <span class="h_phone">{{data.mobile}}</span>
        </div>
      </header>
      <div class="content">
        <div class="c_item">
          <span class="c_i_title">商户名称:</span>
          <span class="c_i_content">{{data.brands}}</span>
        </div>
        <div class="c_item">
          <span class="c_i_title">经营产品:</span>
          <span class="c_i_content">{{data.business_name}}</span>
        </div>
        <div class="c_icon">
          <div class="icon">商家</div>
          <div class="icon">导购</div>
        </div>
        <div class="c_icon">
          <div class="avar">商家</div>
          <div class="avar">导购</div>
        </div>
      </div>
      <div class="foot" @click="logout">
        退出登录
      </div>
    </div>
</template>

<script>
  export default {
    name: "mine",
    props:['data'],
    data(){
      return{
        info:wx.getSystemInfoSync(),
      }
    },
    watch:{
      data(val){
        this.data = val;
      }
    },
    methods:{
      logout(){
        this.api.logout();
      }
    },
  };
</script>

<style lang="scss">
  $color: #FF5D22;
  .avar{
    width: 60px;
    height: 60px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    background-color: $color;
    border-radius: 60px;
    text-align: center;
    line-height: 60px;
  }
  .icon{
    color: rgba(250,93,24,0.4);
    border: 0.5px solid rgba(250,93,24,0.4);
    padding: 0 4px;
    display: inline-block;
    font-size: 12px;
    margin-left: 4px;
  }
  .home{
    height: 200px;
    background-color: #ffffff;
    header{
      display: flex;
      font-size: 14px;
      align-items: center;
      padding-top: 40px;
      padding-left: 10px;
      .h_daturn{
        padding-left: 6px;
        .h_identity{
          padding-bottom: 3px;
          color: #333333;
        }
        .h_phone{
          color: #666666;
        }
      }
    }
    .content{
      margin-top: 40px;
      .c_item{
        font-size: 14px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 10px;
        .c_i_title{
          color: #999999;
        }
        .c_i_content{
          color: #333333;
          padding-left: 10px;
          padding-top: 4px;
        }
      }
      .c_icon{
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 90%;
        margin-top: 20px;
      }
    }
    .foot{
      width: 90%;
      height: 40px;
      color: $color;
      border: 1px solid $color;
      background-color: rgba(250,93,24,0.1);
      border-radius: 10px;
      font-size: 14px;
      margin: 40px auto 0 auto;
      text-align: center;
      line-height: 40px;
    }
  }
</style>
