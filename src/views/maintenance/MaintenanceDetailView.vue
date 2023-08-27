<template>
  <div class="detail">
    <div class="content">
      <div class="item">
        <label for="name">Ekipman</label>
        <div type="text" name="type" id="type">
          <router-link :to="'/equipment/detail/' + returnId(equipment)">{{
            datas.equipment ? datas.equipment.name : ""
          }}</router-link>
        </div>
      </div>
      <div class="item">
        <label for="decare">Bakım Tipi</label>
        <div type="text" name="type" id="type">{{ datas.maintenanceType }}</div>
      </div>
      <div class="item">
        <label for="decare">Maliyet</label>
        <div type="text" name="type" id="type">{{ datas.cost }}</div>
      </div>
      <div class="item">
        <label for="decare">Tarih</label>
        <div type="text" name="type" id="type">{{ datas.date }}</div>
      </div>
      <div class="item">
        <label for="decare">Açıklama</label>
        <div type="text" name="type" id="type">{{ datas.comment }}</div>
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
      url: process.env.VUE_APP_API_BASE_URL + "/api/v1/maintenance/" + this.id,
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
      .then((data) => {
        _this.datas = data;
        _this.equipment = data.equipment;
      });
  },
  methods: {
    returnId: function (data) {
      return data ? data.id : "";
    },
  },
};
</script>
  
<style>
</style>