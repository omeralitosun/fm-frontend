<template>
    <div style="border: 2px solid #07530bf6">
      <div class="baslik" @click="open()">Biçilen Ürünler</div>
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
              <td>
                <div>
                  {{ ind + 1 }}
                </div>
              </td>
              <td>
                <div>
                  {{ data.name }}
                </div>
              </td>
              <td>
                <div>
                  {{ data.amount }}
                </div>
              </td>
              <td>
                <div>
                  {{ data.totalPrice }}
                </div>
              </td>
              <td>
                <div>
                  {{ data.date }}
                </div>
              </td>
              <td>
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
    props:['fieldId'],
    data() {
      return {
        isClosed: true,
        isDataGetted:false,
        fieldName: [
          "*",
          "ÜRÜN",
          "MİKTAR",
          "TOPLAM FİYATI",
          "TARİH",
          "AÇIKLAMA",
        ],
        datas: [],
        getActionsUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest/byField?fieldId=",
        deleteUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/harvest/",
        routerUrl: "/harvest",
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
              this.datas.splice(this.datas.indexOf(data),1);
            }
          });
        }
      },
      returnId: function (data) {
        return data ? data.id : "";
      },
      open: function () {
        this.isClosed = !this.isClosed;
        !this.isDataGetted?this.getActions():null;
      },
      getActions: function () {
        this.isDataGetted=true;
        var _this = this;
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        fetch(_this.getActionsUrl+this.fieldId, requestOptions)
          .then((response) => response.json())
          .then((data) => (_this.datas = data));
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