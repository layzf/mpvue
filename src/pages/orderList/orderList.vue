<template>
   <div>
       <div class="posHeight">
         <div>
           <div class="seachs">
             <input type="text" placeholder="搜索用户昵称、手机号" @input="searchData">
             <icon type="search" size="20" color="#B2B2B2" />
           </div>
           <!--总数据-->
           <div class="filters">
             <span>用户预约量尺列表 ( {{records}} )</span>
             <div @click="showModal()">
               <img class="h_img" src="../../assets/images/filter.png" />
               <span>筛选</span>
             </div>
           </div>
         </div>
       </div>

     <!--列表循环-->
        <div class="contentList">
            <div v-for="(arr,index) in items" :key="arr.id" class="forList">
                <div class="titleTop">
                    <div>{{arr.appoint_time}}</div>
                    <span>{{arr.status==0?'等待量尺':arr.status==1?'已取消':'已完成'}}</span>
                </div>
<!--内容部分-->
                <div class="contentCenter">
                    <div class="starFlex">
                      <img :src="arr.project_img_url" alt="">
                      <div class="rightImgText">
                          <p>{{arr.link_name}} <span>{{arr.phone}}</span></p>
                          <div>
                            <p>{{arr.village_name}} <span>{{arr.building_no}}</span></p>
                            <p>预约时间：{{arr.appoint_time}}</p>
                          </div>
                      </div>
                    </div>
                    <div class="playTell">
                      <img src="../../assets/images/icon_dh@2x.png" alt="" @click="tells" :data-phone="arr.phone">
                    </div>
                </div>
<!--底部选择按钮-->
                <div class="btns">
                   <div v-if="arr.status==0" :data-id="arr.id" @click="cancellationScale" id="'cance">取消量尺</div>
                   <div v-if="arr.status==0" :data-id="arr.id" @click="cancellationScale" id="end">已量尺</div>


<!--                   <div v-if="arr.status==1">已取消</div>-->
<!--                   <div v-if="arr.status==2">已完成</div>-->
                </div>
            </div>
        </div>

     <!--筛选菜单-->
     <modal-menu @filter="filter" :type="'orderList'"></modal-menu>

    </div>
</template>

<script>

  import modalMenu from '@/components/modalMenu';
  import state from '@/store/order';

  export default {
    data () {
      return {
        filterTrue:false,
        cursor:'',
        loadData:true,
        page:1,
        pageSize: 10,
        searchKey:'',
        status:'',
        nearDays:'',
        items:[],
        records:0//总数据
      }
    },
    components:{
      modalMenu
    },
    mounted(){
      Object.assign(this.$data, this.$options.data())
      this.selectRzApointRecordList()  //数据加载
    },
    methods: {
      //取消量尺
      cancellationScale:function(e){
        console.log(e)
        var that = this
        var pId = e.currentTarget.dataset.id
        var data={
          id:pId,
          status:1
        }
//已完成
        if(e.currentTarget.id=='end'){
          data.status = 2
        }

        wx.showModal({
          title:'提示',
          content:data.status==1?'确认取消该订单？':'是否已上门量尺？',
          success(res) {
            if (res.confirm) {
              that.updateApointRecord(data)
            }
          }
        })


      },
      //取消，完成订单
      updateApointRecord:function(data){
        var that = this

        that.api.updateApointRecord(data).then(res=>{
          that.items = [];
          that.page = 1;

          that.loadData = true;

          wx.showToast({
            title:'取消成功',
            duration:1000,
            success(res) {
              that.selectRzApointRecordList()
            }
          })
        })
      },
      //拨打电话
      tells:function(e){

        var phone = e.currentTarget.dataset.phone;

        wx.makePhoneCall({
          phoneNumber: phone //仅为示例，并非真实的电话号码
        })

      },
      //筛选弹框
      showModal(){
        if(state.state.isShowModal){
          state.commit('hideState');
        }else{
          state.commit('changeState');
        }
      },
      selectRzApointRecordList:function(){
        if(!this.cursor){
          wx.showLoading({ title:'加载中' })
        }

        var rdata = this.$data.items
        var data={
          searchKey:this.$data.searchKey || '',
          status:this.status || '',
          page:this.page,
          nearDays:this.nearDays,
          pageSize:this.pageSize
        };

        this.api.selectRzApointRecordList(data).then(res=>{
          wx.hideLoading();

          for(var i=0;i<res.data.length;i++){
            res.data[i].appoint_time = res.data[i].appoint_time.slice(0,10)
            rdata.push(res.data[i]);
          }
//内容不为空 或者 有搜索内容
          if(res.data=='' || this.cursor ){
            this.loadData = false
          }

//筛选过或者 有关键词搜索
          if(this.filterTrue || this.cursor){
            this.items = [];
            this.items = this.items.concat(res.data)
          }else{
            if(res.data!=''){
              this.items = rdata
            }

          }

          this.records = res.records

        })
      },
      //搜索关键字
      searchData:function(e){
        var val = e.target.value
        var cursor = e.target.cursor;

        this.page = 1
        this.pageSize =  cursor? 10000:10
/**
*     输入框清空的时候，items 为 空
*/
        if(!cursor){
          this.items = [];
        }
/**
 * 输入框清空的时候，允许上拉 否 禁止上拉;
 * 搜索返回的数据是全部的数据
 * **/
        this.loadData = cursor? false : true

        this.$data.searchKey = val
        this.cursor = cursor


        this.selectRzApointRecordList()
      },
      filter:function(e){
        this.page = 1
        this.nearDays = e.time
        this.status = e.classification

        this.filterTrue = true

        this.loadData = true

        this.selectRzApointRecordList()
      },
      _filterList: function (res, text) {

        var newlist = [];
        res.filter(item => {
          if (item.phone.includes(text) || item.link_name.includes(text)) {
            newlist.push(item)
          }
        })

        return newlist
      },

    },
    onReachBottom:function(){

      this.page = this.page+1
      this.filterTrue = false

      if(!this.loadData){
        wx.showToast({
          title:'暂无数据',
          icon:'none'
        })
      }else{
        this.selectRzApointRecordList()
      }

    }
  }
</script>

<style lang="scss">
  page{
    background: #FFF;
  }
  .posHeight{
    height: 250rpx;
    >div{
      position: fixed;
      top: 0;
      width: 100%;
      background: #FFF;
    }

  }
  .contentList{
    >.forList{
      border-bottom: 30rpx solid #f7f7f7;
      padding-bottom: 20rpx;
    }
    .forList:last-of-type{
      border: none;
    }
    .titleTop{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25rpx;
      border-bottom: 1px solid #F7F7F7;
      height: 90rpx;
      font-size: 30rpx;
      color: #989898;
      >span{
        color: #ED6431;
      }
    }

    .contentCenter{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 25rpx;
      border-bottom: 1px solid #F7F7F7;
      padding: 20rpx 0 30rpx 0;
      .starFlex{
        display: flex;
        align-items: self-start;
        img{
          width: 120rpx;
          height: 120rpx;
          margin-right: 20rpx;
        }
        .rightImgText{
          font-size: 28rpx;
          flex: 1;
          >p{
            font-weight:bold;
            span{
              margin-left: 16rpx;
            }
          }

          div{
            margin-top: 15rpx;
            p{
              span{
                margin-left: 8rpx;
              }
            }
          }
        }
      }
      .playTell{
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #F7F7F7;
        img{
          width: 26rpx;
          height: 30rpx;
        }
      }

    }

    .btns{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0 25rpx;
      margin-top: 30rpx;
      div{
        border: 1px solid #9D9D9D;
        -webkit-border-radius: 100rpx;
        -moz-border-radius: 100rpx;
        border-radius: 100rpx;
        color: #000000;
        padding: 10rpx 25rpx;
        font-size: 30rpx;
      }
      div:last-of-type{
        color: #EC6634;
        border-color: #EC6634;
        margin-left:30rpx;
      }
    }
  }

  .filters{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F7F7F7;
    padding:0 28rpx;
    margin-top: 20rpx;
    height: 100rpx;
    span{
      font-size:30rpx;
    }
    div{
      display: flex;
      align-items: center;
      span{
        color: #6B6B6B;
      }
      img{
        width:35rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
  }
  .seachs{
    margin: 0 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F7F7F7;
    height: 80rpx;
    border-radius: 100rpx;
    margin-top: 30rpx;
    input{
      font-size:30rpx;
      padding-left:20rpx;
    }
    icon{
      margin-right: 45rpx;
    }
  }
</style>
