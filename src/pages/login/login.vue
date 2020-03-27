<template>
    <div class="login" :style="{height:height+'px'}">
      <header>
        <div class="l_head">
          <img class="l_h_icon" src="../../assets/images/logo@2x.png"/>
          <span>商户端</span>
        </div>
      </header>
      <div class="l_content">
          <div class="l_c_item">
            <img class="l_img" src="../../assets/images/phone.png"/>
            <input v-model="inputData.phone" type="number" placeholder="请输入您的手机号"/>
          </div>
          <div class="l_c_item">
            <img class="l_img" src="../../assets/images/code.png" />
            <input type="number" v-model="inputData.code" placeholder="请输入收到的验证码"/>
            <div class="code" @click="code.canUse?getCode():''">{{code.txt}}</div>
          </div>
      </div>
      <div class="l_btn" type="ghost" @click="loginToHome">登录</div>
      <i-toast id="toast" />
    </div>
</template>

<script>
  const { $Toast } = require('../../../static/dist/base/index');
  import {api} from '../../utils/api';

  let util = new api();
  export default {
    name: "login",
    data(){
      return{
        //二维码
        code:{
          txt:'获取验证码',
          time:60,
          canUse:true
        },
        //输入数据
        inputData:{
          phone:'',
          code:''
        },
        height:wx.getSystemInfoSync().windowHeight
      }
    },
    methods:{
      //获取验证码
      getCode(){
        let self = this;
        let code = this.$data.code;
        let data = this.$data.inputData;
        //验证手机号
        if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(data.phone))){
          $Toast({
            content:'请填写正确的手机号',
            type:'warning'
          })
          return false;
        }else{
          util.getCode(data.phone).then(res=>{
              $Toast({
                content:'获取验证码成功',
                type:'success'
              })
          }).catch(err=>{
            $Toast({
              content:'获取验证码失败',
              type:'warning'
            })
          })
        }
        if(code.canUse){
          let t = setInterval(()=>{
            if(code.time>0){
              code.time -= 1;
              code.txt = `剩余${code.time}秒`
              code.canUse = false;
              this.code = code;
            }else{
              code.txt = "获取验证码";
              code.time = 60;
              code.canUse = true;
              this.code = code;
              clearInterval(t)
            }
          },1000)
        }
      },
      //登陆
      loginToHome(){
        let self = this;
        let input = this.$data.inputData;
        let temp = null;
        if(!input.phone){
           temp = '请填写手机号码';
        }else if(!input.code){
           temp = '请填写验证码';
        }
        if(temp){
          $Toast({
            content:temp,
            type:'warning',
            duration:1000
          })
          return false;
        }
        util.login(input.phone,input.code).then(res=>{
            wx.setStorageSync('token', res.data.token);
            wx.setStorageSync('tokenId',res.data.tokenid);
            $Toast({
              content: '登录成功',
              duration:1000,
              type: 'success'
            });
            setTimeout(()=>{
              wx.reLaunch({
                url:'../home/main',
                success:function(){
                  self.$destroy();
                }
              })
            },1000)
        }).catch(err=>{
          console.log('err',err);
            $Toast({
              content: err.error,
              duration:1000,
              type: 'warning'
            });
        })
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/sass/login";
</style>
