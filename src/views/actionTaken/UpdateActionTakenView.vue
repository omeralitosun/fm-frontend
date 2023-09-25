<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Tarla</label> <br />
          <select class="input" placeholder="Tarla" v-model="action.fieldId">
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
          <label>Yapılan İşlem</label> <br />
          <select v-model="action.process" placeholder="İşlem" class="input">
            <option disabled :value="null">Yapılan İşlem</option>
            <option
              v-for="(option, key, index) in process"
              :key="index"
              :value="option"
            >
              {{ key }}
            </option>
          </select>
        </div>
        <div class="item">
          <label>Maliyet</label> <br />
          <input
            class="input"
            type="number"
            name="cost"
            placeholder="Maliyet"
            v-model="action.cost"
          />
        </div>
        <div class="item">
          <label>Tarih</label> <br />
          <input
            class="input"
            type="datetime-local"
            name="date"
            placeholder="Tarih"
            v-model="action.date"
          />
        </div>
        <div class="item">
          <label>Açıklama</label> <br />
          <input
            class="input"
            type="text-area"
            name="comment"
            placeholder="Açıklama"
            v-model="action.comment"
          />
        </div>
      </div>
      <!-- Harvest -->
      <div v-if="action.process == 'REAP'">
        <button
          style="background-color: green; color: aliceblue; padding: 10px"
          @click="addHarvest()"
        >
          Biçilen Ürün Ekle
        </button>
        <div
          class="content"
          style="
            position: relative;
            padding-bottom: 50px;
            border: 2px solid #42b983;
            background-color: bisque;
          "
          v-for="(harvest, index) in harvests"
          :key="index"
        >
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
          <div
            class="item"
            style="position: absolute; right: 100px; bottom: 0px"
          >
            <button class="btn btn-error" @click="removeHarvest(index)">
              Sil
            </button>
          </div>
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
  props: ["id"],
  data() {
    return {
      actionId: null,
      action: {
        process: null,
        cost: null,
        comment: null,
        date: null,
        fieldId: null,
      },
      harvest: {
        fieldId: null,
        name: null,
        amount: null,
        unitPrice: null,
        comment: null,
        date: null,
      },
      harvests: [],
      process: {},
      units: null,
      fields: null,
      putActionUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/actionTaken/",
      postHarvestsUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest/bulkCreate",
      getFieldUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field",
      getProcessUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/process",
      getUnitUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/unit",
      getActionUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/actionTaken/" + this.id,
    };
  },
  methods: {
    submit: function () {
      console.log(this.harvests);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.action),
      };
      fetch(this.putActionUrl + this.actionId, requestOptions)
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
          if (this.action.process == "REAP" && this.harvests.length > 0) {
            this.harvests.forEach((harvest) => {
              harvest.fieldId = this.action.fieldId;
            });

            const requestOptions2 = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.harvests),
            };

            fetch(this.postHarvestsUrl, requestOptions2).then((response) => {
              if (response.ok) {
                this.$refs.alert.showAlert(
                  "success",
                  "Kayıt Başarılı",
                  "Başarılı"
                );
                setTimeout(
                  () =>
                    router.push({ path: "/action-taken/detail/" + data.id }),
                  1000
                );
              } else {
                this.$refs.alert.showAlert(
                  "error",
                  "Beklenmeyen bir hata oluştu. Biçim Kaydedilemedi",
                  "Hata"
                );
              }
            });
          } else {
            this.$refs.alert.showAlert("success", "Kayıt Başarılı", "Başarılı");
            setTimeout(
              () => router.push({ path: "/action-taken/detail/" + data.id }),
              1000
            );
          }
        });
    },
    addHarvest() {
      this.harvests.push({
        fieldId: null,
        name: null,
        amount: null,
        unitPrice: null,
        comment: null,
        date: null,
      });
    },
    removeHarvest(index) {
      this.harvests.splice(index, 1);
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
    getProcess: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getProcessUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => (_this.process = data));
    },
    getAction: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getActionUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        _this.actionId = data.id;
          _this.action.process = _this.process[data.process];
          _this.action.cost = data.cost;
          _this.action.comment = data.comment;
          _this.action.date = data.date;
          _this.action.fieldId = data.field? data.field.id:"";
        });
    },
  },
  created() {
    this.getFields();
    this.getProcess();
    this.getAction();
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