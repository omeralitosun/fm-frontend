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
          <td :data-label="fieldName[0]">
            <div>
              {{ ind+1 }}
            </div>
          </td>
          <td :data-label="fieldName[1]">
            <div>
              <router-link :to="'/field/detail/'+returnId(data.field)" >{{ data.field!=null?data.field.name:'' }}</router-link>
            </div>
          </td>
          <td :data-label="fieldName[2]">
            <div>
              {{ data.process }}
            </div>
          </td>
          <td :data-label="fieldName[3]">
            <div>
              {{ Number(data.cost)
            .toLocaleString('tr') }} ₺
            </div>
          </td>
          <td :data-label="fieldName[4]">
            <div>
              {{ data.date }}
            </div>
          </td>
          <td :data-label="fieldName[5]">
            <div>
              {{ data.comment }}
            </div>
          </td>
          <td>
            <router-link :to="routerUrl +'/detail/'+ data.id"
              ><button class="btn btn-submit">Detay</button></router-link
            >
            <router-link :to="routerUrl +'/update/'+ data.id"
              ><button class="btn btn-warning">Güncelle</button></router-link
            >
            <button @click="del(data.id)" class="btn btn-error">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "ActionTakenListView",
  data() {
    return {
      fieldName: ["*","TARLA", "YAPILAN İŞLEM", "MALİYET", "TARİH", "AÇIKLAMA"],
      datas: [],
      url: process.env.VUE_APP_API_BASE_URL+"/api/v1/actionTaken",
      routerUrl: "/action-taken",
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
    returnId: function(data){
      return data?data.id:'';
    }
  },
  watch: {

  }
};
</script>

<style>
</style>