<template>
<ObjectList :fieldName="fieldName" :url="url" :routerUrl="routerUrl"></ObjectList>
</template>

<script>
import ObjectList from '@/components/ObjectList.vue';
export default {
    name:"FieldListView",
    components:{
        ObjectList
    },
    data() {
          return {
              fieldName:["Tarla İsmi","Dönüm"],
              datas:[],
              url:"http://localhost:8081/api/v1/field",
              routerUrl:"/field/detail/"
          }
      },
};
</script>

<style>
</style>