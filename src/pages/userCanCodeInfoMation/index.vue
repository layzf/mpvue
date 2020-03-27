<template>
    <div v-if="!showModel" style=" text-align:center;margin-top:150rpx; ">努力加载中....</div>
    <div v-else>
<!--基本信息-->
        <div class="modelContent">
            <h3>基本信息</h3>
            <div class="basicInfoMation">
                <p>
                    <span>昵称：</span>
                    <span>{{basicInfoMation.user_name}}</span>
                </p>
                <p>
                    <span>手机号：</span>
                    <span>{{basicInfoMation.mobile}}</span>
                </p>
                <p v-if="basicInfoMation.site">
                    <span>地址：</span>
                    <span class="vue-o-hs">{{basicInfoMation.site}}</span>
                </p>
            </div>
        </div>
 <!--订单信息-->
        <div class="modelContent" >
            <h3>本店订金单情况</h3>
                <block v-if='soInfoMaps.length'>
                    <div style="padding-bottom:60rpx;" class="basicInfoMation orderDetail"  v-for='(items,index) in soInfoMaps' :key="index" >
                        <div class="i_right">{{items.status}}</div>

                        <img :src="items.img_url" alt="">
                        <div class="rl">
                            <div>
                                <span class="userNameFl">{{items.link_name}}</span>
                                <span>{{items.link_mobile}}</span>
                            </div>
                            <div>
                                <span>收货地址：</span>
                                <span  class="vue-o-hs">{{items.village_name + items.door_number}}</span>
                            </div>
                            <div>
                                <span>下单时间：</span>
                                <span>{{items.create_at}}</span>
                            </div>
                            <div class="ColorRed">
                                <span>订金：</span>
                                <span>￥{{items.total_price}}</span>
                            </div>
                        </div>
                        <div class="abBotBtn" v-if=" items.status=='待转单' || items.status=='已转单'">
                            <div @click="lookChangeOrder(items.id)" v-if="items.status=='已转单'">查看转单</div>
                            <div @click="turnData(items.user_code, items.mobile, items.status)">{{items.status=='已转单'?'再次转单':'转单'}}</div>
                        </div>
                      </div>
                </block>

                
            <div class="notData" v-else>
                <icon type="warn" size="20" color="red"/>
                <p>该会员暂无任何订金单</p>
                <p>请勿随意透露多让集采价格</p>
            </div>

            
        </div>
<!--其他商家订单情况-->
        <div class="modelContent" v-if="other.otherShopPaiedCount || other.otherShopTuededCount || other.otherShopTuededSoItemCount">
            <h3>其他商家订单情况</h3>
            <div class="basicInfoMation">
                <p>
                    <span>订金单数量：</span>
                    <span>{{other.otherShopPaiedCount}}</span>
                </p>
                <p>
                    <span>已转单订金数量：</span>
                    <span>{{other.otherShopTuededCount}}</span>
                </p>
                <p>
                    <span>订单数量：</span>
                    <span>{{other.otherShopTuededSoItemCount}}</span>
                </p>
            </div>
        </div>
<!--到店记录-->
        <div class="modelContent" v-if="visitShopRecordList.length !='' ">
            <h3>到店记录</h3>
            <div class="basicInfoMation">
                <p v-for='(arr,index) in visitShopRecordList' :key="index">
                    <span>第{{visitShopRecordList.length - index}}次到店时间：</span>
                    <span>{{arr.create_at}}</span>
                </p>
              
            </div>
        </div>
 <!--转单弹框-->
    <t-diago :hiddens="t_diago" @getTrue="getTrue" @getfalse="getfalse"></t-diago>

    </div>
</template>


<script>
import tDiago from '@/components/diago';

    export default {
        name: "index",
        data(){
            return{
                soInfoMaps:[], //订金单信息
                basicInfoMation:{},//基本信息
                other:{},//其他商家订单
                visitShopRecordList:[],//访问时间

                codeAndMobile:{  //转单参数
                  code:'',
                  mobile:''
                },  
                t_diago:false,//转单弹框隐藏
                showModel:false,
            }
        },
        methods:{
            //查看转单列表
            lookChangeOrder:function(e){
                wx.navigateTo({url:'../changeOrderList/main?id='+e})
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
            //关闭转单框
            getfalse:function(e){
               this.t_diago =  false
            }

        },
         mounted() {
            Object.assign(this.$data, this.$options.data())
            setTimeout( ()=> {
                this.showModel = true
            },1000)
            let self = this;
            let query = this.$root.$mp.query;
            let res = JSON.parse(query.item)
      
//如果只有一个数据，则第一个是默认地址   
            var site = ''
            if(res.userReceiveInfoDTO.length === 1){

                var city_ = res.userReceiveInfoDTO[0]
                
                site =  city_.province_name + city_.city_name + city_.district_name + city_.village_name + city_.door_number
            }
//如果有默认地址
            res.userReceiveInfoDTO.forEach(city_=>{
                if(city_.is_default === 1 ){
                    site =  city_.province_name + city_.city_name + city_.district_name + city_.village_name + city_.door_number
                }
            })

  //用户基本信息          
            var basicInfoMation = {
                user_name:res.user_name,
                mobile:res.mobile,
                site:site
            }
            this.basicInfoMation = basicInfoMation
//订金单信息

                for(let o of res.soInfoMaps){
                  o.status = this.api.filterStatus(o.status);
               }
                 this.soInfoMaps = res.soInfoMaps

//其他商家订单情况
            var other = {
                otherShopPaiedCount:parseInt(res.otherShopPaiedCount) || 0,
                otherShopTuededCount:parseInt(res.otherShopTuededCount) || 0,
                otherShopTuededSoItemCount:parseInt(res.otherShopTuededSoItemCount) || 0
            }
            this.other = other

//访问时间
    this.visitShopRecordList = res.visitShopRecordList
            console.log(other,"asdasd")
            console.log(JSON.parse(query.item),"query")
      }
    }
</script>


<style lang="scss">
$width:600rpx;

.notData{
    padding: 20rpx 0;
    text-align: center;
    color: red;
    p{
        margin-top: 10rpx;
    }
}
.vue-o-hs{
  width: $width;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
    page{
        background: #f7f7f7;
        font-size: 28rpx;
        padding-top: 25rpx;
    }
    .modelContent{
        margin-bottom: 25rpx;

        h3{
            margin-left: 20rpx;
            color: #169BD5;
            margin-bottom: 20rpx;
        }
        .basicInfoMation{
            padding: 30rpx 0;
            padding-left: 40rpx;
            background: #fff;
            border-radius: 10rpx;
            position: relative;

            p{
                margin-bottom: 10rpx;
                display: flex;
                align-items: center;
            }
            p:last-of-type{
                margin-bottom: 0;
            }
            .i_right{
                position: absolute;
                right: 30rpx;
                top: 30rpx;
                color: red;
            }
            .abBotBtn{
                position: absolute;
                right: 30rpx;
                bottom: 20rpx;

                >div{
                    background-color:#ed3f14;
                    color: #ffffff;
                    font-size: 13px;
                    padding: 4px 6px;
                    border-radius: 4px;
                    display: inline-block;
                    height:20px;
                    line-height:20px
                }
                >div:last-of-type{
                    margin-left: 20rpx;
                }
            }
        }
    }
    //订金单情况
    .orderDetail{
        display: flex;
        align-items: flex-start;
        position: relative;
        img{
            width: 180rpx;
            height: 160rpx;
            border:1px solid #000;
            margin-right: 15rpx;
         }

        .rl{
            flex: 1;

            .vue-o-hs{
                width: 400rpx;
            }
            div{
                margin-bottom: 10rpx;

                .userNameFl{
                    margin-right: 10rpx;
                }
            }
            .ColorRed{
                color: red;
            }
        }
    }
</style>