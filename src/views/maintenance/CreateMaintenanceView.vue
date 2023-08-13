<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <input
          type="text"
          name="equipmentId"
          placeholder="Ekipman"
          v-model="data.equipmentId"
        />
      </div>
      <div class="item">
        <select v-model="data.maintenanceType" placeholder="Bakım">
          <option disabled value="">Bakım Tipi</option>
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
          type="datetime-local"
          name="date"
          placeholder="Tarih"
          v-model="data.date"
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
    </div>
    <button class="btn-submit" @click="submit()">Kaydet</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateMaintenanceView",
  data() {
    return {
      options: null,
      data: {
        maintenanceType: null,
        cost: null,
        comment: null,
        date: null,
        equipmentId: null,
      },
      url: "http://localhost:8081/api/v1/maintenance",
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
        .then((data) => router.push({ path: "/maintenance/detail/" + data.id }));
    },
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/api/v1/enums/maintenance-type", requestOptions)
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