<template>
    <div :class="bg?'wbg':'bbg'" @click="toDesc" v-if="data">
      <img class="b_img" :src="data.img_url" v-if="data.img_url" alt='图片丢失了'/>
      <img class="b_img" src="../assets/images/default.png" v-else alt='图片丢失了'/>
      <div class="b_content">
        <div class="b_text">
          <span class="b_c_name">{{data.link_name?data.link_name+' '+data.link_mobile:data.business_name}}</span>
          <span class="b_c_content" v-if="data.village_name?true:false">{{data.village_name}} {{data.door_number}}</span>
          <span class="b_c_content"  v-if="data.project_name">{{data.project_name}}</span>
        </div>
        <div class="b_c_price" v-if="data.so_price===undefined">
            <span :style="{color: '#ed3f14'}">{{data.total_price?'订金:￥'+data.total_price || '0':data.position_name+data.shop_address || '订金:￥0'}}</span>
        </div>
        <div v-else >
            <div class="b_c_price2">
              <span class="b_c_price">项目订金:￥{{data.so_price}}</span>
              <span class="b_c_date" v-if="types!=1 && item.end_at">(有效期至:{{item.end_at}})</span>
            </div>
            <div class="orderMoneys">订金状态: <text>{{item.status}}</text></div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props:['bg','data','item','types'],
  data(){
    return {
      items:{},
      datas:'',
    }
  },
    mounted(){
      
    },

    methods:{
      toDesc:function(){
        this.$emit('toDesc',{id:this.$props.data.id,code:this.$props.data.user_code});
      }
    },
    watch:{
      data(val){
        // console.log('imgItme的data',val)

      },
      item(val){
        this.item = val;
      }

    }
  };
</script>

<style lang="scss">
    @mixin base($bg){
      background-color: $bg;
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid rgba(180,180,180,0.2);
      padding-left: 30rpx;
      @if $bg == #ffffff{
        margin-bottom: 10px;
      }
      & .b_img{
        @if $bg == #ffffff{
          width: 100px;
          height: 100px;
        }@else{
          width: 70px;
          height: 70px;
        }
        border: 1px solid rgba(180,180,180,0.4);
      }
      & .b_content{
        display: flex;
        flex:1;
        flex-direction: column;
        /*justify-content: space-between;*/
        padding-left: 6px;
        position: relative;
        .b_text{
          display: flex;
          flex-direction: column;
        }
        .b_c_name{
          color: #333333;
          font-size:14px;
          font-weight: 600;
        }
        .b_c_content{
          color: #666666;
          padding-top: 6px;
          font-size: 13px;
          padding-right: 10px;
          font-size: 28rpx;
          color: #000;
          margin-bottom: 10rpx;
        }
        .b_c_price{
          font-size: 14px;
          color: #000;
        }
        .b_c_price2{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .b_c_price{
            font-size: 14px;
            color: #000;
          }
          .b_c_date{
            color: #999999;
            font-size: 26rpx;
          }
        }
      }
    }
    .wbg{
      @include base(#ffffff)
    }
    .bbg{
      @include base(#f7f7f7)
    }
  .orderMoneys{
    position: absolute;
    left: 12rpx;
    bottom: 0;
    text{
      color: #E94816;
    }
  }
</style>
