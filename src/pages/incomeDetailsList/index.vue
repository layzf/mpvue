<template>
    <div>
        <div class="headerTop">
            <div class="notTexts">
                <div class="lefts" @click="changeDateModel(1)">
                     <span>{{dateView}}</span>
                </div>
                <p>（不包含非担保交易）</p>
            </div>
            <!-- <div class="rights">
                <p>待提现:{{CashSituationQuery.waitCashoutTotalMoney?CashSituationQuery.waitCashoutTotalMoney:0}}元</p>
                <p>已提现:{{CashSituationQuery.cashoutedTotalMoney?CashSituationQuery.cashoutedTotalMoney:0}}元</p>
            </div> -->
        </div>   
        <div class="content">
            <ul>
                <li>订单金额</li> 
                <li>支付手续费</li>
                <li>服务费</li>
                <li>可提现金额</li>
            </ul>
            <div v-if="!arr.length" class="notArr">暂无数据</div>
           <div v-else>
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

    <div class="pickerViewClass" v-if="dateModel">
        <div class="modelShow"  @click="changeDateModel(2)"></div>
        <div class="resType">
            <div class="btns"> 
                    <span  @click="changeDateModel(2)">取消</span>
                    <span  @click="changeDateEnd">完成</span>
            </div>
            <picker-view indicator-style="height: 50px;" class="pickerView"  :value="value" @change="bindChange">
                <picker-view-column>
                <view v-for="item in years" :key='item' style="line-height: 50px">{{item}}年</view>
                </picker-view-column>
                <picker-view-column>
                <view v-for="item in months" :key='item' style="line-height: 50px">{{item}}月</view>
                </picker-view-column>
            </picker-view>
        </div>
    </div>
       
    </div>
</template>

<script>
  import {api} from '../../utils/api';
    function fn_months(num){
        if (num.toString().length == 1) {
              num = "0" + num;
        }
        return num
    }

    const date = new Date()
    const years = []
    const months = []
    const year = date.getFullYear();
    const month = fn_months(date.getMonth()+1);


   for (let i = 1; i <= 12; i++) {
        months.push(fn_months(i))
    }

    for (let i = 2015; i <= date.getFullYear(); i++) {
         years.push(i);
    }

    var monethIndex = months.indexOf(month);

  export default {
    name: "index",
    data(){
      return{
        years: years,
        year: year,
        months: months,
        month: month,
        value: [9999, monethIndex],
        dateModel:false,
        dateView:'本月',
        CashSituationQuery:{},
        page:1,
        pageSize:10,
        arr:[],
        zan_arr:[],
        refsh:Boolean//刷新开关
      }
    },
    mounted(){
      Object.assign(this.$data, this.$options.data());
      this.fn_item()
      this.cash();
    },
    onShow(){
       
    },
    onReachBottom(){
       if(this.refsh){
           this.page = this.page+1;
           this.fn_item()
       }else{
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1200
          })
       }
        
    },
    methods:{
         //提现查询
         cash(){
            var dates = this.year.toString()+this.month.toString()
            var Apidata={
                year_month:dates,
            }
             this.api.appIndexCashSituationQuery(Apidata).then(res=>{
                res.data.waitCashoutTotalMoney =   Math.round((res.data.waitCashoutTotalMoney) * 100) / 100;
                res.data.cashoutedTotalMoney =   Math.round((res.data.cashoutedTotalMoney) * 100) / 100;

                this.CashSituationQuery = res.data
             })
         },
        

        fn_item(changeDate){
            var dates = this.year.toString()+this.month.toString()
            var Apidata={
                year_month:dates,
                page:this.page,
                pageSize:this.pageSize
            }
            this.itmes(Apidata,changeDate)
        },
         itmes(data,changeDate){
            this.api.appIndexInComeDetailList(data).then(res=>{
                console.log(res,"ahhah")
               var zan_arr = this.zan_arr
               var data = res.data;

                if(res.data.length){
                    this.refsh = true
                    for(let i=0;i<data.length;i++){
                        var deliver_price = data[i].deliver_price.toFixed(2);

                        var deliver_prices = 0
                        if(data[i].deducation_fee){
                            deliver_prices = data[i].deliver_price + data[i].deducation_fee
                        }else{
                            deliver_prices = data[i].deliver_price
                        }

                        var commission_rate = Math.round((deliver_price * data[i].commission_rate) * 100) / 100;
                        var poundage_rate =   Math.round((deliver_price * data[i].poundage_rate) * 100) / 100;
                        var cashMoney = Math.round((deliver_price - commission_rate - poundage_rate) * 100) / 100;
                        
                        data[i].commission_rate = commission_rate
                        data[i].poundage_rate = poundage_rate
                        data[i].cashMoney = cashMoney?cashMoney:'0.00'
                        data[i].deliver_price = deliver_prices;
                        
                    }
                    Array.prototype.push.apply(zan_arr,data)
                    this.arr = zan_arr
                }else{
                    this.refsh = false
                    if(changeDate){
                         this.zan_arr = res.data
                         this.arr = zan_arr
                    }
                    
                }
                

            })
         },
         bindChange(e){
            const val = e.mp.detail.value
            console.log(val,"a ")
            this.year= this.years[val[0]];
            this.month=this.months[val[1]];
        },
        changeDateModel(e){
            this.dateModel = e==1 ?true:false;
            if(e==1){
                this.year = year;
                this.month = month;
            }
        },
        changeDateEnd(){
            if(this.year==year && this.month == month){
                 this.dateView = '本月'
            }else{
                 this.dateView = this.year+'-'+this.month;
            }
            this.zan_arr = []
            this.refsh = true
            this.dateModel = false;
            this.page = 1
            this.fn_item(true)
            this.cash();
        }
    }
    
  };
</script>

<style lang="scss">
  @import "../../assets/sass/login";
  .notTexts{
      display: flex;
      align-items: center;
      p{
          font-size: 24rpx;
          color: red;
      }
  }
  picker-view-column{
      text-align: center;
      font-size: 14px;
  }
  .notArr{
      font-size: 14px;
      text-align: center;
      margin-top: 240px;
  }
  .pickerViewClass{
      .resType{
          position: fixed;
          width: 100%;
          height: 700rpx;
          bottom: 0;
          z-index: 999;
          background: #FFF;
          .btns{
                display: flex;
                align-content: center;
                padding: 0 40px;
                justify-content: space-between;
                font-size: 15px;
                padding-top: 30px;
          }
      }
      .modelShow{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba( 0,0,0,.6);
          z-index: 99;
      }
      .pickerView{
        width: 100%;
        height: 600rpx;
        position: fixed;
        bottom: 0;
        z-index: 99999;
        background: #FFF;
      }
  }
  .headerTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 120rpx;
        background: #efefef;
        position: fixed;
        top: 0;
        width: 100vw;
        box-sizing: border-box;
        left: 0;
      .rights{
          color: blue;
          font-size: 14px;
      }
      .lefts{
            background: #FFF;
            display: block;
            position: relative;
            border: 1px solid #ccc;
            border-radius: 100px;
            font-size: 14px;
            height: 60rpx;
            padding: 0px 30px;
            padding-left: 15px;
            line-height: 60rpx;

          &::after{
            position: absolute;
            right: 10rpx;
            top: 22rpx;
            width: 0;
            height: 0;
            border-width: 18rpx;
            border-style: solid;
            border-color: #ccc transparent transparent transparent;
            content: '';
          }
      }
  }

  .content{
      margin-top: 200rpx;
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
      >ul{
            position: fixed;
            width: 100%;
            background: #FFF;
            top: 120rpx;
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
