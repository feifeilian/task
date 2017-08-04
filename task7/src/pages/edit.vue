<template>
  <div id="edit" class="todolist">
     <div class="header">
            <span><v-touch tag="button" @tap="cancel">cancel</v-touch></span>
           <span>todolist</span>
           <span><v-touch tag="button" @tap="save">done</v-touch></span>
    </div>
    <div class="content-body">      
    	<div class="choose">
    	    <div class="priority">
    	        <v-touch :class="['item priority-item',{active:content.priority=='high'}]" @tap="choosePriority('high')"><span class="high"></span> 高优</v-touch>
    	        <v-touch :class="['item priority-item',{active:content.priority=='mid'}]" @tap="choosePriority('mid')"><span class="mid"></span> 中优</v-touch>
    	        <v-touch :class="['item priority-item',{active:content.priority=='low'}]" @tap="choosePriority('low')"><span class="low"></span> 低优</v-touch>
    	    </div>
    	    <div class="shedule">
    	        <v-touch :class="['item priority-item',{active:content.status=='ing'}]" @tap="chooseStatus('ing')"><span class="ing"></span> 进行中</v-touch>
    	        <v-touch :class="['item priority-item',{active:content.status=='will'}]" @tap="chooseStatus('will')"><span class="will"></span> 待办</v-touch>
    	        <v-touch :class="['item priority-item',{active:content.status=='done'}]" @tap="chooseStatus('done')"><span class="done"></span> 已完成</v-touch>
    	    </div>
    	</div>
        <textarea name="" id="" cols="30" rows="10" class='text-input' v-model="content.text"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit',
   components:{
},
    props:['editdata','taskdata','saveData','cancelData'],
  data(){
    return {
    	one:false,
        content:{},
    }
  },
methods:{
    choosePriority(pri){
        this.content.priority=pri;
    },
    chooseStatus(sta){
        this.content.status=sta;
    },
    cancel(){
            this.cancelData();
            this.$router.push('/');         
    },
    save(){
        this.saveData(this.content);
        this.$router.push('/');      
      },
},
mounted(){
    this.content=this.editdata;
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
    display: none;
    span {
        flex: 1;
        align-self: center;
        text-align: center;
    }
}

.status {
    left: 0;
    border-left: none;
    border-right: 1px solid @bordercolor;
    .operate
}
.text-input {
    margin-top: 20px;
    width: 100%;
    min-height: 200px;
    .border
}


</style>

