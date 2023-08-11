<template>
  <div
    v-if="!showUpdateForm"
    @dblclick="checkTodo"
    :class="[todo.checked ? 'checked' : '', 'todo']"
  >
    <div class="todo-buttons">
      <i id="edit" @click.stop="updateForm" class="fas fa-edit"></i>
      <i id="close" @click.stop="onDelete(todo.id)" class="fas fa-times"></i>
    </div>
    <h3>
      {{ todo.title }}
    </h3>
    <p>
      {{ todo.description }}
    </p>
    <p>{{ todo.day }}</p>
  </div>
  <EditTodo
    v-if="showUpdateForm"
    :todo="this.todo"
    @updateTodo="updateTodo"
    @closeForm="viewTodo"
  />
</template>

<script>
import EditTodo from "./EditTodo.vue";
const api = "http://localhost:8000/api/todos";

export default {
  name: "Todo",
  data() {
    return {
      showUpdateForm: false,
    };
  },
  props: {
    todo: Object,
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-todo", id);
    },
    updateForm() {
      this.showUpdateForm = !this.showUpdateForm;
    },
    viewTodo(showForm) {
      !showForm ? (this.showUpdateForm = false) : (this.showUpdateForm = true);
    },
    async putTodo(todo, reload = false) {
      const res = await fetch(`${api}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await res.json();
      if (reload) {
        window.location.href = "/";
      }
    },
    updateTodo(todo) {
      this.putTodo(todo, true);
    },
    checkTodo() {
      this.todo.checked = !this.todo.checked;
      this.putTodo(this.todo);
    },
  },
  components: { EditTodo },
};
</script>

<style scoped>
.fas {
  color: red;
}

.todo {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.todo.checked {
  border-left: 5px solid green;
}

.todo h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-buttons {
  display: flex;
  justify-content: end;
}
#close {
  margin-left: 10px;
}
</style>
