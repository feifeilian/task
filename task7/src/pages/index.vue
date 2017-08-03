<template>

  <div id="index" class="todolist">
    <div class="header">
           <span></span>
           <span>todolist</span>
           <span><v-touch tag="button" @tap="editData(-1)">add</v-touch tag="button"></span>
    </div>
    <div class="content-body">
        <div class="prompt" v-if="one" >Now! The One Thing is</div>        
            <div class="choose" v-else>
                <div class="priority">
                    <div :class="['item',{selected:priority.high}]" @click="prioritySelect('high')"><span class="high"></span> 高优</div>
                    <div :class="['item',{selected:priority.mid}]" @click="prioritySelect('mid')"><span class="mid"></span> 中优</div>
                    <div :class="['item',{selected:priority.low}]" @click="prioritySelect('low')"><span class="low"></span> 低优</div>
                </div>
                <div class="shedule">
                    <div :class="['item',{selected:status.ing}]" @click="statusSelect('ing')"><span class="ing"></span> 进行中</div>
                    <div :class="['item',{selected:status.will}]" @click="statusSelect('will')"><span class="will"></span> 待办</div>
                    <div :class="['item',{selected:status.done}]" @click="statusSelect('done')"><span class="done"></span> 已完成</div>
                </div>
            </div>
            <ul class="list">
                <v-touch tag="li" class="list-item" v-for='item in showdata'  @swipeleft="swipeLeft(item.id)" @swiperight="swipeRight(item.id)" >
                    <div class="status-icon">
                        <span :class='[item.status,item.priority]'></span>
                    </div>
                    <p>{{ item.text }}</p>
                    <div class="operate" v-if="item.id==editId">
                        <v-touch tag="span" @tap="editData(item.id)">编辑</v-touch>        
                        <v-touch tag="span" @tap="deleteData(item.id)">删除</v-touch>
                    </div>
                    <div class="status" v-if="item.id==statusId">
                        <v-touch tag="span"  @tap="changeStatus(item.id,'done')">已完成</v-touch>
                        <v-touch tag="span"  @tap="changeStatus(item.id,'will')">待办</v-touch>
                        <v-touch tag="span"  @tap="changeStatus(item.id,'ing')">进行中</v-touch>
                    </div>
                </v-touch>
            </ul>
    </div>
    <bottom :changeList="changeList" :one="one"></bottom>
  </div>
</template>

<script>
import bottom from '../components/bottom.vue'
export default {
    name: 'index',
    components:{
        bottom,
    },
    props:['taskdata','edit'],
    data(){
        return {
            priority:{
                high:false,
                mid:false,
                low:false,
            },
            status:{
                done:false,
                will:false,
                ing:false,
            },
            showdata:[],
            editId:-1,
            statusId:-1,
            one:false,
            titles:[
                {
                    "name":'',
                    "to":'',
                },
                 {
                    "name":'todolist',
                    "to":'',
                },
                 {
                    "name":'add',
                    "to":'/edit',
                }
            ],
        }
    },
    methods:{
        editData(id){
            this.$router.push('/edit')
            this.edit(id);
        },
        hiddenOp(){
            this.editId=-1;
            this.statusId=-1;
        },
        swipeLeft(id){
            this.editId=id;
            this.statusId=-1;
        },
        swipeRight(id){
            this.statusId=id;
            this.editId=-1;
        },
    showOne(){
        this.showdata=[]
        this.taskdata.forEach((task)=>{
            if(task.priority=='high'&&task.status=='ing'){
                this.showdata[0]=task;
                return;
            }
        })
    },
    showAll(){
        this.showdata=[]
        this.taskdata.forEach((task)=>{
            this.showdata.push(task);
        })
    },
    showFilter(){
        let priorityFilter={};
        let statusFilter={};
        for (let i in this.priority) {
            if(this.priority[i]){
                priorityFilter[i]=true
            }
        }
        for (let i in this.status) {
            if(this.status[i]){
                statusFilter[i]=true
            }
        }

        if(Object.keys(priorityFilter).length==0&&Object.keys(statusFilter).length==0){
            this.showAll();
        }else{
            
            this.showdata=[]
            for (var i = 0; i < this.taskdata.length; i++) {
                if(this.taskdata[i].priority in priorityFilter){
                    this.showdata.push(this.taskdata[i]);
                }
          if((this.taskdata[i].status in statusFilter)&&!(this.taskdata[i].priority in priorityFilter)){
            this.showdata.push(this.taskdata[i]);
          }
            }
            
        }

    },
    prioritySelect(type){
        this.priority[type]=!this.priority[type]
        this.showFilter()
    },
    statusSelect(type){
        this.status[type]=!this.status[type]
        this.showFilter()
    },
    changeList(type){
        if(type){
            this.one=true;
            this.showOne()
        }else{
            this.one=false;
            this.showAll()
        }
    },
    deleteData(id){
        this.showdata.forEach((item,index)=>{
            if(item.id==id){
              this.showdata=this.showdata.slice(0,index).concat(this.showdata.slice(index+1))
            }
        })
        this.hiddenOp()
    },
    changeStatus(id,status){

        this.showdata.forEach((item)=>{
            if(item.id==id){
                item.status=status;
            }
        })
        this.hiddenOp()
    } 
  },
  mounted(){
    this.showdata=this.taskdata;
  }
}


</script>

<style scoped lang='less'>
@bordercolor: #C0C3C6;
@mainwidth: 100%;
@navheight: 60px;
.border {
    border: 1px solid @bordercolor;
}
.circlr(@color) {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background-color: @color;
    .border
}
.header {
    width: @mainwidth;
    height: @navheight;
    line-height: @navheight;
    position: fixed;
    background-color: #D8D8D8;
    border-bottom: 1px solid @bordercolor;
    display: flex;
    font-weight: 700;
    font-size: 20px;
    top: 0;
    button {
        font-weight: 700;
        font-size: 20px;
        cursor: pointer;   
    } 
    span,a {
        flex: 1;
        text-align: center;
        cursor: pointer;
        padding: 5px 10px;
    }
}

.todolist {
    width: @mainwidth;
    min-height: 100vh;
    margin: 0 auto;
    .border
}
.content-body {
    margin: @navheight 0;
    padding: 0 10px;
}
.prompt {
    //display: none;
    font-size: 20px;
    padding: 10px;
}

.list {
    width: 100%;
    li {
        display: flex;
        position: relative;
        padding: 5px 10px;
        margin-top: 10px;
        .status-icon {
            width: 30px;
            height: 100%;
            align-self: center; // margin-right: 20px;
        }
        p {
            margin-left: 10px;
        }
        .text {
            padding-left: 20px;
        }
        .border
    }
}

.priority,
.shedule {
    //width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #FEEAEA;
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 5px 0;
    margin-left: -10px;
    margin-right: -10px;


    .item {
        flex: 1;
        cursor: pointer;
         margin: 0 10px;
        &.selected{
            background-color: purple;
        }
    }
    .priority-item,
    .status-item {
        //margin: 0 10px;
        .border
    }

    .item.active {
        border: 1px solid red;
    }

    .high {
        .circlr(@color: #CE0B24)
    }

    .mid {
        .circlr(@color: #F7E63B)
    }

    .low {
        .circlr(@color: #437414)
    }
}

.shedule {
    border-top: 1px solid @bordercolor;
    background-color: #ECFEEB;
}

.ing {
    display: inline-block;
    position: relative;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #D8D8D8;
}

.will {
    position: relative;
    display: inline-block;
    height: 16px;
    width: 16px;
    border: none;
    border-left: 5px solid #D8D8D8;
    &:after {
        content: '';
        display: 'block';
        position: absolute;
        left: 5px;
        height: 16px;
        border: none;
        border-left: inherit;
    }
}

.done {
    height: 16px;
    border: none;
    border-left: 16px solid #D8D8D8;
}

.list-item {
    .high {
        border-left-color: #CE0B24;
    }

    .mid {
        border-left-color: #F7E63B;
    }

    .low {
        border-left-color: #437414;
    }
}


.operate {
    width: 200px;
    height: 100%;
    background-color: #D8D8D8;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid @bordercolor;
    display: flex;
    //display: none;
    span,a{
        flex: 1;
        align-self: center;
        text-align: center;
        text-decoration: none;
        color:#000;
    }
}

.status {
    left: 0;
    border-left: none;
    border-right: 1px solid @bordercolor;
    .operate
}
</style>

