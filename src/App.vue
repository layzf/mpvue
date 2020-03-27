<script>
import {login} from './utils/login'
let util = new login();
export default {
  created () {
    util.wxLogin();
    //util.getPhotoScope();
  },
  getSysInfo(){
    return wx.getSystemInfoSync();
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
  background-color: #fcfcfc;
}
.none{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
}
.none image{
  width: 100rpx;
  height: 100rpx;
}
.none text{
  font-size: 28rpx;
  padding-top: 10rpx;
}
.tip{
  position: absolute;

}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
