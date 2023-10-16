<template>
    <div>
      <div>
        <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
      </div>
      <div class="create">
        <div class="content">
          <div class="item">
            <label>Sezon Adı</label> <br />
            <input
              class="input"
              type="text"
              name="name"
              placeholder="Sezon Adı"
              v-model="data.name"
            />
          </div>
          <div class="item">
          <label>Başlangıç Tarihi</label> <br />
          <input
            class="input"
            type="date"
            name="date"
            placeholder="Başlangıç Tarihi"
            v-model="data.startDate"
          />
        </div>
        <div class="item">
          <label>Bitiş Tarihi</label> <br />
          <input
            class="input"
            type="date"
            name="date"
            placeholder="Bitiş Tarihi"
            v-model="data.endDate"
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
    name: "CreateFieldView",
    data() {
      return {
        data: {
          name: null,
          startDate: null,
          endDate: null
        },
        postUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/season",
      };
    },
    methods: {
      submit: function () {
        
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.data),
        };
  
        fetch(this.postUrl, requestOptions)
          .then((response) => {
            if (response.ok) {
            response.json().then((data) => {
              this.$refs.alert.showAlert(
                "success",
                "Kayıt Başarılı",
                "Başarılı"
              );
              setTimeout(
                () =>
                  router.push({ path: "/" }),
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