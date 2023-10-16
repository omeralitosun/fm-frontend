<template>
  <div style="border: 2px solid #07530bf6">
    <div class="baslik" @click="open()">Alınan Aksiyonlar</div>
    <div style="float: right" :class="{ close: isClosed }">
      <label>Sezon: </label>
      <select class="input" placeholder="Sezon" v-model="seasonId">
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
    <div class="list" :class="{ close: isClosed }">
      <table style="margin: auto">
        <thead>
          <tr>
            <th scope="col" v-for="(value, index) in fieldName" :key="index">
              {{ value }}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, ind) in datas" :key="ind">
            <td :data-label="fieldName[0]">
              <div>
                {{ ind + 1 }}
              </div>
            </td>
            <td :data-label="fieldName[1]">
              <div>
                {{ data.process }}
              </div>
            </td>
            <td :data-label="fieldName[2]">
              <div>
                {{ Number(data.cost)
            .toLocaleString('tr') }} ₺
              </div>
            </td>
            <td :data-label="fieldName[3]">
              <div>
                {{ data.date }}
              </div>
            </td>
            <td :data-label="fieldName[4]">
              <div>
                {{ data.comment }}
              </div>
            </td>
            <td>
              <router-link :to="routerUrl + '/detail/' + data.id"
                ><button class="btn btn-submit">Detay</button></router-link
              >
              <router-link :to="routerUrl + '/update/' + data.id"
                ><button class="btn btn-warning">Güncelle</button></router-link
              >
              <button @click="del(data)" class="btn btn-error">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fieldId"],
  data() {
    return {
      isClosed: true,
      fieldName: ["*", "YAPILAN İŞLEM", "MALİYET", "TARİH", "AÇIKLAMA"],
      datas: [],
      seasons: null,
      seasonId: null,
      getActionsUrl:
        process.env.VUE_APP_API_BASE_URL +
        "/api/v1/actionTaken/byFieldandSeason?",
      getSeasonUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/season",
      deleteUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/actionTaken/",
      routerUrl: "/action-taken",
    };
  },
  methods: {
    del: function (data) {
      if (
        confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")
      ) {
        var url = this.deleteUrl + data.id;
        const requestOptions = {
          method: "DELETE",
        };
        fetch(url, requestOptions).then((response) => {
          if (response.status == 204) {
            console.log("Başarılı");
            console.log(data);
            this.datas.splice(this.datas.indexOf(data), 1);
          }
        });
      }
    },
    returnId: function (data) {
      return data ? data.id : "";
    },
    open: function () {
      this.isClosed = !this.isClosed;
      !this.isDataGetted ? this.getActions() : null;
    },
    getActions: function () {
      this.isDataGetted = true;
      var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        _this.getActionsUrl +
          "fieldId=" +
          this.fieldId +
          "&seasonId=" +
          this.seasonId,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => (_this.datas = data));
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
          _this.seasonId = data[0].id;
        });
    },
  },
  mounted() {
    this.getSeasons();
  },
  watch: {
    seasonId() {
      this.fieldId != undefined ? this.getActions() : null;
    },
  },
};
</script>

<style>
.baslik {
  border: 1px solid #999;
  border-radius: 5px;
  margin: 2px;
  padding: 1.04%;
  font-weight: 700;
  background: -webkit-linear-gradient(top, #f3f3f3 50%, #e6e6e6 50%);
}
.close {
  display: none;
}
</style>