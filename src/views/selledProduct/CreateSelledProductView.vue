<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Ürün Adı</label> <br />
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Ürün Adı"
            v-model="data.name"
          />
        </div>
        <div class="item">
          <label>Miktarı</label> <br />
          <input
            class="input"
            type="number"
            name="amount"
            placeholder="Miktarı"
            v-model="data.amount"
          />
        </div>
        <div class="item">
          <label>Birim</label> <br />
          <select class="input" v-model="data.unit" placeholder="Birim">
            <option disabled :value="null">Birim</option>
            <option
              v-for="(option, key, index) in options"
              :key="index"
              :value="option"
            >
              {{ key }}
            </option>
          </select>
        </div>
        <div class="item">
          <label>Birim Fiyatı</label> <br />
          <input
            class="input"
            type="number"
            name="unitPrice"
            placeholder="Birim Fiyatı"
            v-model="data.unitPrice"
          />
        </div>
        <div class="item">
          <label>Açıklama</label> <br />
          <input
            class="input"
            type="text"
            name="comment"
            placeholder="Açıklama"
            v-model="data.comment"
          />
        </div>
        <div class="item">
          <label>Tarih</label> <br />
          <input
            class="input"
            type="datetime-local"
            name="date"
            placeholder="Tarih"
            v-model="data.date"
          />
        </div>
      </div>
      <button class="btn btn-submit" @click="submit()">Kaydet</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateSelledProductView",
  data() {
    return {
      options: null,
      data: {
        name: null,
        amount: null,
        unit: null,
        unitPrice: null,
        comment: null,
        date: null,
      },
      postSelledUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/selledProduct",
      getUnitUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/unit",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.postSelledUrl, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.$refs.alert.showAlert("success", "Kayıt Başarılı", "Başarılı");
            setTimeout(
              () => router.push({ path: "/selled-product/detail/" + data.id }),
              1000
            );
          });
        } else {
          response.json().then((error) => {
            var messages = Object.keys(error.message).map(function (key) {
              return error.message[key];
            });
            this.$refs.alert.showAlert(
              "error",
              "Açıklama: \n" + messages,
              "Hata: Status " + response.status + ", " + error.type
            );
          });
        }
      });
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(this.getUnitUrl, requestOptions)
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