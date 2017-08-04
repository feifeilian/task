<template>
  <div id="app">
    <router-view :taskdata="taskdata" :edit='edit' :editdata="editdata" :saveData="saveData" :cancelData="cancelData"></router-view>   
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{
    editdata:{
      "text":"this is a new task",
      "priority": "low",
      "status": "will",
       "id":-1,
    },
  	taskdata:[
        {
            "text": "1Some important task which has hpriority,should be considered first.",
            "priority": "high",
            "status": "done",
            "id": 1
        }, {
            "text": "2Some important task which has hpriority,should be considered first.",
            "priority": "low",
            "status": "will",
            "id": 2
        }, {
            "text": "3Some important task which has hpriority,should be considered first.",
            "priority": "mid",
            "status": "ing",
            "id": 3
        }, {
            "text": "4Some important task which has hpriority,should be considered first.",
            "priority": "high",
            "status": "ing",
            "id": 4
        },
    ]
  	}
  },
  methods:{
    edit(id){
        this.taskdata.forEach((item)=>{
          if(item.id==id){
            Object.keys(item).forEach((k)=>{
              this.editdata[k]=item[k];
            })  
          }
        })
    
    },
    resetEdit(){
      this.editdata={
      "text":"this is a new task",
      "priority": "low",
      "status": "will",
       "id":-1,
    }
  },
   cancelData(){
      this.resetEdit();
   },
    saveData(content){   
      for (var i = 0; i < this.taskdata.length; i++) {
        if(this.taskdata[i].id==content.id){
          this.taskdata[i].text=content.text;
          this.taskdata[i].priority=content.priority;
          this.taskdata[i].status=content.status;
          this.resetEdit()
          return;
        }
      }
      content.id=Date.now();
      this.taskdata.push(content);
      this.resetEdit();
    }
  },
}
  
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
body {
    font-family: "Times New Roman", Times, sans-serif;
}
ul {
    list-style: none;
}
</style>
