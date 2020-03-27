
<template>
    <div class="orders" >
        <div v-for="(item,index) in orderChange" :key='item.id' class="orderWrap" @click.stop="goDetal(item.id)">
            <img :src="item.project_img" alt="">
            <div class="contentFlexs">
                <div  class="userInfoOrderChange">
                  <div><span> {{item.link_name}}</span>{{item.link_mobile}}</div>
                  <div class="orderStatus" v-if="item.secured_trans==1 || !item.secured_trans">
                      {{item.status<=1?'待验收':'已验收'}}
                  </div>
                  <div v-if="item.secured_trans==2">

                    <div class="orderStatus" v-if='item.deliver_status==3'>提现中</div>
                    <div class="orderStatus" v-if='item.deliver_status==4'>已提现</div>
                    <div  class="orderStatus" v-if="item.status==-1  && item.pay_status==0">已取消</div>
                    <div  class="orderStatus" v-if="item.pay_status==0 && item.status==0 && (item.so_type!=3 && item.so_type!=4)">待付款</div>
                    <div  class="orderStatus" v-if="item.pay_status==1 && item.status==0 && (item.so_type!=3 && item.so_type!=4)">已付款</div>
                    <div  class="orderStatus" v-if="item.deliver_status == 1">待结账</div>
                    <div  class="orderStatus" v-if="item.deliver_status == 2">待提现</div>
                    <div  v-if="item.so_type!=4 && item.so_type!=3 &&(item.status== -2 || item.pay_status== -1)">
                      <div  class="orderStatus" v-if="item.refund_verify_status == 2">已退款</div>
                      <div  class="orderStatus" v-if="item.refund_verify_status == nul || item.refund_verify_status == 0">待退款</div>
                    </div>

                  </div>
                </div>
                <div class="villageOriderChange">{{item.village_name + item.door_number}}</div>
                <div>{{'转单时间：'+item.create_at}}</div>
                <div v-if="item.status!=-1 && item.secured_trans==1" :class="item.deliver_status==0?'active':''" class="Paybtn" @click.stop="gopayOrder(item.id,item.user_id,item.deliver_status)">{{item.deliver_status==0?'交付':'已交付'}}</div>
            </div>
        </div>
  </div>
</template>

<script>
  export default {
    name: "listIndex",
    data() {
      return {
        orderChange:[],
      }
    },
  
    methods: {
      //去详情
     goDetal:function(e){
        wx.navigateTo({url:'../orderDetail/main?id='+e+'&distinguishOrder='+true+''})
     },
     //去交付页面
     gopayOrder:function(soId,userId,status){
       if(status===0){
         wx.navigateTo({
          url:'../writeSubscription/main?id='+soId+'&user_id='+userId+'&payorder=payorder'
        })
       }
     }
    },
    mounted() {

    },
    onShow(){
       Object.assign(this.$data, this.$options.data());

       let query = this.$root.$mp.query;

      this.api.listBySoId(query.id).then(res=>{
        console.log(res,"啊啊啊")
        this.orderChange = res.data
      }) 
    
    },
  };
</script>

<style lang="scss" >
  .orderWrap{
    display: flex;
    align-items: flex-start;
    padding: 20rpx 0 38rpx 30rpx;
    border-bottom: 30rpx solid #f7f7f7f7;
    position: relative;

    .contentFlexs{
      padding:0 12rpx;
      font-size: 28rpx;
      flex: 1;

      .userInfoOrderChange{
        display:flex;
        justify-content:space-between;
        align-items: center;

        .orderStatus{
          color: #FF6633;
        }
        span{
          margin-right: 20rpx;
        }
      }

      .villageOriderChange{
        margin:20rpx 0; 
      }

      .Paybtn{
         position: absolute;
         right: 12rpx;
         bottom: 16rpx;
         background: #999999;
         padding: 6rpx 20rpx;
         border-radius: 10rpx;
         color: #FFF;
      }
      .active{
        background: #FF6633;
      }

    }

    image{
      width: 200rpx;
      height: 200rpx;
    }

    
    
  }
</style>