<template>
  <div class="detail">
    <div class="btn-group">
      <router-link :to="'/equipment/update/'+id"><button class="btn btn-warning">Güncelle</button></router-link>
      <button @click="del(id)" class="btn btn-error">Sil</button>
    </div>
    <div class="content">
      <div class="item">
        <label for="name">Ekipman Adı</label>
        <div type="text" name="name" id="name">{{ datas.name }}</div>
      </div>
      <div class="item">
        <label for="decare">Ekipman Tipi</label>
        <div type="text" name="type" id="type">{{ datas.equipmentType }}</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import router from '@/router';

export default {
  props: ["id"],
  data() {
    return {
      datas: {},
      url: process.env.VUE_APP_API_BASE_URL+"/api/v1/equipment/" ,
    };
  },
  methods: {
    del: function (key) {
      if (
        confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")
      ) {
        var url = this.url+key;
        const requestOptions = {
          method: "DELETE"
        };
        fetch(url, requestOptions)
          .then((response) => {
            if(response.status==204){
              router.push('/');
            }
          })
      }
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(_this.url + this.id, requestOptions)
      .then((response) => response.json())
      .then((data) => _this.datas=data);
  },
};
</script>
  
<style>
</style>