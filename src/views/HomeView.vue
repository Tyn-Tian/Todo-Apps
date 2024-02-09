<template>
  <div class="wrapper">
    <Form />

    <TodoList>
      <h2 class="container-header">Yang harus dilakukan</h2>
      <div class="list-item" id="todos">
        <div class="item shadow" v-for="todo in todos" :id="todo.id">
          <div class="inner">
            <h2>{{ todo.task }}</h2>
            <p>{{ todo.timestamp }}</p>
          </div>
          <button class="check-button" @click="checkBtn(todo.id)"></button>
        </div>
      </div>
    </TodoList>

    <TodoList>
      <h2 class="container-header">Yang sudah dilakukan</h2>
      <div class="list-item" id="completed-todos">
        <div
          class="item shadow"
          v-for="completeTodo in completeTodos"
          :id="completeTodo.id"
        >
          <div class="inner">
            <h2>{{ completeTodo.task }}</h2>
            <p>{{ completeTodo.timestamp }}</p>
          </div>
          <button
            class="undo-button"
            @click="undoBtn(completeTodo.id)"
          ></button>
          <button
            class="trash-button"
            @click="removeBtn(completeTodo.id)"
          ></button>
        </div>
      </div>
    </TodoList>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import TodoList from "../components/TodoList.vue";

export default {
  name: "HomeView",
  components: {
    Form,
    TodoList,
  },
  computed: {
    todos() {
      return this.$store.getters.uncompletedTodos;
    },
    completeTodos() {
      return this.$store.getters.completedTodos;
    },
  },
  methods: {
    checkBtn(todoID) {
      const todoTarget = this.findTodo(todoID);
      this.$store.commit("addTaskToCompleted", todoTarget);
      this.saveData();
    },
    undoBtn(todoID) {
      const todoTarget = this.findTodo(todoID);
      this.$store.commit("undoTaskFromCompleted", todoTarget);
      this.saveData();
    },
    removeBtn(todoID) {
      const todoTarget = this.findTodoIndex(todoID);
      this.$store.commit("removeTaskFromCompleted", todoTarget);
      this.saveData();
    },
    findTodo(todoID) {
      return this.$store.getters.findTodo(todoID);
    },
    findTodoIndex(todoID) {
      return this.$store.getters.findTodoIndex(todoID);
    },
    saveData() {
      this.$store.getters.saveData;
    },
    loadDataFromStorage() {
      this.$store.getters.loadDataFromStorage;
    },
  },
  beforeMount() {
    if (this.$store.getters.isStorageExits) {
      this.loadDataFromStorage();
    }
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item {
  border-radius: 16px;
  margin-top: 16px;
  padding: 12px 24px 12px 24px;
  background: white;
  display: flex;
  align-items: center;
}

.item > .inner h2 {
  margin-bottom: unset;
}

.item > .inner p {
  margin-top: 5px;
}

.check-button {
  width: 40px;
  height: 40px;

  background: url("../assets/img/check-outline.svg");
  background-size: contain;
  margin-left: auto;
  cursor: pointer;
  border: none;
}

.check-button:hover {
  background: url("../assets/img/check-solid.svg");
  background-size: contain;
}

.trash-button {
  width: 40px;
  height: 40px;

  background: url("../assets/img/trash-outline.svg");
  background-size: contain;
  margin-left: 16px;
  cursor: pointer;
  border: none;
}

.trash-button:hover {
  background: url("../assets/img/trash-fill.svg");
  background-size: contain;
}

.undo-button {
  width: 40px;
  height: 40px;

  background: url("../assets/img/undo-ouline.svg");
  background-size: contain;
  margin-left: auto;
  cursor: pointer;
  border: none;
}

.undo-button:hover {
  background: url("../assets/img/undo-ouline.svg");
  background-size: contain;
}

.check-button:focus,
.trash-button {
  outline: none;
}

@media only screen and (max-width: 1024px) {
  .wrapper {
    margin: 0;
  }

  .list-item {
    width: 100%;
  }
}
</style>
