<template>
  <div style="margin-top: 2rem">
    <h3>Add Todo</h3>
    <b-form @submit="onSubmit">
      <b-input
        type="text"
        v-model="title"
        placeholder="Add Todo..."
        @focus="isAddTodoInputFocused = true"
        @blur="isAddTodoInputFocused = false"
        class="addTodoInput"
        :class="{ greenFocusShadow: isAddTodoInputFocused }"
      />
      <b-button
        type="submit"
        @focus="isAddTodoButtonFocused = true"
        @blur="isAddTodoButtonFocused = false"
        class="submitTodoButton"
        :class="{ greenFocusShadow: isAddTodoButtonFocused }"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      isAddTodoButtonFocused: false,
      isAddTodoInputFocused: false,
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      if (!this.title.trim()) return;
      this.addTodo(this.title);
      this.title = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}

.addTodoInput {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
  border-radius: 0px;
  margin-right: 4px;
}

.submitTodoButton {
  flex: 2;
  background: #41b883;
  border: 1px solid #41b883;
  border-radius: 0px;
}

.greenFocusShadow {
  box-shadow: 0 0 0 0.25rem rgb(65 184 131 / 50%) !important;
}
</style>