<template>
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
    <div class="content" v-if="action.process == 'REAP'">
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
      },
      harvest: {
        fieldId: null,
        name: null,
        amount: null,
        unitPrice: null,
        comment: null,
        date: null,
      },
      process: null,
      units: null,
      fields: null,
      postActionUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/actionTaken",
      postHarvestUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest",
      getFieldUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field",
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
      fetch(this.postActionUrl, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (this.action.process == "REAP") {
            this.harvest.fieldId = this.action.fieldId;

            const requestOptions2 = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(this.harvest),
            };

            console.log(this.harvest);
            fetch(this.postHarvestUrl, requestOptions2).then((response) => {
              if (response.ok) {
                return response.json();
              }
            });
          }
          router.push({ path: "/action-taken/detail/" + data.id });
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
  },
  created() {
    this.getFields();
    this.getProcess();
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