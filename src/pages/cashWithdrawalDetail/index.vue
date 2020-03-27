<template>
        <div class="content">
            <ul>
                <li>订单金额</li> 
                <li>支付手续费</li>
                <li>服务费</li>
                <li>可提现金额</li>
            </ul>
           <div style="margin-top:50px;">
               <block v-for='item in arr' :key='item'>
                    <div class="listKeys">
                     <p>订单号：{{item.item_number}}</p>
                   <navigator :url="'../orderDetail/main?id='+item.id+'&distinguishOrder='+true"  hover-class="none">
                        <div>
                            <span>详情</span>
                            <img src="../../assets/images/iconfontjiantou5.png" alt="">
                        </div>
                   </navigator>
                    </div>
                    <ul>
                        <li>{{item.deliver_price}}</li>
                        <li>{{item.poundage_rate}}</li>
                        <li>{{item.commission_rate}}</li>
                        <li>{{item.cashMoney}}</li>
                    </ul>
               </block>
           </div>
        </div>
</template>

<script>
export default {
    name:'index',
    data(){
        return{
            zan_arr:[],
            arr:[],
            refsh:true,
            page:1,
            pageSize:10,
            id:''
        }
    },
    onReachBottom(){
       if(this.refsh){
           
           this.page = this.page+1;
           var data = {
               id:this.id,
               page:this.page,
               pageSize:this.pageSize
           }
           this.cashoutApplyHisSoItemDetail(data)
       }else{
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1200
          })
       }
    },

    onShow(){
         Object.assign(this.$data, this.$options.data());

            let query = this.$root.$mp.query;
            this.id = query.id;

            var data = {
            id:query.id,
            page:this.page,
            pageSize:this.pageSize
        }

        this.cashoutApplyHisSoItemDetail(data)

    },
    methods:{
        cashoutApplyHisSoItemDetail(data){
            this.api.cashoutApplyHisSoItemDetail(data).then(res=>{
                var zan_arr = this.zan_arr   
                var data = res.data;

            if(res.data.length){
                this.refsh = true
                for(let i=0;i<data.length;i++){

                    // data[i].deducation_fee 抵扣金额(可选)
                    var deliver_price = data[i].deliver_price.toFixed(2); 
                    var deliver_prices = 0
                        if(data[i].deducation_fee){
                            deliver_prices = data[i].deliver_price + data[i].deducation_fee
                        }else{
                            deliver_prices = data[i].deliver_price
                        }

                    var commission_rate = Math.round((deliver_price * data[i].commission_rate) * 100) / 100;
                    var poundage_rate =   Math.round((deliver_price * data[i].poundage_rate) * 100) / 100;
                    var cashMoney = (deliver_prices- commission_rate - poundage_rate).toFixed(2);
                    
                    data[i].commission_rate = commission_rate
                    data[i].poundage_rate = poundage_rate
                    data[i].cashMoney = cashMoney?cashMoney:'0.00',
                    data[i].deliver_price = deliver_prices;
                    
                }
                Array.prototype.push.apply(zan_arr,data)
                this.arr = zan_arr
            }else{
                this.refsh = false
            }
            })
        }
    }
 }
</script>

<style lang="scss">
   .content{
     >ul{
        position: fixed;
        width: 100vw;
        background: #FFF;
        top: 0;
        left: 0;
     }
      .listKeys{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          padding: 10px 20px;
          background: #efefef;
          p{
              color: blue;
          }
          div{
                display: flex;
                align-items: center;
                img{
                    width: 40rpx;
                    height: 45rpx;
               }
          }
      }
      ul{
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          li{
              font-size: 13px;
              flex: 1;
              text-align: center;
          }
      }
  }
</style>