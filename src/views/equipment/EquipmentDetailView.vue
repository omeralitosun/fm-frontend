<template>
  <div class="detail">
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
export default {
  props: ["id"],
  data() {
    return {
      datas: {},
      url: "http://localhost:8081/api/v1/equipment/" + this.id,
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