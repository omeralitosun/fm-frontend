<template>
  <div class="create">
    <div class="content">
      <div class="item">
        <label>Ekipman</label> <br />
        <select class="input" placeholder="Ekipman" v-model="data.equipmentId">
          <option disabled :value="null">Ekipman</option>
          <option
            v-for="(equipment, index) in equipments"
            :key="index"
            :value="equipment.id"
          >
            {{ equipment.name }}
          </option>
        </select>
      </div>
      <div class="item">
        <label>Bakım Tipi</label> <br />
        <select
          class="input"
          v-model="data.maintenanceType"
          placeholder="Bakım"
        >
          <option disabled :value="null">Bakım Tipi</option>
          <option
            v-for="(option, key, index) in maintenanceTypes"
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
          v-model="data.cost"
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
    </div>
    <button class="btn btn-submit" @click="submit()">Kaydet</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateMaintenanceView",
  data() {
    return {
      maintenanceTypes: null,
      data: {
        maintenanceType: null,
        cost: null,
        comment: null,
        date: null,
        equipmentId: null,
      },
      equipments: null,
      postMaintenanceUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/maintenance",
      getEquipmentUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment",
      getMaintenanceTypeUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/maintenance-type",
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };
      fetch(this.postMaintenanceUrl, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) =>
          router.push({ path: "/maintenance/detail/" + data.id })
        );
    },
    getEquipments: function () {

      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(this.getEquipmentUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          
          _this.equipments = data;
        });
    },
    getMaintenanceTypes: function() {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(_this.getMaintenanceTypeUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => (_this.maintenanceTypes = data));
    },
  },
  created() {
    this.getEquipments();
    this.getMaintenanceTypes();
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