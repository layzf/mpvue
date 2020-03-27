<template>
    <div class="modelText" v-if="hiddens">
        <div class="modelRgba"></div> 
        <div class="modelCotent">
            <h3>请输入转单码</h3>
            <div>
                <input class="i_input" placeholder="在此输入转单码后转单"  @input="getCode"/>
            </div>
            <div class="tDiagoBotton">
                <div @click="getfalse">取消</div>
                <div @click="getTrue">确认</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'diago',
    props:[
        'hiddens','codeAndMobile'
    ],
    data(){
      return{
        code:''
      }
    },
    mounted(){
       
    },
    watch:{
        t_diago(val){
            console.log(val,"val1231")
            this.t_diago = val
        },
        codeAndMobile(val){
            console.log('codeAndMobile搜索:',val)
        }
    },
    methods:{
            //输入转单码
      getCode(e){
        console.log('e',e);
        let val = e.target.value;
        this.code = val;
      },
      //确认按钮
      getTrue:function(){
          console.log("Aaaa")
          this.$emit('getTrue',this.code)
      },
      //取消按钮
      getfalse:function(){
          this.$emit('getfalse')
      }
    }


}
</script>

<style lang="scss" >
    .modelText{
        text-align: center;

        .modelRgba{
            position:fixed;
            width: 100%;
            height: 100%;
            background: rgba( 0,0,0,0.5);
            top: 0;
            left: 0;
        }

        .modelCotent{
            z-index: 9999;
            width: 100%;
            position: fixed;
            top: 300rpx;
            left: 50%;
            width: 90vw;
            margin-left: -45vw;
            background: #F2F2F2;
            padding: 70rpx 0;

            input{
                width: 70vw;
                border: 1px solid #ccc;
                margin: 0 auto;
                font-size: 28rpx;
                margin-top: 40rpx;
                height: 70rpx;
                line-height: 70rpx;
            }

            .tDiagoBotton{
                display: flex;
                align-items: center;
                justify-content: space-around;
                font-size:28rpx;
                margin-top: 40rpx;

                div{
                    padding: 10rpx 60rpx;
                    border-radius: 10rpx;
                    border: 1px solid #999;
                }
                >div:last-of-type{
                    background: #FF6633;
                    color: #fff;
                    border-color: #FF6633;
                }
            }

        }
    }
    
</style>