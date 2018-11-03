<template>
  <div id="favoriteMoviesListContainer">
      <main>
        <v-container>
          <div class="wrapper">
            <v-flex xs12 sm2 md2>
                <v-btn id="refreshFavoriteMoviesBtn" ref="refreshFavoriteMoviesBtn" class="" v-on:click="refreshFavoriteMovies">refresh movies</v-btn>
            </v-flex>
          <div v-if="favoriteMoviesList" id="example-1">
            <div v-for='movie in favoriteMoviesList'>
             <p>{{movie.Title}}</p>
            </div>
          </div>
        </div>
      </v-container>
    </main>
  </div>
</template>

<script>

var callback = function(){
  var buttonEl = document.querySelector('#refreshFavoriteMoviesBtn');
  console.log(buttonEl);
  buttonEl.click();
  debugger;
};

import { EventBus } from "../event-bus.js";
EventBus.$on("i-got-clicked", callback);

export default {
  name: "FavoriteMoviesList",

  data() {
    return {
      favoriteMoviesList: []
    };
  },
  methods: {
    refreshFavoriteMovies: function() {
      console.log(this.favoriteMoviesList);
      this.favoriteMoviesList = this.$store.state.myFavoriteMovies;
    }
  }
};
</script>

<style>
#favoriteMoviesListContainer {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: fixed;
}
</style>
