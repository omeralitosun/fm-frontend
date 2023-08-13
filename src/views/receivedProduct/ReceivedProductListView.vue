<template>
  <div class="list">
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
          <td
            :data-label="fieldName[index]"
            v-for="(val, key, index) in data"
            :key="index"
          >
            <div v-if="key != 'id'">
              {{ val }}
            </div>
            <div v-else>
              {{ ind + 1 }}
            </div>
          </td>
          <td>
            <router-link :to="routerUrl + data.id"
              ><button>Detay</button></router-link
            >
            <button @click="del(data.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "ReceivedProductListView",
  data() {
    return {
      fieldName: ["*", "ÜRÜN ADI", "MİKTAR", "BİRİM", "BİRİM FİYATI", "TOPLAM FİYATI", "AÇIKLAMA", "TARİH"],
      datas: [],
      url: "http://localhost:8081/api/v1/receivedProduct",
      routerUrl: "/received-product/detail/",
    };
  },
  mounted() {
    var _this = this;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(_this.url, requestOptions)
      .then((response) => response.json())
      .then((data) => (_this.datas = data));
      console.log(this.datas);
  },
  methods: {
    del: function (key) {
      if (
        confirm("Silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")
      ) {
        var url = this.url+"/"+key;
        const requestOptions = {
          method: "DELETE"
        };
        fetch(url, requestOptions)
          .then((response) => {
            if(response.status==204){
              console.log("Başarılı");
              router.go(0);
            }
          })
      }
    },
  },
};
</script>

<style>
</style>