<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <select v-model="data.process" placeholder="İşlem">
          <option disabled value="">Yapılan İşlem</option>
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
          name="cost"
          placeholder="Maliyet"
          v-model="data.cost"
        />
      </div>
      <div class="item">
        <input
          type="text-area"
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
      <div class="item">
        <input
          type="text"
          name="fieldId"
          placeholder="Tarla"
          v-model="data.fieldId"
        />
      </div>
    </div>
    <button class="btn-submit" @click="submit()">Kaydet</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateActionTakenView",
  data() {
    return {
      options: null,
      data: {
        process: null,
        cost: null,
        comment: null,
        date: null,
        fieldId: null,
      },
      url: "http://localhost:8081/api/v1/actionTaken",
    };
  },
  methods: {
    submit: function () {
      console.log(this.data)
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
        .then((data) => router.push({ path: "/action-taken/detail/" + data.id }));
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/api/v1/enums/process", requestOptions)
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