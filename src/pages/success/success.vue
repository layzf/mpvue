<template>
    <div class="success" :style="{height:height+'px'}">
        <div class="h_img">
          <img class="img" src="../../assets/images/icon_yycg@2x.png"/>
          <text class="txt">转单成功</text>
        </div>
        <div class="h_btn">
          <div class="continue" @click="scanCode">继续转单</div>
          <div class="finish" @click="finish">完成</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      height:null,
    }
  },
  methods: {
    //扫描二维码
    scanCode(){
      let self = this;
      wx.scanCode({
        success(res) {
          let code = res.result;
          self.api.scanCode(code).then(res=>{
            console.log('res',res);
            wx.navigateTo({
              url:'../writeSubscription/main?id='+res.data.so_id+'&user_id='+res.data.user_id
            })
          }).catch(err=>{
            $Toast({
              content:err.error,
              duration:1000
            })
          })
        }
      })
    },
    //完成
    finish(){
      wx.reLaunch({
        url:'../home/main'
      })
    }
  },
  mounted(){
    this.$data.height = wx.getSystemInfoSync().windowHeight;
  }
}
</script>

<style lang="scss">
.success{
  background-color: #f7f7f7;
  .h_img{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100rpx;
    padding-bottom: 100rpx;
    .img{
      width: 90rpx;
      height:90rpx;
    }
    .txt{
      color: #666666;
      font-size: 28rpx;
      padding-top: 34rpx;
    }
  }
  .h_btn{
    display: flex;
    justify-content: center;
    font-size: 28rpx;
    .continue{
      width: 240rpx;
      height: 68rpx;
      background-color: #FF5D22;
      color: #ffffff;
      text-align: center;
      line-height: 68rpx;
      margin-right: 20rpx;
    }
    .finish{
      width: 240rpx;
      height: 68rpx;
      background-color: #ffffff;
      color: #FF5D22;
      text-align: center;
      line-height: 68rpx;
      margin-left: 20rpx;
      border: 1px solid #FF5D22;
    }
  }
}
</style>
