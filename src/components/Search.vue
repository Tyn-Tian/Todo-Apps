<template>
  <div class="container">
    <h2 class="container-header text-center">Cari task yang diinginkan</h2>
    <input type="search" id="search" name="search" v-model="search" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style scoped>
.container {
  padding-inline: 32px !important;
}

input[type="search"] {
  width: 100%;
  font-family: Raleway, sans-serif;
  background: #f5f1ff;
  border: 2px solid #9475ea;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-size: 24px;

  outline: none;
}
</style>
