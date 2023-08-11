<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Todo</label>
      <input type="text" v-model="title" name="title" placeholder="Add Todo" />
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
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.title) {
        alert("Please add a Todo");
        return;
      }
      const newTodo = {
        title: this.title,
        description: this.description,
      };
      this.$emit("add-todo", newTodo);

      (this.title = ""), (this.description = "");
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
