<template>
  <header>
    <h1>TodoList</h1>
    <button class="search-btn" @click="searchBtn"></button>
  </header>

  <div class="wrapper">
    <Search v-if="this.$store.state.isSearch" />

    <Form :bool="this.$store.state.isEdit" :todoID="this.todoID" />

    <div v-if="!this.$store.state.isSearch">
      <TodoList>
        <h2 class="container-header">Yang harus dilakukan</h2>
        <div class="list-item" id="todos">
          <div class="item shadow" v-for="todo in allTodos" :id="todo.id">
            <div class="inner">
              <h2>{{ todo.task }}</h2>
              <p>{{ todo.timestamp }}</p>
            </div>
            <button class="edit-button" @click="editBtn(todo.id)"></button>
            <button class="check-button" @click="checkBtn(todo.id)"></button>
          </div>
        </div>
      </TodoList>

      <TodoList>
        <h2 class="container-header">Yang sudah dilakukan</h2>
        <div class="list-item" id="completed-todos">
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
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import TodoList from "./components/TodoList.vue";
import Search from "./components/Search.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "HomeView",
  components: {
    Form,
    TodoList,
    Search,
  },
  data() {
    return {
      todoID: null,
    };
  },
  computed: mapGetters(["allTodos", "completedTodos", "findTodo", "findTodoIndex"]),
  methods: {
    ...mapGetters(["isStorageExits"]),
    ...mapMutations([
      "saveData",
      "loadDataFromStorage",
      "changeSearchBool",
      "changeEditBool",
    ]),
    searchBtn() {
      this.changeSearchBool();
    },
    checkBtn(todoID) {
      const todoTarget = this.findTodo(todoID);
      this.$store.commit("addTaskToCompleted", todoTarget);
      if (this.isStorageExits) {
        this.saveData();
      }
    },
    editBtn(todoID) {
      this.changeEditBool();
      this.todoID = todoID;
    },
    undoBtn(todoID) {
      const todoTarget = this.findTodo(todoID);
      this.$store.commit("undoTaskFromCompleted", todoTarget);
      if (this.isStorageExits) {
        this.saveData();
      }
    },
    removeBtn(todoID) {
      const todoTarget = this.findTodoIndex(todoID);
      this.$store.commit("removeTaskFromCompleted", todoTarget);
      if (this.isStorageExits) {
        this.saveData();
      }
    },
  },
  beforeMount() {
    if (this.isStorageExits) {
      this.loadDataFromStorage();
    }
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
