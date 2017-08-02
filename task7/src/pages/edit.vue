<template>
  <div id="edit" class="todolist">
    <navbar :titles="titles"></navbar>
    <div class="content-body">      
    	<div class="choose">
    	    <div class="priority">
    	        <div :class="['item priority-item',{active:content.priority=='high'}]"><span class="high"></span> 高优</div>
    	        <div :class="['item priority-item',{active:content.priority=='mid'}]"><span class="mid"></span> 中优</div>
    	        <div :class="['item priority-item',{active:content.priority=='low'}]"><span class="low"></span> 低优</div>
    	    </div>
    	    <div class="shedule">
    	        <div :class="['item priority-item',{active:content.status=='ing'}]"><span class="ing"></span> 进行中</div>
    	        <div :class="['item priority-item',{active:content.status=='will'}]"><span class="will"></span> 待办</div>
    	        <div :class="['item priority-item',{active:content.status=='done'}]"><span class="done"></span> 已完成</div>
    	    </div>
    	</div>
        <textarea name="" id="" cols="30" rows="10" class='text-input' v-model="content.text"></textarea>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
export default {
  name: 'edit',
   components:{
    navbar,
},
    props:['editdata'],
  data(){
    return {
    	one:false,
        content:{},
        titles:[
        {
                "name":'cancle',
                "to":'/',
            },
             {
                "name":'todolist',
                "to":'',
            },
             {
                "name":'done',
                "to":'/',
            }
        ],
    }
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

