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
import axios from "axios";

var callback = function() {
  var buttonEl = document.querySelector("#refreshFavoriteMoviesBtn");
  console.log(buttonEl);
  buttonEl.click();
  debugger;
};

import { EventBus } from "../event-bus.js";
EventBus.$on("addedToFavorites", callback);

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
  },
  created: function() {
    
    // var config = {  headers: {'X-Hasura-Access-Key': 'freecodecamp'}};
    // var data = JSON.stringify({query:"query {\n  favorite_movies {\n    id\n    name\n  }\n}",variables:null})
    // axios.post('http://fccbv-movie-list.herokuapp.com/v1alpha1/graphql',
    // data,
    // config)
    //     .then((response)= > {
    //       debugger;
    //        this.$store.state.myFavoriteMovies = response.data;
    //     });

    // var config = { headers: { "X-Hasura-Access-Key": "freecodecamp" } };
    // var data = JSON.stringify({
    //   query:
    //     'mutation insert_favorite_movies {\n  insert_favorite_movies(\n    objects: [\n      {\n        id: 72,\n        name: "Article 1"\n      }\n    ]\n  ) {\n    returning {\n      id\n      name\n    }\n  }\n}',
    //   operationName: "insert_favorite_movies",
    //   variables: null
    // });
    // axios
    //   .post(
    //     "http://fccbv-movie-list.herokuapp.com/v1alpha1/graphql",
    //     data,
    //     config
    //   )
    //   .then(response => {
    //     debugger;
    //     this.$store.state.myFavoriteMovies = response.data;
    //   });

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
