<template>
  <div class="container">
    <h2 class="container-header text-center">Cari task yang diinginkan</h2>
    <input type="search" id="search" name="search" v-model="search" />
  </div>

  <TodoList title="Yang harus dilakukan" listId="todos">
    <div
      class="item shadow"
      v-for="todo in searchUncompletedTodos"
      :id="todo.id"
    >
      <div class="inner">
        <h2>{{ todo.task }}</h2>
        <p>{{ todo.timestamp }}</p>
      </div>
      <button class="check-button" @click="checkBtn(todo.id)"></button>
    </div>
  </TodoList>

  <TodoList title="Yang sudah dilakukan" listId="completed-todos">
    <div
      class="item shadow"
      v-for="completeTodo in searchCompletedTodos"
      :id="completeTodo.id"
    >
      <div class="inner">
        <h2>{{ completeTodo.task }}</h2>
        <p>{{ completeTodo.timestamp }}</p>
      </div>
      <button class="undo-button" @click="undoBtn(completeTodo.id)"></button>
      <button class="trash-button" @click="removeBtn(completeTodo.id)"></button>
    </div>
  </TodoList>
</template>

<script>
import TodoList from "./TodoList.vue";
import { mapGetters, mapMutations } from "vuex";

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
    ...mapGetters(["findTodo", "findTodoIndex"]),
    searchUncompletedTodos() {
      return this.$store.getters.searchUncompletedTodos(this.search);
    },
    searchCompletedTodos() {
      return this.$store.getters.searchCompletedTodos(this.search);
    },
  },
  methods: {
    ...mapGetters(["isStorageExits"]),
    ...mapMutations([
      "addTaskToCompleted",
      "undoTaskFromCompleted",
      "removeTaskFromCompleted",
      "changeEditBool",
      "saveData",
    ]),
    checkBtn(todoID) {
      this.addTaskToCompleted(this.findTodo(todoID));
      if (this.isStorageExits) {
        this.saveData();
      }
    },
    undoBtn(todoID) {
      this.undoTaskFromCompleted(this.findTodo(todoID));
      if (this.isStorageExits) {
        this.saveData();
      }
    },
    removeBtn(todoID) {
      this.removeTaskFromCompleted(this.findTodoIndex(todoID));
      if (this.isStorageExits) {
        this.saveData();
      }
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

.check-button {
  margin-left: auto;
}
</style>
