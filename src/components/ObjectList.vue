<template>
    <div class="list">
      <table>
        <tr>
          <th></th>
          <th v-for="(value, index) in fieldName" :key="index">{{ value }}</th>
          <th></th>
        </tr>
        <tr v-for="(data, index) in datas" :key="index">
          <td v-for="(val, key, index) in data" :key="index">
              <div v-show="key!='id'">
                  {{ val }}
              </div>
          </td>
          <td>
              <router-link :to="routerUrl+data.id"><button>Detay</button></router-link>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
        props:['fieldName','url','routerUrl'],
        data() {
            return {
                datas:[],
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
  };
  </script>
  
  <style>
  </style>