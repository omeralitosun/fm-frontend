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
          <label>Sezon</label> <br />
          <select class="input" placeholder="Sezon" v-model="action.seasonId">
            <option disabled :value="null">Sezon</option>
            <option
              v-for="(season, index) in seasons"
              :key="index"
              :value="season.id"
            >
              {{ season.name }}
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
  data() {
    return {
      action: {
        process: null,
        cost: null,
        comment: null,
        date: null,
        fieldId: null,
        seasonId: null,
      },
      harvest: {
        fieldId: null,
        seasonId: null,
        name: null,
        amount: null,
        unitPrice: null,
        comment: null,
        date: null,
      },
      harvests: [],
      process: null,
      units: null,
      fields: null,
      seasons: null,
      postActionUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/actionTaken",
      postHarvestsUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest/bulkCreate",
      getFieldUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field",
      getSeasonUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/season",
      getProcessUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/process",
      getUnitUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/unit",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.action),
      };
      fetch(this.postActionUrl, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (this.action.process == "REAP" && this.harvests.length > 0) {
              this.harvests.forEach((harvest) => {
                harvest.fieldId = this.action.fieldId;
                harvest.seasonId = this.action.seasonId;
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
                  response.json().then((error) => {
                    var messages = Object.keys(error.message).map(function (
                      key
                    ) {
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
            } else {
              this.$refs.alert.showAlert(
                "success",
                "Kayıt Başarılı",
                "Başarılı"
              );
              setTimeout(
                () => router.push({ path: "/action-taken/detail/" + data.id }),
                1000
              );
            }
          });
        } else {
          response.json().then((error) => {
            console.log(error)
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
    getSeasons: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getSeasonUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          _this.seasons = data;
        });
    },
  },
  created() {
    this.getFields();
    this.getProcess();
    this.getSeasons();
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