<template>
    <div id="navbar" class="header">
        <router-link v-for='item in titles'  :to="item.to">
           <span><button>{{ item.name }}</button></span>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  props:{
    titles:{
      required:true,
      type:Array,
    },
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

</style>
