<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span style="font-weight: bold">
        <span><i class="fas fa-mouse"></i></span>
        Double click to mark as complete
        <span><i class="fas fa-mouse"></i></span
      ></span>
      <div class="helpers">
        <span><span class="incomplete box"></span> = Incomplete</span>
        <span><span class="complete box"></span> = Complete</span>
      </div>
    </div>
    <div class="todos">
      <div
        @dblclick="onDbClick(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        class="todo"
        :class="{ complete: todo.completed, incomplete: !todo.completed }"
      >
        {{ todo.title }}
        <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo", "updateTodo"]),
    onDbClick(todo) {
      this.updateTodo({
        ...todo,
        completed: !todo.completed,
      });
    },
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  user-select: none;
}

i.fa-trash-alt {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

i.fa-trash-alt:hover {
  color: red;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.helpers {
  display: flex;
  justify-content: space-around;
  min-width: 250px;
}

.box {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.complete {
  background: #35495e;
  color: #fff;
}

.incomplete {
  background: #41b883;
  color: #000;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>