<template>
    <div v-if="hideModel">
        <div class="showMdel" @click="hideModelbtn"></div>
        <div class="modelWidth">
            <p>申请提现</p>
            <div v-if="list.length==0">
                暂无数据
            </div>
            <div v-if="list.length!=0">
                <div class="topTab">
                    <div>
                        <span>全选</span>
                        <checkbox-group @change="checkboxChangeAll">
                            <checkbox value="" :checked="checked"/>
                         </checkbox-group>
                    </div>
                    <p>项目名称</p>
                    <p>提现金额</p>
                </div>
                <div v-for="(arr,index) in list" :key="arr" class="productName">
                     <div>
                         <span></span>
                         <checkbox-group @change="checkboxChange" :data-index='index'>
                          <checkbox :value="arr.val" :checked="arr.checked"/>
                         </checkbox-group>
                     </div>
                     <p>{{arr.project_name}}</p>
                     <p>{{arr.cashout_money?arr.cashout_money:0}}</p>
                </div>
                <div class="btnBootom">
                    <div class="cancelBtn" @click="hideModelbtn">取消</div>
                    <div class="true" @click="trueBtns">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'cash',
    props:['item','hideModel'],
    data(){
        return{
            checked:false,
            list:[]
        }
    },
    watch:{
        item(newVal,oldVal){
            if(newVal){
                var arr = [];
                for(var i=0;i<newVal.length;i++){
                    newVal[i].checked = false 
                    newVal[i].val = newVal[i].project_id
                    newVal[i].cashout_money = Math.round((newVal[i].cashout_money) * 100) / 100;
                }
                this.list = newVal
            }
            
        }
    },
    onShow(){
         Object.assign(this.$data, this.$options.data());
    },
    methods:{
        checkboxChangeAll(){
            this.checked=!this.checked;
        
            var list = this.list;
            for(var i=0;i<list.length;i++){
                list[i].checked = this.checked;
            }
            this.list = list;
        },
        checkboxChange(e){
            console.log(e);
            var val = e.mp.detail.value[0];
            var index = e.target.dataset.index;

            var list = this.list;
           
           if(val){
               //全选
               for(var i=0;i<list.length;i++){
                  if(val==list[i].val){
                      list[i].checked = true
                  }
               }
           }else{
               //取消
               this.checked = false;
               for(var i=0;i<list.length;i++){
                   list[index].checked = false
               }
           }
           //单选都选，全选打开
            var allChagen =  list.every(item => item.checked == true);
            if(allChagen){
                this.checked = true
            }
           this.list = list

        },
        hideModelbtn(){
            this.checked = false;

            this.list.map(val => {
                val.checked = false
                return  val
            })

            this.$emit('cashModel',false)
        },
        trueBtns(){
            console.log(this.list)
            var list = this.list;

            var newListStr = list.map(item =>{
                 if(item.checked){
                     return item.project_id
                 }
             }).join(',');

             var newListMoney = list.map(item =>{
                 if(item.checked){
                     return item.cashout_money
                 }
             })


            if(newListStr==''){
                 wx.showToast({
                    title: '请选择项目',
                    icon: 'none',
                    duration: 1200
                })
                return
            }

            var intMoney=0;
            for (var i=newListMoney.length-1; i>=0; i--) {
                intMoney += newListMoney[i];
            }

            if(intMoney==0){
                 wx.showToast({
                    title: '提现金额不得小于0',
                    icon: 'none',
                    duration: 1200
                })
                return
            }

           
            this.api.cashoutApply(newListStr).then(res=>{
                if(res.resultCode == 1000){
                    wx.showToast({
                        title: '申请成功',
                        icon: 'none',
                        duration: 1200,
                        success:()=>{
                            this.hideModelbtn();

                            this.$emit('success',true)
                        }
                    })
                }
            }).catch(res=>{
                 wx.showToast({
                    title: res.error,
                    icon: 'none',
                    duration: 1200
                })
            })
        }
    }
}
</script>
<style lang="scss">
checkbox{
    width: auto !important;
    height: auto !important;
}
    .modelWidth{
        width: 90vw;
        background: #FFF;
        text-align: center;
        padding:20px 0;
        font-size: 14px;
        position: fixed;
        top: 20%;
        left: 50%;
        margin-left: -45vw;
        .btnBootom{
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 30px;
            >div{
                padding: 6px 20px;
                font-size: 14px;
                border: 1px solid #ccc;
                border-radius: 8px;
                text-align: center;
            }
            >div:last-of-type{
                background: blue;
                color: #FFF;
            }
        }
        >p{
            color: blue;
            margin-bottom: 20px;
        }
        .topTab,.productName{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            span{
                flex: 2;
            }
            p{
                flex: 1;
            }
            div{
                display: flex;
                align-items: center;
                flex: 0.6;
            }
        }
    }
    
    .showMdel{
        background: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
</style>