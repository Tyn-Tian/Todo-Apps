<template>
  <div class="container bg-white shadow" id="add-todo">
    <h2 class="container-header text-center" v-if="bool">
      Edit yang harus dilakukan
    </h2>
    <h2 class="container-header text-center" v-else>
      Tambah yang harus dilakukan
    </h2>
    <form class="form" action="#" id="form">
      <div class="form-group form-title">
        <label for="title">Masukkan hal yang akan dilakukan</label>
        <input
          type="text"
          id="title"
          name="title"
          v-model="textTodo"
          required
        />
      </div>
      <div class="form-group form-title">
        <label for="date">Masukkan tanggal harus selesai</label>
        <input type="date" id="date" name="date" v-model="timestamp" required />
      </div>
      <div class="btn-container">
        <button v-if="bool" class="btn-cancel" @click="btnCancel">
          Cancel
        </button>
        <input
          v-if="bool"
          type="submit"
          value="Edit"
          name="Submit"
          class="btn-submit"
          @click.prevent="submit"
        />
        <input
          v-else
          type="submit"
          value="Submit"
          name="Submit"
          class="btn-submit"
          @click.prevent="submit"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textTodo: "",
      timestamp: "",
    };
  },
  props: {
    bool: Boolean,
    todoID: Number,
  },
  watch: {
    bool() {
      this.editInputValue();
    },
  },
  methods: {
    submit() {
      this.addTodo();
      this.saveData();

      this.editInputValue();
    },
    addTodo() {
      if (!this.$store.state.isEdit) {
        const textTodo = this.textTodo;
        const timestamp = this.timestamp.split("-").reverse().join("-");

        const generatedId = this.generateId();
        const todoObject = this.generateTodoObject(
          generatedId,
          textTodo,
          timestamp,
          false
        );

        this.$store.state.todos.push(todoObject);
      } else {
        const todoTarget = this.findTodo(this.todoID);
        const todoIndex = this.findTodoIndex(this.todoID);

        todoTarget.task = this.textTodo;
        todoTarget.timestamp = this.timestamp.split("-").reverse().join("-");

        this.$store.commit("editTask", todoTarget, todoIndex);

        this.$store.commit("changeEditBool");
      }
    },
    generateId() {
      return +new Date();
    },
    generateTodoObject(id, task, timestamp, isCompleted) {
      return {
        id,
        task,
        timestamp,
        isCompleted,
      };
    },
    saveData() {
      this.$store.getters.saveData;
    },
    findTodo(todoID) {
      return this.$store.getters.findTodo(todoID);
    },
    findTodoIndex(todoID) {
      return this.$store.getters.findTodoIndex(todoID);
    },
    editInputValue() {
      if (this.bool) {
        const todoData = this.findTodo(this.todoID);
        this.textTodo = todoData.task;
        this.timestamp = todoData.timestamp.split("-").reverse().join("-");
      } else {
        this.textTodo = "";
        this.timestamp = "";
      }
    },
    btnCancel() {
      this.$store.commit("changeEditBool");
      this.editInputValue();
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
  height: 300px;
  border-radius: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: lighter;
}


input[type="text"],
input[type="date"] {
  font-family: Raleway, sans-serif;
  background: #f5f1ff;
  border: 2px solid #9475ea;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-size: 24px;
}

.btn-container {
  align-self: flex-end;
}

.btn-cancel {
  margin-right: 16px;
}

.btn-cancel,
.btn-submit {
  width: fit-content;
  font-family: Raleway, sans-serif;
  border-radius: 16px;
  padding: 12px 24px;
  border: 2px solid #5f30e2;
  color: black;
  font-size: 24px;
  margin-top: auto;
  cursor: pointer;
}

.btn-cancel:hover,
.btn-submit:hover {
  background: #5f30e2;
  color: white;
}

input[type="text"],
input[type="date"],
.btn-cancel:focus,
.btn-submit:focus {
  outline: none;
}

.form-title {
  margin: auto 0;
}

@media only screen and (max-width: 1024px) {
  .form {
    width: 100%;
  }
}
</style>
