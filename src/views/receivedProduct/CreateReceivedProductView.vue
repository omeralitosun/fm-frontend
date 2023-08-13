<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <input
          type="text"
          name="name"
          placeholder="Ürün Adı"
          v-model="data.name"
        />
      </div>
      <div class="item">
        <input
          type="number"
          name="amount"
          placeholder="Miktarı"
          v-model="data.amount"
        />
      </div>
      <div class="item">
        <select v-model="data.unit" placeholder="Birim">
          <option disabled value="">Birim</option>
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
        <input
          type="number"
          name="unitPrice"
          placeholder="Birim Fiyatı"
          v-model="data.unitPrice"
        />
      </div>
      <div class="item">
        <input
          type="text"
          name="comment"
          placeholder="Açıklama"
          v-model="data.comment"
        />
      </div>
      <div class="item">
        <input
          type="datetime-local"
          name="date"
          placeholder="Tarih"
          v-model="data.date"
        />
      </div>
    </div>
    <button class="btn-submit" @click="submit()">Kaydet</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateReceivedProductView",
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
      url: "http://localhost:8081/api/v1/receivedProduct",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => router.push({ path: "/received-product/detail/" + data.id }));
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/api/v1/enums/unit", requestOptions)
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