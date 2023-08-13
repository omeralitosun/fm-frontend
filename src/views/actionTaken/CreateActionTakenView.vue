<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <input
          type="text"
          name="name"
          placeholder="Ekipman Adı"
          v-model="data.name"
        />
      </div>
      <div class="item">
        <select v-model="data.equipmentType" placeholder="Ekipman Tipi">
          <option disabled value="">Ekipman Tipi</option>
          <option
            v-for="(option,key, index) in options"
            :key="index"
            :value="option"
          >
            {{ key }}
          </option>
        </select>
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
      options:null,
      data: {
        name: null,
        equipmentType: null,
      },
      url: "http://localhost:8081/api/v1/equipment",
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
        .then((data) => router.push({ path: "/Equipment/detail/" + data.id }));
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/api/v1/enums/equipment-type", requestOptions)
      .then((response) => response.json())
      .then((data) => _this.options=data);
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