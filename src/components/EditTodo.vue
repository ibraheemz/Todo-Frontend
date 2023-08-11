<template>
  <form v-if="showForm" @submit="onUpdate" class="add-form">
    <div class="form-control">
      <label>Todo</label>
      <input type="text" v-model="title" name="title" />
    </div>
    <div class="form-control">
      <label>Description</label>
      <input
        type="text"
        v-model="description"
        name="description"
        placeholder="Todo Description"
      />
    </div>
    <input type="submit" value="Save Todo" class="btn btn-block" />
    <button @click="closeForm" value="Close" class="btn btn-block">
      Close
    </button>
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  props: { todo: Object },
  data() {
    return {
      title: this.todo.title ?? "",
      description: this.todo.title ?? "",
      showForm: true,
    };
  },
  methods: {
    onUpdate(e) {
      e.preventDefault();
      if (!this.title) {
        alert("You can't leave the title empty");
        return;
      }
      const updatedTodo = {
        title: this.title,
        description: this.description,
        id: this.todo.id,
      };
      this.$emit("updateTodo", updatedTodo);
      this.$emit("closeForm", this.showForm);
    },
    closeForm() {
      this.showForm = !this.showForm;
      this.$emit("closeForm", this.showForm);
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
