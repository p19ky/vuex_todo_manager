import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );

    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  },
  async filterTodos({ commit }, event) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${event.target.value}`
    );

    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);

    commit("updateTodo", response.data)
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) =>
    state.todos.unshift({
      ...todo,
      id: (todo.id += Math.floor(Math.random() * (99999 - 1) + 1)),
    }),
  removeTodo: (state, id) =>
    state.todos.splice(
      state.todos.findIndex((e) => e.id === id),
      1
    ),
    updateTodo: (state, updatedTodo) => {
      const indexOfTodo = state.todos.findIndex(e => e.id === updatedTodo.id);

      if (indexOfTodo >= 0) {
        state.todos.splice(indexOfTodo, 1, updatedTodo);
      }
    }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
