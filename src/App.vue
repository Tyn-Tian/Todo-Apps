<template>
  <header>
    <h1>TodoList</h1>
    <button class="search-btn"></button>
  </header>

  <router-view />
</template>

<script>
  export default {
  }
</script>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #5f30e2;
  padding: 16px;
  color: white;
}

.search-btn {
  width: 30px;
  height: 30px;

  background: url(./assets/img/search-outline.svg);
  background-size: contain;
  margin-left: 16px;
  cursor: pointer;
  border: none;
}
</style>
