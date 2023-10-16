<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Ekipman</label> <br />
          <select
            class="input"
            placeholder="Ekipman"
            v-model="maintenance.equipmentId"
          >
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
            v-model="maintenance.maintenanceType"
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
            v-model="maintenance.cost"
          />
        </div>
        <div class="item">
          <label>Tarih</label> <br />
          <input
            class="input"
            type="datetime-local"
            name="date"
            placeholder="Tarih"
            v-model="maintenance.date"
          />
        </div>
        <div class="item">
          <label>Açıklama</label> <br />
          <input
            class="input"
            type="text"
            name="comment"
            placeholder="Açıklama"
            v-model="maintenance.comment"
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
  name: "CreateMaintenanceView",
  props: ["id"],
  data() {
    return {
      maintenanceId: null,
      maintenanceTypes: null,
      maintenance: {
        maintenanceType: null,
        cost: null,
        comment: null,
        date: null,
        equipmentId: null,
      },
      equipments: null,
      putMaintenanceUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/maintenance/",
      getEquipmentUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/equipment",
      getMaintenanceTypeUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/enums/maintenance-type",
      getMaintenanceUrl:
        process.env.VUE_APP_API_BASE_URL + "/api/v1/maintenance/" + this.id,
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.maintenance),
      };
      fetch(this.putMaintenanceUrl + this.maintenanceId, requestOptions).then(
        (response) => {
          if (response.ok) {
            response.json().then((data) => {
              this.$refs.alert.showAlert(
                "success",
                "Kayıt Başarılı",
                "Başarılı"
              );
              setTimeout(
                () => router.push({ path: "/maintenance/detail/" + data.id }),
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
        }
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
    getMaintenanceTypes: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(_this.getMaintenanceTypeUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => (_this.maintenanceTypes = data));
    },
    getMaintenance: function () {
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(_this.getMaintenanceUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          (_this.maintenanceId = _this.id),
            (_this.maintenance.maintenanceType =
              _this.maintenanceTypes[data.maintenanceType]);
          _this.maintenance.cost = data.cost;
          _this.maintenance.comment = data.comment;
          _this.maintenance.date = data.date;
          _this.maintenance.equipmentId = data.equipment
            ? data.equipment.id
            : "";
        });
    },
  },
  created() {
    this.getEquipments();
    this.getMaintenanceTypes();
    this.getMaintenance();
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