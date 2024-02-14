<template>
  <div class="container">
    <h2 class="container-header text-center">Cari task yang diinginkan</h2>
    <input type="search" id="search" name="search" v-model="search" />
  </div>
  
  <TodoList>
    <h2 class="container-header">Yang harus dilakukan</h2>
    <div class="list-item" id="todos">
      <div
        class="item shadow"
        v-for="todo in searchUncompletedTodos"
        :id="todo.id"
      >
        <div class="inner">
          <h2>{{ todo.task }}</h2>
          <p>{{ todo.timestamp }}</p>
        </div>
      </div>
    </div>
  </TodoList>

  <TodoList>
    <h2 class="container-header">Yang sudah dilakukan</h2>
    <div class="list-item" id="completed-todos">
      <div
        class="item shadow"
        v-for="completeTodo in searchCompletedTodos"
        :id="completeTodo.id"
      >
        <div class="inner">
          <h2>{{ completeTodo.task }}</h2>
          <p>{{ completeTodo.timestamp }}</p>
        </div>
      </div>
    </div>
  </TodoList>
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
  components: {
    TodoList,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    searchUncompletedTodos() {
      return this.$store.getters.searchUncompletedTodos(this.search);
    },
    searchCompletedTodos() {
      return this.$store.getters.searchCompletedTodos(this.search);
    },
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
