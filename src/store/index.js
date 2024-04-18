import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    registeredUsers: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    ADD_REGISTERED_USER(state, user) {
      state.registeredUsers.push(user);
    },
  },
  actions: {
    loginUser({ commit, state }, { email, password }) {
      const user = state.registeredUsers.find(user => 
        user.email === email && user.password === password
      );

      if (user) {
        commit('SET_USER', user);
        commit('SET_AUTHENTICATED', true);
      } else {
        console.error('Login failed: Invalid email or password');
      }
    },
    registerUser({ commit }, userData) {
      commit('ADD_REGISTERED_USER', userData);
      // After registering, also commit this user data to SET_USER
      commit('SET_USER', userData);
    },
    logoutUser({ commit }) {
      commit('SET_USER', null);
      commit('SET_AUTHENTICATED', false);
    },
    fetchUserData({ commit }) {
      // Fetch the latest registered user data from the registeredUsers array
      const latestUserData = this.state.registeredUsers[this.state.registeredUsers.length - 1];
      commit('SET_USER', latestUserData);
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    getRegisteredUsers: (state) => state.registeredUsers,
  }
});
