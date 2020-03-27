<template>
    <div>
<!--搜索框-->    
        <div class="h_left widths" >
            <img class="h_l_img" src="../../assets/images/icon_search.png"/>
            <input class="h_input" placeholder="手机号搜索" @input="searchData" :value="isSearch" confirm-type = '搜索' @confirm='bindconfirm($event)'>
        </div>
<!--列表渲染-->
        <div class="list" v-if=" list.length ">
            <div class="flexsContent" v-for="(item,index) in list" :key='index' @click="goShoopTakeNotesClick(item.user_id)">
                <div>
                    <span class="userKeys">{{item.user_name}}  <span>{{item.mobile}}</span> </span>
                    <p>{{item.create_at}}</p>
                </div>
                <img src="../../assets/images/iconfontjiantou5.png" alt="">
            </div>
        </div>  

        <div v-else style="margin-top:150rpx;text-align:center;">暂无数据...</div>     
    </div>
</template>

<style lang="scss" >
page{
    background: #f7f7f7;
    font-size: 28rpx;
}
  .h_left{
    display: flex;
    align-items: center
  }
  .h_left img{
      width: 28rpx;
      height: 28rpx;
      margin-right: 10rpx;
  }
  .widths{
    margin: 20rpx 30rpx;
    background: #fff;
    padding: 12rpx 0;
    padding-left: 30rpx;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
    .home .h_title{
      background: #f7f7f7;
    }

 //列表渲染
    .list{
        margin: 0 30rpx;
        background: #FFF;
        padding: 16rpx 30rpx;
        border-radius: 16rpx;
        .flexsContent{
            display: flex;
            align-items: center;
            margin-bottom: 40rpx;
            border-bottom: 1px solid #ccc;
            padding-bottom: 20rpx;
        >div{
            width: 100%;
            .userKeys{
                span{
                    margin-left: 30rpx;
                }
            }
            p{
                font-size: 24rpx;
                color: #999;
                margin-top: 10px;
            }
        }
        >img{
             width: 40rpx;
             height: 45rpx;
           }
       }
       .flexsContent:last-of-type{
           border: 0;
       }
    }
       
</style>

<script>
    export default {
       name:'index' ,
       data(){
           return{
               list:[],
               setCookie:[],
               isSearch:'',
           }
       },
       methods:{
           //渲染列表数据
           userVisitShopRecord(){
               this.api.userVisitShopRecord().then(res=>{
                   this.setCookie = res.data;
                   this.list = res.data
               })
           },
           //点击跳转
           goShoopTakeNotesClick:function(e){
                
               this.api.viewByUserId(e).then(res => {

                   wx.navigateTo({
                     url:'../userCanCodeInfoMation/main?item='+JSON.stringify(res.data)+''
                   })

               })
           },
           //搜索条件  1.2晚有问题
           searchData(e){
                let val = e.target.value;
                this.isSearch = val;
                if(val == ''){
                    this.list = this.setCookie
                }
           },
           bindconfirm(e){
                 this.api.userVisitShopRecord(e.target.value).then(res=>{
                     this.list = res.data
                })
           }
           
       },
       mounted(){
           this.userVisitShopRecord()
       }
    }
</script>
