<template>
  <div>
    <div>
      <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    </div>
    <div class="create">
      <div class="content">
        <div class="item">
          <label>Tarla Adı</label> <br />
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Tarla Adı"
            v-model="data.name"
          />
        </div>
        <div class="item">
          <label>Dönüm</label> <br />
          <input
            class="input"
            type="number"
            name="decare"
            placeholder="Dönüm"
            v-model="data.decare"
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
  name: "UpdateFieldView",
  props: ["id"],
  data() {
    return {
      fieldId: null,
      data: {
        name: null,
        decare: null,
      },
      putUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field/",
      getUrl: process.env.VUE_APP_API_BASE_URL + "/api/v1/field/" + this.id,
    };
  },
  methods: {
    submit: function () {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      };

      fetch(this.putUrl+this.fieldId, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            this.$refs.alert.showAlert(
              "error",
              "Beklenmeyen bir hata oluştu",
              "Hata"
            );
          }
        })
        .then((data) => {
          this.$refs.alert.showAlert("success", "Kayıt Başarılı", "Başarılı");
          setTimeout(
            () => router.push({ path: "/field/detail/" + data.id }),
            1000
          );
        });
    },
  },
  created(){
    var _this = this;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(_this.getUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          _this.fieldId = data.id;
          _this.data.name = data.name;
          _this.data.decare = data.decare;
          console.log(_this.data);
        });
  }
};
</script>
  
  <style>
.create .btn-submit {
  position: absolute;
  left: 100px;
  bottom: 10px;
}
</style>