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
    :todo="todo"
    @updateTodo="updateTodo"
    @closeForm="viewTodo"
  />
</template>

<script setup>
import EditTodo from "./EditTodo.vue";
import todosApi from "../services/todosApi";

let showUpdateForm = false;

const { todo } = defineProps(["todo"]);

const emits = defineEmits(["delete-todo"]);
const onDelete = (id) => {
  emits("delete-todo", id);
};

const updateForm = () => {
  showUpdateForm = !showUpdateForm;
};
const viewTodo = (showForm) => {
  !showForm ? (showUpdateForm = false) : (showUpdateForm = true);
};
const putTodo = (todo, reload = false) => {
  todosApi
    .put(`/${todo.id}`, todo)
    .then(() => {
      console.log("todo updated");
    })
    .catch((err) => {
      console.log(err);
    });
  if (reload) {
    window.location.href = "/";
  }
};
const updateTodo = (todo) => {
  putTodo(todo, true);
};
const checkTodo = () => {
  todo.checked = !todo.checked;
  putTodo(todo);
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
