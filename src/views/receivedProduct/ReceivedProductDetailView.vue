<template>
  <div class="detail">
    <div class="btn-group" style="float: right;">
      <router-link :to="'/equipment/update/'+id"><button class="btn btn-warning">Güncelle</button></router-link>
      <button @click="del(id)" class="btn btn-error">Sil</button>
    </div>
    <div class="content">
      <div class="item">
        <label for="name">Ürün Adı</label>
        <div type="text" name="name" id="name">{{ datas.name }}</div>
      </div>
      <div class="item">
        <label for="decare">Miktar</label>
        <div type="text" name="type" id="type">{{ datas.amount }}</div>
      </div>
      <div class="item">
        <label for="decare">Birim</label>
        <div type="text" name="type" id="type">{{ datas.unit }}</div>
      </div>
      <div class="item">
        <label for="decare">Birim Fiyatı</label>
        <div type="text" name="type" id="type">{{ datas.unitPrice }}</div>
      </div>
      <div class="item">
        <label for="decare">Toplam Fiyat</label>
        <div type="text" name="type" id="type">{{ datas.totalPrice }}</div>
      </div>
      <div class="item">
        <label for="decare">Açıklama</label>
        <div type="text" name="type" id="type">{{ datas.comment }}</div>
      </div>
      <div class="item">
        <label for="decare">Tarih</label>
        <div type="text" name="type" id="type">{{ datas.date }}</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: ["id"],
  data() {
    return {
      datas: {},
      url:  process.env.VUE_APP_API_BASE_URL+"/api/v1/receivedProduct/" + this.id,
    };
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(_this.url, requestOptions)
      .then((response) => response.json())
      .then((data) => _this.datas=data);
  },
};
</script>
  
<style>
</style>