<template>
  <div class="container">
    <h2 class="container-header">{{ title }}</h2>
    <div class="list-item" :id="listId">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "listId"],
};
</script>
