<template>
  <div id="bottom">
    <v-touch :class="['filter',{active:one}]" @tap="changeList(true)">oneThing</v-touch>
    <v-touch :class="['filter',{active:!one}]" @tap="changeList(false)">allThing</v-touch>
  </div>
</template>

<script>
export default {
  name: 'bottom',
  props:{
    one:{
      required:true,
      type:Boolean,
    },
    changeList:{
      required:true,
      type:Function,
    }
  },
  
}
</script>

<style scoped lang='less'>
 #bottom{
  width:100%;
  background-color: #D8D8D8;
  font-size: 0;
  position: fixed;
  bottom: 0;
  .filter{
    width: 50%;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    &.active{
      background-color: yellow;
    }
  }

 }

</style>
