<template>
  <div class="detail">
    <div class="content">
      <div class="item">
        <label for="name">Yapılan İşlem</label>
        <div type="text" name="name" id="name">{{ datas.process }}</div>
      </div>
      <div class="item">
        <label for="decare">Maliyet</label>
        <div type="text" name="type" id="type">{{ datas.cost }}</div>
      </div>
      <div class="item">
        <label for="decare">Açıklama</label>
        <div type="text" name="type" id="type">{{ datas.comment }}</div>
      </div>
      <div class="item">
        <label for="decare">Tarih</label>
        <div type="text" name="type" id="type">{{ datas.date }}</div>
      </div>
      <div class="item">
        <label for="decare">Tarla</label>
        <div type="text" name="type" id="type">{{ datas.fieldId }}</div>
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
      url: "http://localhost:8081/api/v1/actionTaken/" + this.id,
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