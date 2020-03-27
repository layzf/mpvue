<template>
    <div>
        <div class="topWIdthDrawa">
            <div class="flexHeader">
                <div>
                    <p>待提现</p>
                    <span>{{CashSituationQuery.waitCashoutTotalMoney?CashSituationQuery.waitCashoutTotalMoney:0}}</span>
                </div>
                <div>
                    <p>申请中</p>
                    <span>{{CashSituationQuery.cashoutingTotalMoney?CashSituationQuery.cashoutingTotalMoney:0}}</span>
                </div>
                <div>
                    <p>已提现</p>
                    <span>{{CashSituationQuery.cashoutedTotalMoney?CashSituationQuery.cashoutedTotalMoney:0}}</span>
                </div>
            </div>
            <div class="moneyBtn" @click="showModel">申请提现</div>
        </div>
        <!--列表--> 
         <block v-if="configList!=''">
            <div class="listBox" v-for="(item,index) in configList" :key="index">
                <div class="listContent">
                    <span>{{item.apply_time}}</span>
                    <navigator :url="'../cashWithdrawalDetail/main?id='+item.id+'&distinguishOrder='+true"  hover-class="none">
                        <div>
                            <p>详情</p>
                            <img src="../../assets/images/iconfontjiantou5.png" alt="">
                        </div>
                    </navigator>
                    
                </div>
                <div class="list">
                    <div class="widthMoney">
                        <span>提现金额</span>
                        <span>{{item.cashout_money}}</span>
                    </div>
                    <div>
                        <span>交易金额</span>
                        <span>{{item.trans_money}}</span>
                    </div>
                    <div>
                        <span>支付手续费</span>
                        <span>{{item.poundage}}</span>
                    </div>
                    <div>
                        <span>服务费</span>
                        <span>{{item.service_fee}}</span>
                    </div>
                    <div>
                        <span>提现项目</span>
                        <span>{{item.project_name}}</span>
                    </div>
                </div>
          </div>
         </block>

        <div v-if="configList==''" class="notItem">暂无数据</div>
        <!--提现弹框-->
         <cash-model :item='cashoutApplyDTOList' :hideModel='hideModel' @cashModel='cashModel'></cash-model>
    </div>
</template>

<style lang="scss" >
.notItem{
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-top: 60px;
}
    .topWIdthDrawa{
        text-align: center;
        margin-top: 20px;
        padding-bottom: 30px;
        .moneyBtn{
            background: blue;
            color:#FFF;
            padding: 6px 30px;
            margin-top: 30px;
            display: inline-block;
            border-radius: 6px;
            font-size: 14px;
        }
        .flexHeader{
            display: flex;
            align-items: center;
            justify-content: space-around;
            text-align: center;
            p{
                color: blue;
                margin-bottom:13px;
                font-size: 14px;
            }
            span{
                font-size: 18px;
                font-weight: bold;
                color: red;
            }
        }
    }

    .listBox{
        .list{
            margin: 0 10px;
            >div{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 0;
                font-size: 14px;
            }
            .widthMoney{
                border-bottom: 1px solid #ccc;
                span:last-of-type{
                    color: red;
                }
            }
        }
       .listContent{
            background: #efefef;
            padding: 12px 8px;
            font-size: 14px;
            display: flex;
            align-content: center;
            justify-content: space-between;
        span{
            color: blue;
        }
        div{
            display: flex;
            align-items: center;
            p{
                color: #666;
            }
            img{
                width: 40rpx;
                height: 45rpx;
                margin-left: 4px;
            }
        }
     }
    }
    
</style>

<script>
import cashModel from '@/components/cashModel';
export default {
    name:'index',
      components:{
        cashModel
    },
    data(){
        return{
            hideModel:false,
            CashSituationQuery:{},//提现查询
            cashoutApplyDTOList:[],//提现数据
            configList:[]
        }
    },
    methods:{
        cashModel(e){
             this.hideModel = e;
             
            //列表
            this.cashoutApplyHisList();
            //提现查询
            this.withdrawDeposits();
            //提现选择项目
            this.changeProject();

        },
        showModel(e){
            this.hideModel = true
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
        },
        //列表
        cashoutApplyHisList(){
            this.api.cashoutApplyHisList().then(res=>{
             this.configList = res.data
            })
        }

    },
 
    onShow(){
        Object.assign(this.$data, this.$options.data());
        //列表
        this.cashoutApplyHisList();
        //提现查询
        this.withdrawDeposits();
        //提现选择项目
        this.changeProject();
    }
}
</script>