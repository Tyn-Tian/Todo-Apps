<template>
  <header>
    <h1>TodoList</h1>
    <button class="search-btn" @click="changeSearchBool"></button>
  </header>

  <div class="wrapper">
    <Search v-if="this.$store.state.isSearch" />

    <Form :bool="this.$store.state.isEdit" :todoID="this.$store.state.todoID" />

    <TodoList
      title="Yang harus dilakukan"
      listId="todos"
      v-show="!this.$store.state.isSearch"
    >
      <div class="item shadow" v-for="todo in allTodos" :id="todo.id">
        <div class="inner">
          <h2>{{ todo.task }}</h2>
          <p>{{ todo.timestamp }}</p>
        </div>
        <button class="edit-button" @click="editBtn(todo.id)"></button>
        <button
          class="check-button"
          @click="addTaskToCompleted(findTodo(todo.id))"
        ></button>
      </div>
    </TodoList>

    <TodoList
      title="Yang sudah dilakukan"
      listId="completed-todos"
      v-show="!this.$store.state.isSearch"
    >
      <div
        class="item shadow"
        v-for="completeTodo in completedTodos"
        :id="completeTodo.id"
      >
        <div class="inner">
          <h2>{{ completeTodo.task }}</h2>
          <p>{{ completeTodo.timestamp }}</p>
        </div>
        <button
          class="undo-button"
          @click="undoTaskFromCompleted(findTodo(completeTodo.id))"
        ></button>
        <button
          class="trash-button"
          @click="removeTaskFromCompleted(findTodoIndex(completeTodo.id))"
        ></button>
      </div>
    </TodoList>
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import TodoList from "./components/TodoList.vue";
import Search from "./components/Search.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    Form,
    TodoList,
    Search,
  },
  computed: mapGetters([
    "allTodos",
    "completedTodos",
    "findTodo",
    "findTodoIndex",
  ]),
  methods: {
    ...mapActions([
      "addTaskToCompleted",
      "undoTaskFromCompleted",
      "removeTaskFromCompleted",
    ]),
    ...mapMutations([
      "changeEditBool",
      "loadDataFromStorage",
      "changeSearchBool",
    ]),
    editBtn(todoID) {
      this.changeEditBool();
      this.$store.commit("changeTodoID", todoID);
    },
  },
  beforeMount() {
    this.loadDataFromStorage();
  },
};
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

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  background: url("./assets/img/check-outline.svg");
  background-size: contain;
  margin-left: 16px;
  cursor: pointer;
  border: none;
}

.check-button:hover {
  background: url("./assets/img/check-solid.svg");
  background-size: contain;
}

.edit-button {
  width: 40px;
  height: 40px;

  background: url("./assets/img/edit-solid.svg");
  background-size: contain;
  margin-left: auto;
  cursor: pointer;
  border: none;
}

.trash-button {
  width: 40px;
  height: 40px;

  background: url("./assets/img/trash-outline.svg");
  background-size: contain;
  margin-left: 16px;
  cursor: pointer;
  border: none;
}

.trash-button:hover {
  background: url("./assets/img/trash-fill.svg");
  background-size: contain;
}

.undo-button {
  width: 40px;
  height: 40px;

  background: url("./assets/img/undo-ouline.svg");
  background-size: contain;
  margin-left: auto;
  cursor: pointer;
  border: none;
}

.undo-button:hover {
  background: url("./assets/img/undo-ouline.svg");
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
