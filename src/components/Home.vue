<template>
  <Todos @delete-todo="deleteTodo" :todos="todos" v-if="!showAddTodo"></Todos>
  <AddTodo @add-todo="addTodo" v-show="showAddTodo"></AddTodo>
</template>

<script>
import Todos from "../components/Todos.vue";
import AddTodo from "../components/AddTodo";

const api = "http://localhost:8000/api/todos";

export default {
  name: "Home",
  props: {
    showAddTodo: Boolean,
  },
  components: {
    Todos,
    AddTodo,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    async deleteTodo(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`${api}/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        });

        res.status === 200
          ? (this.todos = this.todos.filter((todo) => todo.id !== id))
          : alert("Error deleting this todo");
      }
    },
    async addTodo(todo) {
      const res = await fetch(`${api}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todo),
      });
      const data = await res.json();
      this.todos = [...this.todos, data];
    },
    async getTodos() {
      const res = await fetch(`${api}`);
      const data = await res.json();
      return data;
    },
    async getTodo(id) {
      const res = await fetch(`${api}/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.Todos = await this.getTodos();
  },
};
</script>
