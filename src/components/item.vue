<template>
 <div>
    <div v-for='(arr,index) in data' :key="index"> 
      <div class="item">
          <div class="i_head">
            <div class="i_left">
              <!--<p class="l_phone">联系人姓名：{{data.link_name}} {{data.link_mobile}}</p>-->
              <!--<div class="left">-->
                <!--<img src="../assets/images/icon_dz@3x.png"/>-->
                <!--<span>{{data.village_name}} {{data.door_number}}</span>-->
              <!--</div>-->
              <div class="l_phone">{{arr.create_at}}</div>
            </div>
            <div class="i_right">{{arr.status}}</div>
          </div>
          <div class="i_content">
            <img-item :bg="true"
                      :data="arr"
                      @toDesc="toDesc">
            </img-item>
            <div class="i_foot" v-if=" arr.status=='待转单' || arr.status=='已转单'">
              <div class="i_btn looklist" @click="lookChangeOrder(arr.id)" v-if="arr.status=='已转单'">查看转单</div>

              <div class="i_btn" @click="turnData(arr.user_code,arr.mobile,arr.status)">{{arr.status=='已转单'?'再次转单':'转单'}}</div>
            </div>
          </div>
          <!-- <div class="i_foot">
            <input class="i_input" placeholder="在此输入转单码后转单"  @input="getCode"/>
            <div class="i_btn" @click="turnData(arr.user_code,arr.mobile)">转单</div>
          </div> -->
        </div>
  </div>

  <!--转单弹框-->
    <t-diago :hiddens="t_diago" @getTrue="getTrue" @getfalse="getfalse"></t-diago>
 </div>
    
</template>

<script>
  import imgItem from './imgItem';
  import tDiago from './diago';

  export default {
    props:['data','order','isSearch',"mobile",'item'],
    data(){
      return{
        t_diago:false,
        codeAndMobile:{
          code:'',
          mobile:''
        },
        newArr:[],
        code:'',//转单码
      }
    },
    components:{
      imgItem,
      tDiago
    },
    mounted(){
      this.newArr = this.$props.data
    },
    watch:{
        data(val){
           this.$data.newArr = val;
        }

    },
    methods:{
      //查看转单列表
      lookChangeOrder:function(e){
        wx.navigateTo({url:'../changeOrderList/main?id='+e})
      },
      //查看详情
      toDesc(e){
        wx.navigateTo({url:'../orderDetail/main?id='+e.id+'&code='+e.code+'&distinguishOrder='+false+''})
      },
      //转单
      turnData(user_code,mobile,status){
        this.codeAndMobile.code = user_code

        this.codeAndMobile.mobile = mobile

        if(status=='已转单'){
           let param = {
              userCode:user_code,
              mobile:mobile
           }
           this.FnCodeTure(param)
        }else{
          this.t_diago = true;
        }
       
      },
      //转单码弹框确认按钮
      getTrue:function(e){
        if(e != 4 && e !== this.codeAndMobile.code){
          wx.showToast({
            title: '转单码不正确',
            icon:'none'
          })
          return false;
        }

        this.t_diago = false
       
        let param = {
          userCode:e,
          mobile:this.codeAndMobile.mobile
        }
        this.FnCodeTure(param)

      },
 //校验转单码是否正确接口
     FnCodeTure:function(param){
 
       this.api.searchPhone(param).then(res=>{
            wx.navigateTo({
              url:'../writeSubscription/main?id='+res.data.so_id+'&user_id='+res.data.user_id
            })
        }).catch(err=>{
          wx.showToast({
            title: err.error
          })
        });

     },     
      getfalse:function(e){
        this.t_diago =  false
      }
    },
   
  };
</script>

<style lang="scss">
.looklist{
  margin-right: 16rpx;
}
  $fontColor: #ff5d22;
    .item{
      background-color: #ffffff;
      padding-top: 16px;
      margin-bottom: 10px;
      .i_head{
        display: flex;
        .i_left{
          display: flex;
          flex-direction: column;
          font-size: 13px;
          color: #666666;
          padding-left: 20px;
          .left{
            padding-top: 10px;
            flex: 1;
            display: flex;
            align-items: center;
            img{
              width:28rpx;
              height:34rpx;
              padding-top:2px;
              padding-right:4px;
            }
          }
        }
        .i_right{
          color: $fontColor;
          font-size: 16px;
          flex:1;
          text-align:right;
          padding-right: 20px;
          font-size: 15px;
        }
      }
      .i_content{
        padding-top: 15px;
        .i_c_btn{
          text-align: right;
          padding-right: 20px;
          font-size: 13px;
          padding-top: 18px;
          padding-bottom: 10px;
          .btn{
            display: inline-block;
            color: $fontColor;
            padding: 4px 8px;
            border: 1px solid $fontColor;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
          }
        }
      }
      .i_foot{
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(180,180,180,0.2);
        width:90%;
        margin:0 auto;
        display: flex;
        justify-content: flex-end;
       
        .i_btn{
          background-color:#ed3f14;
          color: #ffffff;
          font-size: 13px;
          padding: 4px 6px;
          border-radius: 4px;
          display: inline-block;
          height:20px;
          line-height:20px
        }
      }
    }
</style>
