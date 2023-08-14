<template>
  <Todos
    @delete-todo="deleteTodo"
    :todos="todos"
    :isLoading="isLoading"
    v-if="!showAddTodo"
  ></Todos>
  <AddTodo v-show="showAddTodo"></AddTodo>
</template>

<script setup>
import Todos from "../components/Todos.vue";
import AddTodo from "../components/AddTodo";
import todosApi from "../services/todosApi";
import { ref, onMounted } from "vue";

const api = "http://localhost:8000/api/todos";

const props = defineProps({
  showAddTodo: Boolean,
});
let todos = ref([]);
let isLoading = ref(false);

const deleteTodo = async (id) => {
  if (confirm("Are you sure?")) {
    todosApi
      .delete(`/${id}`)
      .then(() => {
        todos.value = todos.value.filter((todo) => todo.id !== id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getTodos = async () => {
  todosApi.get().then((res) => {
    console.log(res);
    todos.value = res.data;
    isLoading = false;
  });
};

onMounted(() => {
  getTodos();
  console.log("home mounted");
});
</script>
