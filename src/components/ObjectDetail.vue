<template>
    <div class="field-detail">
      <div class="content" :id="datas.id"></div>
  
        <div v-for="(value, key, index) in datas" :key="index">
          <label :for="key">{{ fieldName[index-1] }}</label> 
          <div v-show="key!='id'" :id="key"> {{ value}}</div> <br>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      props:['fieldName','url'],
      data() {
          return {
              datas:{},
          }
      },
      mounted(){
          var _this=this;
          const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          };
          fetch(_this.url, requestOptions)
          .then((response) => response.json())
          .then((data) => (_this.datas=data));
      }
  }
  </script>
  
  <style>
  
  </style>