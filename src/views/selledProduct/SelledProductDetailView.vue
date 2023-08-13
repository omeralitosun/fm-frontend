<template>
  <div class="detail">
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
      url: "http://localhost:8081/api/v1/selledProduct/" + this.id,
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