<template>
  <div class="create-field">
    <div class="content"></div>
    <div>
      <div v-for="(d, index) in data" :key="index">
        <input
          :type="d.type"
          class="form-control"
          :name="d.name"
          :placeholder="d.placeholder"
          v-model="d.value"
          :step="d.step"
        />
      </div>
    </div>
    <button @click="submit()">Kaydet</button>
  </div>
</template>

<script>
export default {
  props: ["properties","url"],
  data() {
    return {
      data: this.properties,
    };
  },
  methods: {
    submit: function () {
      var data = {};
      this.data.forEach((element) => {
        data[element.name] = element.value;
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch(this.url, requestOptions)
        .then((response) => response.json())
        .then((data) => (console.log(data)));
    },
  },
};
</script>

<style>
</style>