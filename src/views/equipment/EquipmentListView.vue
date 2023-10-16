<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="list">
      <table style="margin: auto">
        <thead>
          <tr>
            <th scope="col" v-for="(value, index) in fieldName" :key="index">
              {{ value }}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, ind) in datas" :key="ind">
            <td
              :data-label="fieldName[index]"
              v-for="(val, key, index) in data"
              :key="index"
            >
              <div v-if="key != 'id'">
                {{ val }}
              </div>
              <div v-else>
                {{ ind + 1 }}
              </div>
            </td>
            <td>
              <router-link :to="routerUrl + '/detail/' + data.id"
                ><button class="btn btn-submit">Detay</button></router-link
              >
              <router-link :to="routerUrl + '/update/' + data.id"
                ><button class="btn btn-warning">Güncelle</button></router-link
              >
              <button @click="del(data.id)" class="btn btn-error">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "EquipmentListView",
  data() {
    return {
      fieldName: ["*", "EKİPMAN", "TİPİ"],
      datas: [],
      url: process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment",
      routerUrl: "/equipment",
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
      .then((data) => (_this.datas = data));
    console.log(this.datas);
  },
  methods: {
    del: function (key) {
      if (
        confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")
      ) {
        var url = this.url + "/" + key;
        const requestOptions = {
          method: "DELETE",
        };
        fetch(url, requestOptions).then((response) => {
          if (response.status == 204) {
            this.$refs.alert.showAlert("success", "Kayıt Silindi", "Başarılı");
            setTimeout(() => router.go(0), 500);
          } else if (response.status == 409) {
            this.$refs.alert.showAlert(
              "error",
              "Bu kayıda ait başka alt kayıtları kontrol edip tekrar deneyin.",
              "Bu kayıdı silemezsiniz."
            );
          } else {
            this.$refs.alert.showAlert(
              "error",
              "Beklenmeyen bir hata oluştu",
              "Hata"
            );
          }
        });
      }
    },
  },
};
</script>

<style>
</style>