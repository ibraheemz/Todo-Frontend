<template>
  <div @dblclick="$emit('toggle-reminder', todo.id)" class="todo">
    <h3>
      {{ todo.title }}
      <i @click="onDelete(todo.id)" class="fas fa-times"></i>
    </h3>
    <p>
      {{ todo.description }}
    </p>
    <p>{{ todo.day }}</p>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: Object,
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-todo", id);
    },
  },
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

.todo.reminder {
  border-left: 5px solid green;
}

.todo h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
