<template>
  <div class="container bg-white shadow" id="add-todo">
    <h2 class="container-header text-center">Tambah yang harus dilakukan</h2>
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
      <input
        type="submit"
        value="Submit"
        name="Submit"
        class="btn-submit"
        @click.prevent="submit"
      />
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
  methods: {
    submit() {
      // console.log(this.date.split("-").reverse().join("-"));
      this.addTodo();
      this.saveData()

      this.textTodo = "";
      this.timestamp = "";
    },
    addTodo() {
      const textTodo = this.textTodo;
      const timestamp = this.timestamp.split("-").reverse().join("-");

      const generatedId = this.generateId();
      const todoObject = this.generateTodoObject(
        generatedId,
        textTodo,
        timestamp,
        false
      );

      this.$store.state.todos.push(todoObject)
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
      this.$store.getters.saveData
    }
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

.shadow {
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
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

.btn-submit {
  width: fit-content;
  font-family: Raleway, sans-serif;
  border-radius: 16px;
  padding: 12px 24px;
  border: 2px solid #5f30e2;
  color: black;
  font-size: 24px;
  margin-top: auto;
  align-self: flex-end;
  cursor: pointer;
}

.btn-submit:hover {
  background: #5f30e2;
  color: white;
}

input[type="text"],
input[type="date"],
.btn-submit:focus {
  outline: none;
}

.text-center {
  text-align: center;
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
