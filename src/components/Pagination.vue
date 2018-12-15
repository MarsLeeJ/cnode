<template>
    <div class="pagination">
        <button class="firstpage" @click="chooseFirstPage">首页</button>
        <button class="lastpage" @click="chooseLastPage">上一页</button>
        <button v-if="flag">...</button>
        <button class="numpage" v-for="(page, index) in btnpages" :class="{active:currentpage==page}" @click="choosePage(page, index)">{{page}}</button>
        <button>...</button>
        <button class="nextpage" @click="chooseNextPage">下一页</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            btnpages: [1,2,3,4,5],
            currentpage: 1,
            currentIndex:0,
            flag:false
        }
    },
    methods: {
        choosePage(page, index){
            console.log("page:",page)
            console.log("index:", index)
            if(page < 1){
                return
            }
            if(index > 4 || index < 0){
                return
            }
            this.currentpage = page
            this.currentIndex = index
            if(this.currentpage < 5){
                this.flag = false
            }else{
                this.flag = true;
            }
            if(index === 4){
                this.btnpages.shift();//移除第一个元素
                this.btnpages.splice(4,0,this.btnpages[3]+1);//添加最后一个
            }else if(index === 0 && this.btnpages[0] > 1){
                this.btnpages.unshift(this.btnpages[0]-1);
              //移除最后一个数字
                this.btnpages.splice(5,1);
            }
            this.$emit('handleList',this.currentpage)
        },
        chooseLastPage(){
            var page = this.currentpage-1;
            var index = this.currentIndex==0?0:this.currentIndex-1;
            this.choosePage(page, index)
        },
        chooseNextPage(){
            var page = this.currentpage+1;
            var index = this.currentIndex==4?4:this.currentIndex+1
            this.choosePage(page, index)
        },
        chooseFirstPage(){
            this.choosePage(1,0);
            this.btnpages=[1,2,3,4,5]
        }
    }
}
</script>

<style>
.pagination {
    width:80%;
    margin: 10px auto;
    border: 1px solid rgb(133,133,133);
    border-radius: 5px;
    background-color: white;
    padding: 5px;
}
.pagination button {
    width: 50px;
    height: 25px;
    text-align: center;
    font-weight: bold;
    outline: none;
    border: 1px solid rgb(133,133,133);
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
    color:rgb(133,133,133);
}
.pagination button.active {
    background-color: rgb(133,133,133);
    color: white;
}
.pagination button:hover {
    cursor: pointer;
}
</style>
