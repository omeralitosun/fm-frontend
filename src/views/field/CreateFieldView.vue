<template>
 <div class="create">
    <div class="content">
      <div class="item">
        <input type="text" name="name" placeholder="Tarla Adı" v-model="data.name"/>
      </div>
      <div class="item">
        <input type="number" name="decare" placeholder="Dönüm" v-model="data.decare"/>
      </div>
    </div>
    <button class="btn-submit" @click="submit()">Kaydet</button>
  </div>
</template>

<script>
import router from '@/router';


export default {
    name:'CreateFieldView',
    data() {
        return {
        data:{
            name:null,
            decare:null
        },
        url:"http://localhost:8081/api/v1/field"
        }
    },
    methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.url, requestOptions)
        .then((response) => {if(response.ok){return response.json()}}
          
        )
        .then((data) =>router.push({path:'/field/detail/'+data.id}));
    },
  }
}
</script>

<style>
.create .btn-submit{
  position: absolute;
  left: 100px;
  bottom: 10px;
}
</style>