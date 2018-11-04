import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myFavoriteMovies: [],
    loggedUser: {
      id: null,
      name: 'John Doe'
    }
  },
  mutations: {

  },
  actions: {

  }
})
