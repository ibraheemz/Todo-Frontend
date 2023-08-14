<template>
  <div :key="todo.id" v-for="todo in todos">
    <Todo
      @toggle-reminder="$emit('toggle-reminder', todo.id)"
      @delete-todo="$emit('delete-todo', todo.id)"
      :todo="todo"
    />
  </div>
</template>

<script setup>
import Todo from "./Todo.vue";

const props = defineProps({
  todos: Array,
});

const emits = defineEmits(["delete-todo", "toggle-reminder"]);
</script>
