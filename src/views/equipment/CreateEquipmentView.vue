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
              v-for="(option, key, index) in options"
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
  name: "CreateEquipmentView",
  data() {
    return {
      options: null,
      data: {
        name: null,
        equipmentType: null,
      },
      postEquipmentUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment",
      getTypeUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/equipment-type",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.postEquipmentUrl, requestOptions)
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
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(this.getTypeUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => (_this.options = data));
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