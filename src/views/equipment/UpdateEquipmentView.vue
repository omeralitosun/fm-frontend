<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <label for="name">Ekipman Adı: </label>
        <input
          type="text"
          name="name"
          placeholder="Ekipman Adı"
          v-model="datas.name"
        />
      </div>
      <div class="item">
        <label for="name">Ekipman Tipi: </label>
        <select v-model="datas.equipmentType" placeholder="Ekipman Tipi">
          <option disabled value="">Ekipman Tipi</option>
          <option
            v-for="(option, key, index) in options"
            :key="index"
            :value="option"
          >
            {{ key }}
          </option>
        </select>
      </div>
    </div>
    <button class="btn btn-submit" @click="submit()">Güncelle</button>
  </div>
</template>
  
  <script>
import router from "@/router";

export default {
  name: "UpdateEquipmentView",
  props: ["id"],
  data() {
    return {
      options: null,
      datas: {},
      url: "http://localhost:8081/api/v1/equipment/" + this.id,
    };
  },
  methods: {
    submit: function () {
      
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.datas),
      };
      fetch(this.url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => router.push({ path: "/equipment/detail/" + data.id }));
    },
  },
  mounted() {
    var _this = this;

    const requestOptions2 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(_this.url, requestOptions2)
      .then((response) => response.json())
      .then((data) => {
        _this.datas = data;

        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        fetch(
          "http://localhost:8081/api/v1/enums/equipment-type",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            _this.options = data;
            _this.datas.equipmentType=_this.options['Araba'];
        });
      });
  },
};
</script>
  
  <style>
.create .btn-submit {
  position: absolute;
  left: 100px;
  bottom: 10px;
}
</style>