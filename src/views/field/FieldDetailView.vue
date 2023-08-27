<template>
  <div>
    <div class="detail">
      <div class="content">
        <div class="item">
          <label for="name">Tarla Adı</label>
          <div type="text" name="name" id="name">{{ datas.name }}</div>
        </div>
        <div class="item">
          <label for="decare">Dönüm</label>
          <div type="text" name="decare" id="decare">{{ datas.decare }}</div>
        </div>
      </div>
      <ActionList :fieldId="datas.id"></ActionList>
      <HarvestList :fieldId="datas.id"></HarvestList>
    </div>
    
  </div>
</template>
  
<script>
import ActionList from "@/components/ActionList.vue";
import HarvestList from "@/components/HarvestList.vue";
export default {
  props: ["id"],
  components: {
    ActionList,
    HarvestList
  },
  data() {
    return {
      datas: {},
      url: process.env.VUE_APP_API_BASE_URL + "/api/v1/field/" + this.id,
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
};
</script>
  
<style>
</style>