<template>
    <div class="modal"
         :class="[isShow?'':isShowModal?'hideBg':'']"
         :style="{height:height+'px'}"
         v-show="isShowModal">
        <div class="modal_content"
             :class="isShow?'showModal':'hideModal'">
          <div class="item" :style="{borderTop:'none'}"  v-if="type!='order'">
            <span class="i_title">分类</span>
            <checkbox-group id="classification" @change="radioChange">
              <div class="disflexs">
                <label class="radio" v-for="(item,index) in items.classification" :key="item.id">
                  <checkbox :value="item.id"  :checked="item.checked" color="#FF5D22"/>
                  {{item.name}}
                </label>
              </div>
            </checkbox-group>

          </div>
          <div class="item">
            <span class="i_title">时间</span>
            <radio-group id="time" @change="radioChange">
              <div class="radio-group">
                <label class="radio" v-for="item in items.time" :key="item.id">
                  <radio :value="item.id" :checked="item.checked" color="#FF5D22" />
                  {{item.name}}
                </label>
              </div>
            </radio-group>
          </div>
          <!--<div class="item">-->
            <!--<span class="i_title">门店</span>-->
            <!--<radio-group id="store" @change="radioChange">-->
              <!--<div class="radio-group">-->
                <!--<label v-for="item in items.store" :key="item.id">-->
                  <!--<radio class="radio" :value="item.id" :checked="item.checked" color="#FF5D22" />-->
                  <!--{{item.name}}-->
                <!--</label>-->
              <!--</div>-->
            <!--</radio-group>-->
          <!--</div>-->
          <div class="foot">
            <div class="clear" @click="clear">清空</div>
            <div class="confirm" @click="confirmData">确认</div>
          </div>
          <img @click="hideMenu" class="m_img" src="../assets/images/close.png"/>
        </div>
  </div>
</template>

<script>
  import state from '@/store/order'
  export default {
    name: "modalMenu",
    props:['type'],
    data(){
      return{
        disable:false,
        //删选选项
        items:{
            classification:[
              {id:'',name:'全部',checked:true},
              {id:1,name:'待转单',checked:false},
              {id:0,name:'待支付',checked:false},
              {id:2,name:'已转单',checked: false},
              {id:-2,name:'已退单',checked:false},
              {id:-1,name:'已取消',checked:false},
            ],
            time:[
              {id:30,name:'最近一个月',checked:false},
              {id:90,name:'最近三个月',checked:false},
              {id:'',name:'全部',checked:true}
            ],
            store:[
              {id:0,name:'门店1',checked:true},
              {id:1,name:'门店2',checked:false},
              {id:2,name:'门店3',checked:false},
              {id:3,name:'门店4',checked:false}
            ]
        },
        //删选选择
        checkItems:{
          //分类
          classification:0,
          //时间
          time:30,
          //门店
          store:0
        },
        calss:'',
        //屏幕高度
        height:wx.getSystemInfoSync().windowHeight,
        as_type: '',
        as_time:'',
        as_order:0
      }
    },
    methods:{
      //分类选择
      radioChange(e){
        let id = e.target.id;
        let item = this.$data.checkItems;
        let index = e.target.value;
        switch (id) {
          case 'classification':
              let val = e.target.value;
              var some = val.some(item=>item=='');

               if(val.length>=1){
                  this.$data.as_type = val.filter(item=>item).join(',');
                }

                if(some && val.length==1){
                  this.$data.as_type = ''
                }
       
              break;
          case 'time':
              this.$data.as_time = index;
              break;
          case 'store':
              item.store = index;
              break;
        }
        this.$data.checkItems = item;
      },
      //隐藏菜单
      hideMenu(){
        state.commit('hideState');
        this.$data.as_type='';
        this.$data.as_time=''
        this.as_order = ''

      },
      //清空
      clear(){
        this.$data.checkItems = {};
        this.hideMenu();
      },
      //确定
      confirmData(e){
        this.$data.checkItems.classification = this.$data.as_type ;
        this.$data.checkItems.time = this.$data.as_time || '';


//预约查询 新字段：orderList
        if(this.type==='orderList'){
          this.$data.checkItems.classification = this.$data.as_type;
        }


        let item = this.$data.checkItems;

        this.$emit('filter',item);
        state.commit('checkedBtn',item);

        state.commit('hideState');
        // this.as_type=0;
        // this.as_time=30
      }
    },
    computed:{
      isShowModal(){
        return state.state.isShowModal;
      },
      isShow(){
          return state.state.isShow;
      }
    },
    onUnload(){
      state.commit('hideState');
    },
    onShow(){

      if(state.state.checkedChange){
        var items = this.items;

        var changes = state.state.checkedChange;

        var classification = changes.classification.split(','); //筛选的选项

        var time = changes.time //筛选的时间

        var datas = {
          store: 0,
          classification:changes.classification,
          time:changes.time 
        };


console.log(classification,"classification")

const result = items.classification.filter(item => classification.map(val => {
  let v1 = Object.assign({},item);
console.log(v1,"v1")
   if(item.id == val){
      v1.checked = true
   }
   return v1
}))

console.log(result,"result")


  
        items.time.filter( (obj) => {
          if( obj.id == time){
            obj.checked = true
          }else{
            obj.checked = false
          }
        })

        this.$data.items = items;

        this.$emit('filter',datas);
      }
      
    },
    mounted(){
      let items = this.items;

      if(this.type==='orderList'){
        this.$data.as_type = ''
        var temp = [
          {id:'',name:'全部',checked:true},
          {id:0,name:'待量尺',checked:false},
          {id:1,name:'已取消',checked:false},
          {id:2,name:'已完成',checked:false}
        ];
        items.classification = temp;
        this.items = items;
      }
    }
  };
</script>

<style lang="scss">
  $fontColor: #999;
  $fontSize: 13px;
  .modal{
    position: fixed;
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    font-size: $fontSize;
    font-color:$fontColor;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    .modal_content{
      position: relative;
      transition: all .3s ease 0s;
      padding-top: 20px;
      background-color: #ffffff;
      .item{
        padding-top: 10px;
        background-color: #ffffff;
        z-index:99;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-bottom: 20px;
        border-top:1px solid rgba(180,180,180,0.1);
        .i_title{
          padding-left: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .radio-group{
          display: flex;
          justify-content: space-between;
          width: 95%;
          flex-wrap: wrap;
          margin: 0 auto;
          .radio{
            margin-left: 10px;
            margin-top: 10px;
          }
        }
      }
      .foot{
        background-color: #ffffff;
        display: flex;
        font-size: 15px;
        .clear{
          flex: 1;
          text-align: center;
          background-color: #E9E9E9;
          color: #999999;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .confirm{
          flex: 1;
          border-left: 1px solid rgba(180,180,180,0.3);
          text-align: center;
          background-color: #FF5D22;
          color: #ffffff;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
      .m_img{
        position: absolute;
        width: 20px;
        height: 20px;
        top: 10px;
        right: 15px;
      }
    }
  }
  .showModal{
    transform: translateY(0px);
  }
  .hideModal{
    transform: translateY(350px);
  }
  .hideBg{
    animation: hide .3s;
  }
  .pauseAnimation{
    animation: hide 0s!important;
  }
  @keyframes show{
    from{background-color: rgba(0,0,0,0)}
    to{background-color:rgba(0,0,0,0.6)}
  }
  @keyframes hide{
    from{background-color: rgba(0,0,0,0.6)}
    to{background-color: rgba(0,0,0,0)}
  }
  radio{
    width:25px;
    height:25px;
  }
  /*checkbox 整体大小  */
  checkbox {
    width: 60rpx;
    height: 90rpx;
  }
  /*checkbox 选项框大小  */
  checkbox .wx-checkbox-input {
    width: 48rpx;
    height: 48rpx;
  }
  /*checkbox选中后样式  */
  checkbox .wx-checkbox-input.wx-checkbox-input-checked {
    background: #FF5D22;
  }
  /*checkbox选中后图标样式  */
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
    width: 28rpx;
    height: 28rpx;
    line-height: 28rpx;
    text-align: center;
    font-size: 22rpx;
    color: #fff;
    background: transparent;
    transform: translate(-50%, -50%) scale(1);
    -webkit-transform: translate(-50%, -50%) scale(1);
  }

  .disflexs{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 40rpx;
    padding-top: 30rpx;

    .radio{
      width: 170rpx;
      box-sizing: border-box;
    }

  }
</style>
