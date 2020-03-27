<template>
    <div class="index" :style="{height:height+'px'}">
        <header>
          <!--<div class="i_head">-->
            <!--<img @click="scanCode" class="i_h_img" src="../../assets/images/scan.png"/>-->
            <!--<span>转单</span>-->
          <!--</div>-->
          <div class="i_top">
              <div class="i_t_title">
                <div class="title">
                  <img class="t_img" src="../../assets/images/shop.png"/>
                  <text v-if="user" class="t_text">{{user.shop_name}}</text>
                </div>
                <img @click="logout" class="t_img" src="../../assets/images/closebtn.png"/>
              </div>
          </div>
        </header>
        <div class="i_content">
          <div class="i_c_notice">
            <i-notice-bar
              icon="systemprompt"
              :background-color="'#ffffff'"
              loop>
              暂无公告
            </i-notice-bar>
          </div>
          <div class="i_c_func">

             <div class="i_c_item" @click="userCanCode">
              <img src="../../assets/images/icon_sys@2x.png"/>
              <span>扫码验证</span>
            </div>

            <div class="i_c_item" @click="scanCode">
              <img src="../../assets/images/icon_sys@2x.png"/>
              <span>扫码转单</span>
            </div>
            <div class="i_c_item" @click="naviTo" id="subscription">
              <img src="../../assets/images/subscription.png"/>
              <span>订金管理</span>
            </div>
            <div class="i_c_item" @click="naviTo" id="order" :shopId = 'shopid'>
              <img src="../../assets/images/order.png"/>
              <span>订单管理</span>
            </div>
          </div>
        </div>



      <div class="modelDiv">
        <navigator url="../orderList/main" hover-class="none" class="flexDis" >
          <div>
            <icon type="success" size="20" color="#FE8A62"/>
            <p>会员预约查询</p>
          </div>
          <img src="../../assets/images/iconfontjiantou5.png" alt="">
        </navigator>

         <navigator url="../goShoopTakeNotes/main" hover-class="none" class="flexDis" >
          <div>
            <icon type="success" size="20" color="#FE8A62"/>
            <p>到店记录查询</p>
          </div>
          <img src="../../assets/images/iconfontjiantou5.png" alt="">
        </navigator>

         <navigator url="../incomeDetailsList/main" hover-class="none" class="flexDis" >
          <div>
            <icon type="success" size="20" color="#FE8A62"/>
            <p>收入明细</p>
          </div>
          <img src="../../assets/images/iconfontjiantou5.png" alt="">
        </navigator>

<!--        <div class="flexDis">-->
<!--          <div>-->
<!--            <icon type="success" size="20" color="#FE8A62"/>-->
<!--            <p>收定金</p>-->
<!--          </div>-->
<!--          <img src="../../assets/images/iconfontjiantou5.png" alt="">-->
<!--        </div>-->

<!--        <div class="flexDis">-->
<!--          <div>-->
<!--            <icon type="success" size="20" color="#FE8A62"/>-->
<!--            <p>报价</p>-->
<!--          </div>-->
<!--          <img src="../../assets/images/iconfontjiantou5.png" alt="">-->
<!--        </div>-->
      </div>

      <!--业务情况-->
        <div class="BusinessSituation comCssTable">
           <div class="title">
             <h3>业务情况</h3>
           </div>
            <ul>
              <li @click="navGo(1,fasle)"><div>待转单</div><p class="firstP">{{businessSituation.wait_turn_sum?businessSituation.wait_turn_sum:0}}单</p></li>
              <li @click="navGo(1,true)"><div>待付款</div><p>{{businessSituation.wait_pay_sum?businessSituation.wait_pay_sum:0}}单</p><p>{{businessSituation.wait_pay_total_money?businessSituation.wait_pay_total_money:0}}元</p></li>
              <li @click="navGo(2,true)"><div>待交付</div><p>{{businessSituation.wait_deliver_sum?businessSituation.wait_deliver_sum:0}}单</p><p>{{businessSituation.wait_deliver_total_money?businessSituation.wait_deliver_total_money:0}}元</p></li>
              <li @click="navGo(3,true)"><div>待结账</div><p>{{businessSituation.wait_account_sum?businessSituation.wait_account_sum:0}}单</p><p>{{businessSituation.wait_account_total_money?businessSituation.wait_account_total_money:0}}元</p></li>
            </ul>
        </div>
<!--提现情况-->
        <div class="BusinessSituation comCssTable moneys">
           <div class="title">
             <h3>提现情况</h3>
               <navigator url="../cashWithdrawalList/main" hover-class="none" >
                 <div>
                    <span>详情</span>
                    <img src="../../assets/images/iconfontjiantou5.png" alt="">
                 </div>
              </navigator>
           </div>
           <div class="contnets">
              <div class="num">
                <div>
                  <p>待提现</p>
                  <div>{{CashSituationQuery.waitCashoutTotalMoney ? CashSituationQuery.waitCashoutTotalMoney : 0}}</div>
                </div>

                <div>
                  <p>申请中</p>
                  <div>{{CashSituationQuery.cashoutingTotalMoney ? CashSituationQuery.cashoutingTotalMoney : 0}}</div>
                </div>

                <div>
                  <p>已提现</p>
                  <div>{{CashSituationQuery.cashoutedTotalMoney ? CashSituationQuery.cashoutedTotalMoney : 0}}</div>
                </div>
              </div>
              <div class="Cash" @click="showModel">申请提现</div>
              
           </div>
        </div>
<!--增长情况-->
        <div class="BusinessSituation comCssTable up">
           <div class="title">
             <h3>增长情况</h3>
              <div>
                 <p :class="{'active':cur==1}" @click="changeDate(cur=1)">最近七天</p>
                 <p :class="{'active':cur==2}" @click="changeDate(cur=2)">最近一个月</p>
              </div>
           </div>
            <ul>
              <li ><div>新增订金单</div><p class="firstP">{{recordItemListAdd.new_growth_soinfo_sum?recordItemListAdd.new_growth_soinfo_sum:0}}单</p></li>
              <li ><div>退订金单</div><p class="firstP">{{recordItemListAdd.so_info_return_sum?recordItemListAdd.so_info_return_sum:0}}单</p></li>
              <li ><div>净增订金单</div><p class="firstP">{{recordItemListAdd.new_added_soinfo_sum?recordItemListAdd.new_added_soinfo_sum:0}}单</p></li>
              <li ><div>新增订单</div><p>{{recordItemListAdd.new_turn_soitem_sum?recordItemListAdd.new_turn_soitem_sum:0}}单</p><p>{{recordItemListAdd.new_turn_soitem_total_money?recordItemListAdd.new_turn_soitem_total_money:0}}元</p></li>
              <li ><div>退款单</div><p>{{recordItemListAdd.return_soitem_sum?recordItemListAdd.return_soitem_sum:0}}单</p><p>{{recordItemListAdd.return_soitem_total_money?recordItemListAdd.return_soitem_total_money:0}}元</p></li>
              <li ><div>净增订单</div><p>{{recordItemListAdd.new_growth_soitem_sum?recordItemListAdd.new_growth_soitem_sum:0}}单</p><p>{{recordItemListAdd.new_growth_soitem_total_money?recordItemListAdd.new_growth_soitem_total_money:0}}元</p></li>
            </ul>
        </div>
        <!--<div class="f_btn">-->
          <!--<div class="confirm" @click="mine">我的</div>-->
          <!--<div class="cancel" @click="logout">注销</div>-->
        <!--</div>-->
        <!--我的页面-->
        <!--<i-drawer mode="left" :visible="showMenu" @close="hideMenu">-->
          <!--<mine :data="user"></mine>-->
        <!--</i-drawer>-->
        <i-toast id="toast" />
        <cash-model :item='cashoutApplyDTOList' :hideModel='hideModel' @cashModel='cashModel' @success='success'></cash-model>
    </div>
</template>

<script>
  const { $Toast } = require('../../../static/dist/base/index');
import mine from '@/components/mine';
import cashModel from '@/components/cashModel';
import order from '../../store/order';

  import {login} from '@/utils/login'
  let _login = new login();
export default {
  data () {
    return {
      cur:1,
      height:null,
      showMenu:false,
      info:wx.getSystemInfoSync(),
      //用户信息
      user:null,
      shopid:'',//店铺ID
      CashSituationQuery:{},//提现情况查询
      businessSituation:{},//业务情况
      recordItemListAdd:{},//业务增长情况
      cashoutApplyDTOList:{},//选择提现项目
      hideModel:false
    }
  },
  methods: {
    navGo(e,type){
      console.log(e,type)
      //false 跳转订金页面 true 跳转订单页面
      var url = ''
      if(!type){
          if(e===''){
            url='../subscription/main'
          }else{
            url='../subscription/main?id='+e+''
          }
      }else{
       
       if(e===''){
          url='../transferOrder/main'
          }else{
           url='../transferOrder/main?id='+e+''
          }

      }
      wx.navigateTo({
        url:url
      })
          

    },
    showModel(){
      this.hideModel = true
    },
    cashModel(e){
      this.hideModel = e;
    },
    //申请成功
    success(){
      //提现查询
      this.withdrawDeposits();
      //提现选择项目
      this.changeProject();
    },
    changeDate(e){
      console.log(e)
      var day = e==1?7:30;
      this.recordItemList(day)
    },
    //业务增长情况
    recordItemList(day){
     this.api.recordItemList(day).then(res=>{
        this.recordItemListAdd = res.data;
      })
    },

    //扫描二维码
    scanCode(){
      let self = this;
      _login.getPhotoScope().then(data=>{
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
      })
    },

    userCanCode(){
      var self = this;
      wx.scanCode({
          success(res) {
            let code = res.result;
            self.api.scanSubscrip(code).then(res=>{
                
              if(res.resultCode === 1000){

                wx.navigateTo({
                   url:'../userCanCodeInfoMation/main?item='+JSON.stringify(res.data)+''
                })

                
              }
            }).catch(err=>{
              $Toast({
                content:err.error,
                duration:1000
              })
            })
          }
        })
    },
    //展示我的菜单
    mine(){
      this.$data.showMenu = true;
    },
    //隐藏菜单
    hideMenu(){
      console.log('已经隐藏');
      this.$data.showMenu = false;
    },
    //导航
    naviTo(e){
      let id = e.currentTarget.id;
      let url = '';
      switch (id) {
        case 'store':
          url = '../manageOfGoods/main';
          break;
        case 'subscription':
          url = '../subscription/main'
          break;
        case 'order':
          url = '../transferOrder/main';
          break;
        case 'search':
          url = '../search/main';
          break;
      }
      wx.navigateTo({url:url});
    },

    //注销
    logout(){
      this.api.logout();
    },
    
    //提现查询
   withdrawDeposits(){
      this.api.appIndexCashSituationQuery().then(res=>{
        res.data.waitCashoutTotalMoney =   Math.round((res.data.waitCashoutTotalMoney) * 100) / 100;
        res.data.cashoutedTotalMoney =   Math.round((res.data.cashoutedTotalMoney) * 100) / 100;
        res.data.cashoutingTotalMoney =   Math.round((res.data.cashoutingTotalMoney) * 100) / 100;

        this.CashSituationQuery = res.data
      })
   },

   //提现选择项目
      changeProject(){
        this.api.waitCashout().then(res=>{
          this.cashoutApplyDTOList = res.data.waitCashoutApplyDTOList
      })
    }

  },
  components:{
    mine,
    cashModel
  },
  onShow(){
      wx.setStorageSync('oldOrderList');
      
      wx.setStorageSync('scrollTop');
      
     order.commit('checkedBtn',false);

    //提现查询  
    this.withdrawDeposits();
    //提现选择项目
    this.changeProject();
    //业务情况
    this.api.appIndexInCome().then(res=>{
      this.businessSituation = res.data
    })
    //业务增长情况
    this.recordItemList(7)
  },

  mounted(){
    this.$data.height = wx.getSystemInfoSync().windowHeight;
    let self = this;
    this.api.getBusinessShop().then(res=>{
      self.$data.user = res.data.businessUser.businessShopDTO;
    }).catch(err=>{
      console.log('首页初始化调用',self.$data.user);
      $Toast({
        content:err.error,
        duration:1000
      })
    })
  }
}
</script>

<style lang="scss">
  @import "../../assets/sass/index";
  page{
    background-color: #f7f7f7;
  }
  .modelDiv{
    background: #FFF;
    padding: 0 20rpx;
    margin-top: 30rpx;
    .flexDis{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100rpx;
      border-bottom: 1px solid #F7F7F7;
      div{
        display: flex;
        align-items: center;
        font-size:28rpx;
        p{
          margin-left: 16rpx;
        }
      }
      img{
        width: 40rpx;
        height: 45rpx;
      }
    }
    flexDis:last-of-type{
      border: none;
    }
  }
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

  .comCssTable{
    background: #FFF;
    margin-top: 15px;
    .title{
      padding: 15px 0;
      h3{
        font-size: 14px;
        margin-left: 10px;
      }
    }
    ul{
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      border-top: 1px solid #ccc;
      li{
        text-align: center; 
        width: 49vw;
        border-right: 1px solid #ccc;
        border-bottom:  1px solid #ccc;
        flex-grow: 1;
        height: 70px;
        padding-top: 16px;
        font-size: 15px;
        p{
          color: red;
        }
        .firstP{
          margin-top: 13px;
        }
        &:nth-of-type(2n){
          border-right: 0;
        }
      }
    }
  }

 .moneys{
   padding-bottom: 20px;
   .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
         display: flex;
         align-items: center;
         font-size: 13px;
      }
      img{
        width: 20px;
        height: 22.5px;
      }
   }
   .contnets{
     text-align: center;
     font-size: 14px;
   }
   .Cash{
     background: blue;
     color:#FFF;
     padding: 6px 30px;
     margin-top: 30px;
     display: inline-block;
     border-radius: 6px;
   }
   .num{
     display: flex;
     align-items: center;
     justify-content: space-around;
     border-top: 1px solid #ccc;
     padding-top: 30px;
     >div{
       flex-grow: 1;
       text-align: center;
       font-size: 14px;
       div{
         margin-top: 13px;
         color: red;
         font-size: 16px;
       }
     }
   }
 }

  .up {
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
    div{
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      p{
        font-size: 13px;
        padding: 2px 10px;
      }
      .active{
        background: blue;
        color: #FFF;
      }
    }
  }
  }
</style>
