<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Ekipman Adı</label> <br />
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Ekipman Adı"
            v-model="data.name"
          />
        </div>
        <div class="item">
          <label>Ekipman Tipi</label> <br />
          <select
            class="input"
            v-model="data.equipmentType"
            placeholder="Ekipman Tipi"
          >
            <option disabled :value="null">Ekipman Tipi</option>
            <option
              v-for="(option, key, index) in equipmentType"
              :key="index"
              :value="option"
            >
              {{ key }}
            </option>
          </select>
        </div>
      </div>
      <button class="btn btn-submit" @click="submit()">Kaydet</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UpdateEquipmentView",
  props: ["id"],
  data() {
    return {
      equipmentId: null,
      equipmentType: null,
      data: {
        name: null,
        equipmentType: null,
      },
      putEquipmentUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment/",
      getEquipmentUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment/" + this.id,
      getTypeUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/equipment-type",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.putEquipmentUrl + this.equipmentId, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            this.$refs.alert.showAlert(
              "error",
              "Beklenmeyen bir hata oluştu. Aksiyon Kaydedilemedi",
              "Hata"
            );
          }
        })
        .then((data) => {
          this.$refs.alert.showAlert("success", "Kayıt Başarılı", "Başarılı");
          setTimeout(
            () => router.push({ path: "/equipment/detail/" + data.id }),
            1000
          );
        });
    },
    getEquipmentType() {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getTypeUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => (_this.equipmentType = data));
    },
    getEquipment() {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(_this.getEquipmentUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          _this.equipmentId = data.id;
          _this.data.name = data.name;
          _this.data.equipmentType = _this.equipmentType[data.equipmentType];
        });
    },
  },
  mounted() {
    this.getEquipmentType();
    this.getEquipment();
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