<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Tarla</label> <br />
          <select class="input" placeholder="Tarla" v-model="harvest.fieldId">
            <option disabled :value="null">Tarla</option>
            <option
              v-for="(field, index) in fields"
              :key="index"
              :value="field.id"
            >
              {{ field.name }}
            </option>
          </select>
        </div>
        <div class="item">
          <label>Ürün Adı</label> <br />
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Ürün Adı"
            v-model="harvest.name"
          />
        </div>
        <div class="item">
          <label>Miktarı</label> <br />
          <input
            class="input"
            type="number"
            name="amount"
            placeholder="Miktarı"
            v-model="harvest.amount"
          />
        </div>
        <div class="item">
          <label>Birim Fiyatı</label> <br />
          <input
            class="input"
            type="number"
            name="unitPrice"
            placeholder="Birim Fiyatı"
            v-model="harvest.unitPrice"
          />
        </div>
        <div class="item">
          <label>Tarih</label> <br />
          <input
            class="input"
            type="datetime-local"
            name="date"
            placeholder="Tarih"
            v-model="harvest.date"
          />
        </div>
        <div class="item">
          <label>Açıklama</label> <br />
          <input
            class="input"
            type="text"
            name="comment"
            placeholder="Açıklama"
            v-model="harvest.comment"
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
  name: "CreateActionTakenView",
  data() {
    return {
      harvest: {
        fieldId: null,
        name: null,
        amount: null,
        unitPrice: null,
        comment: null,
        date: null,
      },
      fields: null,
      postHarvestUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest",
      getFieldUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.harvest),
      };

      console.log(this.harvest);
      fetch(this.postHarvestUrl, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            this.$refs.alert.showAlert(
              "error",
              "Beklenmeyen bir hata oluştu. Kaydedilemedi",
              "Hata"
            );
          }
        })
        .then((data) => {
          this.$refs.alert.showAlert("success", "Kayıt Başarılı", "Başarılı");
          setTimeout(
            () => router.push({ path: "/harvest/detail/" + data.id }),
            1000
          );
        });
    },
    getFields: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getFieldUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          _this.fields = data;
        });
    },
  },
  created() {
    this.getFields();
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