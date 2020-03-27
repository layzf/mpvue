<template>
  <div>
    <div class="order-item" v-for="(items,index) in dataArr" :key="index">
      <div class="o-i-head">
        <div class="i_h_contact">
          <span> {{ items.refund_time || items.refund_apply_time || items.create_at}}</span>
        </div>
        <div class="i_h_status" v-if="items.apistatus==-1 && items.pay_status===0">已取消</div>
        <div class="i_h_status" v-if="items.apistatus==0 && items.pay_status==0 && items.so_type!=4 && items.so_type!=3 ">待付款</div>
        <div class="i_h_status" v-if='(items.apistatus >= 0) && (items.pay_status == 1) && (items.deliver_status==0) && items.so_type!=4 && items.so_type!=3'>待交付</div>
       

        <div class="i_h_status" v-if='items.secured_trans!=2 && (items.so_type!=3  && items.so_type!=4) && items.deliver_status>0 && items.pay_status ==1'>已交付</div>

        <div class="i_h_status" v-if='(items.deliver_status>=0) && items.pay_status ==1 && (items.so_type!=3  && items.so_type!=4) && items.secured_trans==2 '>
           {{items.deliver_status==1?'待结账':items.deliver_status==2?'待提现':''}}
        </div>
 
        <div class="i_h_status" v-if='(items.apistatus== -2 || items.pay_status ==-1) && items.so_type!=4'>
          {{items.refund_verify_status ==1?'已拒绝' : items.refund_verify_status ==2?'已退款':'待退款'}}
        </div>

         <div class="i_h_status" v-if='items.so_type==4'>部分退款</div>

         <div class="i_h_status" v-if='items.deliver_status==3 && items.so_type!=3'>提现中</div>

         <div class="i_h_status" v-if='items.deliver_status==4 && items.so_type!=3'>已提现</div>


        <div  class="i_h_status" v-if="items.pay_status==0 && (items.apistatus==0 || items.apistatus==1) && (items.so_type==3 || items.so_type==4)">待补单</div>
        <div  class="i_h_status" v-if="items.pay_status==1 && (items.apistatus==0 || items.apistatus==1) && (items.so_type==3 || items.so_type==4)">已补单</div>


      </div>
      <div class="i_content" @click="detailClick" :data-id="items.id">
        <div class="i_left">
          <img class="i_img" :src="items.img_url" v-if="items.img_url"/>
        </div>
        <div class="i_right">
          <span class="i_c_title">{{items.link_name}} {{items.link_mobile}}</span>
          <div class="i_c_content">{{items.village_name}} {{items.door_number}}</div>
          <div class="i_c_total2">
            <span>{{items.business_name}}</span>
          </div>
        </div>
      </div>
      <div class="i_c_total"></div>
      <div class="i_foot">
<!--交付-->
        <div v-if='(items.apistatus >= 0) && (items.pay_status == 1) && (items.deliver_status==0) && items.so_type!=4 && items.so_type!=3'>
            <div class="i_btn"  @click="detailClick" :data-id="items.id" v-if="items.so_type == 2">操作退补款</div>
            <div class="i_btn" @click.stop="gopayOrder(items)" id="lastBtn">交付</div>
        </div>
<!--待结账-->
        <div v-if='items.deliver_status == 1 && items.so_type == 2 ' >
            <div class="i_btn"  @click="detailClick" :data-id="items.id" >操作退补款</div>
            <div class="i_btn"  @click.stop="SecuredSoItemMoneyBtn(items.id)" id="lastBtn">申请结账</div>
        </div>
<!--
  refund_verify_status:0：未操作 1:拒绝 2：同意
  -->
        <div class="i_h_status" v-if='(items.apistatus== -2 || items.pay_status ==-1) && (items.refund_verify_status!=1 && items.refund_verify_status!=2) && items.so_type!=4'>
           <div class="i_btn" @click="detailClick" :data-id="items.id">退款</div>
           <div class="i_btn" id="lastBtn" @click="detailClick" :data-id="items.id">拒绝退款</div>
        </div>
<!--退补款-->
        <div v-if='(items.so_type==3 || items.so_type==4) && items.apistatus>=0'>
            <div class="i_btn"  @click="securedSoItemBtn(items,'refund')" v-if="items.so_type==3 && items.pay_status!=0 && items.deliver_status<  2">退款</div>
            <div class="i_btn" @click="lookParentDetail(items.parent_id)" id="lastBtn">查看原订单</div>
        </div>

      </div>
      <div class="step"></div>
      <modal title="记录返现" confirm-text="确认" cancel-text="取消" v-show="onOff" @confirm="modalConfirm" @cancel="modalCancel">
        <div class="record">
            <span class="title">返现比例({{items.return_value}}):</span>
            <div class="money">
              <span> ￥ </span>
              <input type="number" placeholder="请输入返现金额" v-model="money"/>
            </div>
        </div>
      </modal>
    </div>
  </div>
    
</template>

<script>
  export default {
    props:{
      dataArr:{
        type:Array,
        value:[]
      }
    },
    data(){
      return {
        money:'',
        onOff:false,
        id:'',
      }
    },
    mounted(){
    
    },
    methods:{
      //查看原订单
      lookParentDetail(id){
          this.$emit('detailClick',id)
      },
      //同意/拒绝 退款
      securedSoItemBtn(item,type){
        var types = ''

        if(type=='refund'){
            types='refund'
        }else{
            types = type?'agree':''
        }

        var data={
          type:types,
          id:item.id
        }
        if(!types){
            wx.showModal({
              content: "拒绝用户退款请求请及时联系用户确认情况",
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#999999',
              confirmText: '确定',
              confirmColor: '#FF5D22',
              success: (res) => {
                console.log(res);
                if (res.confirm==true){
                  this.securApi(data)
                }
              }
            })
        }else{
           var str = ''
 
           if(types=='refund'){
              str = `补款金额：${item.pay_price}元原路返还给用户`;
              
           }else{
               str = `订单金额：${item.deliver_price || item.pay_price}元原路返还给用户`;
               var strs = `退回订金：${item.deducation_fee}元；\r\n`;
               str = strs.concat(str)
           }
         
          wx.showModal({
              title:'退款情况',
              content: str,
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#999999',
              confirmText: '确定',
              confirmColor: '#FF5D22',
              success: (res) => {
                console.log(res);
                if (res.confirm==true){
                  this.securApi(data)
                }
              }
            })
        }
        
      },
      securApi(data){
        this.api.securedSoItemBtn(data).then(res=>{
          if(res.resultCode ==1000){
              wx.showModal({
                content:'操作成功',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FF5D22',
                success: (res) => {
                  console.log(res);
                  if (res.confirm==true){
                      this.$emit('securedSoItem',true) 
                  }
                }
              })
          }
        }).catch(res=>{ 
          wx.showModal({
            content: res.error,
            confirmText: '确定',
            showCancel: false,
            confirmColor: '#FF5D22',
          })
        })
      },
      //退补款
      // refund(e,p){
      //   this.$emit('refundCEmit',e,p) //父组件刷新页面
      // },
      //结账
      SecuredSoItemMoneyBtn(id){
        wx.showModal({
        content: "结账后无法进行退补款确认订单金额无误申请结账?",
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#999999',
        confirmText: '确定',
        confirmColor: '#FF5D22',
        success: (res) => {
          console.log(res);
          if (res.confirm==true){
            this.api.accountSecuredSoItem(id).then(res=>{
              this.$emit('securedSoItem',true) //父组件刷新页面
            }).catch(res=>{ 
              wx.showModal({
                content: res.error,
                confirmText: '确定',
                showCancel: false,
                confirmColor: '#FF5D22',
              })
            })
          }
        }
      })
      },
       //担保交易 跳到交付页面，非担保交易直接交付
     gopayOrder:function(items){

        if(items.deliver_status===0){
//担保交易直接点击按钮
          if(items.so_type==2 || items.so_type==3){
              var data ={
                id:items.id,// 订单ID
                deliver_img:items.prod_img,// 合同地址
                deliver_content:items.prod_content,// 交付内容
              }

                wx.showModal({
                  content: "货物已经完全交付给用户！",
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#999999',
                  confirmText: '确定',
                  confirmColor: '#FF5D22' ,
                  success:  (res) =>{
                      if (res.confirm) {
                          this.api.deliverSecuredSoItem(data).then(res=>{
                            this.$emit('securedSoItem',true)
                          })
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                      }
                  },
                  fail:function (res) {
                      console.log('取消')
                  }
              })
            return
          }
//非担保交易 跳转交付页面
          wx.navigateTo({
            url:'../writeSubscription/main?id='+items.id+'&user_id='+items.user_id+'&payorder=payorder'
          })
      }
       
     },
      detailClick(res){
        this.$emit('detailClick',res.currentTarget.dataset.id)
      },
      //记录返现
      reCord(e){
        this.id = e.currentTarget.dataset.id;
        this.onOff = true;
      },
      //确认
      modalConfirm(){
        let that = this;
        let money = this.$data.money;
        if(!money){
          wx.showToast({
            title: '金额非法',
            duration:1000
          })
          return false;
        }
        let data = {
          id:this.$data.id,
          returnMoney:money
        }
        this.api.reCordMoney(data).then(res=>{
          that.onOff = false;
          wx.showToast({
            title: '记录成功',
            duration:1000,
            success:function(){
              that.$props.dataArr.return_type = 0;
            }
          })
        }).catch(err=>{
          wx.showToast({
            title: err.error
          })
        })
      },
      //取消
      modalCancel(){
        this.onOff = false;
      }
    }
  };
</script>

<style lang="scss">
  $fontColor: #ff5d22;
  #lastBtn{
    margin-left: 10px;
  }
  .order-item{
    background-color: #ffffff;
    animation: fade 1s;
    .o-i-head{
      display: flex;
      height:40px;
      line-height: 40px;
      border-bottom: 1px solid rgba(180,180,180,0.2);
      font-size: 14px;
      border-top: 1px solid rgba(180,180,180,0.2);
      .i_h_contact{
        flex: 1;
        span{padding-left: 10px}
      }
      .i_h_status{
        color: #ed3f14;
        padding-right: 10px;
      }
    }
    .i_content{
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      background-color: #f7f7f7;
      .i_left{
        flex: 2;
        text-align: center;
        .i_img{
          width: 90px;
          height: 72px;
          padding-top: 4px;
        }
      }
      .i_right{
        flex: 5;
      }
      .i_c_title{
        font-weight: 600;
        color: #000;
        font-size: 14px;
        padding-left: 10px;
      }
      .i_c_content{
        padding-top: 8px;
        font-size: 12px;
        color: #666666;
        padding-left: 10px;
      }
      .i_c_total2{
        text-align:left;
        padding-top:10px;
        padding-bottom:10px;
        font-size:13px;
        padding-left:10px;
        color:#777;
        .i_c_t_txt{
          color: #999999;
        }
        .i_c_t_price{
          color: $fontColor;
        }
      }
    }
    .i_c_total{
      text-align: right;
      font-size: 14px;
      padding:10rpx 0rpx;
      padding-right: 20px;
      .i_c_t_txt{
        color: #999999;
      }
      .i_c_t_price{
        color: $fontColor;
      }
    }
    .i_foot{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      text-align: right;
      padding-right: 10px;
      border-top: 1px solid rgba(180,180,180,0.2);
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
    .record{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      font-size: 30rpx;
      color: #333333;
      .title{
        text-align: center;
      }
      .money{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 40rpx;
        padding-top: 10rpx;
      }
    }
  }
  .step{
    background-color: #eeeeee;
    height: 10px;
    width: 100%;
  }
  .margin{
    margin-right: 10px;
  }
  .line{
    border-top: 1px solid rgba(180,180,180,0.2);
  }
  @keyframes fade{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }

  .unactive{
    background: #999999 !important
  }
</style>
