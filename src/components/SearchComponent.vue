<template>
  <div id="app">
    <main>
      <v-container>
        <SpinnerComponent/>
        <v-form v-on:submit="submitForm">
          <v-layout row wrap>
            <v-flex xs3 sm3 md3>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="movie"
                            label="Movie name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 md2>
              <v-btn id="btn" class="" v-on:click="getData">
                <v-icon>fas fa-search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout>
          <v-flex xs12>
            <!--<v-card>-->
            <v-container fluid>
              <v-layout row wrap>
                <v-flex pa-1
                  v-for="(movie, index) in data"
                  :key="index"
                  xs4
                >
                  <v-card>
                    <img
                      v-if="movie.Poster!='N/A'" v-bind:src="movie.Poster"
                      height="150px"
                    />
                    <img v-else-if="movie.Poster==='N/A'" src="http://www.ussimpervious.com/MSO-449files/mso-449b.jpg"
                         height="150px"/>
                    <h3 class="text" v-if="movie.Title">{{movie.Title}}</h3>
                    <button v-if="checkDupicate(movie.imdbID)" id="btn" class="" v-on:click="addToFavorites(movie)">
                          <div class="text-xs-center">
                            <v-chip>
                              <v-icon left>fas fa-plus-circle</v-icon>
                              Add to favorites
                            </v-chip>
                          </div>
                          </button>

                          <button v-if="!checkDupicate(movie.imdbID)" disabled id="btn" class="" >
                          <div class="text-xs-center">
                            <v-chip>
                              <v-icon left>fas fa-check-circle</v-icon>
                              Allready Added
                            </v-chip>
                          </div>
                          </button>

                    <v-dialog
                      v-model="dialog"
                      width="750"
                      light
                    >
                      <button
                        slot="activator"
                        v-on:click="getMovieData(movie.imdbID)"
                        light
                      >
                        <v-chip>
                                <v-icon>fas fa-eye</v-icon>
                        </v-chip>
                      </button>

                      <v-card>
                        <v-card-title
                          class="justify-center"
                          primary-title
                        >
                          <img
                            v-if="currentMovieData.Poster!='N/A'" v-bind:src="currentMovieData.Poster"
                            height="300px"
                          />
                          <img v-else-if="currentMovieData.Poster==='N/A'" src="http://www.ussimpervious.com/MSO-449files/mso-449b.jpg"
                               height="300px"/>
                        </v-card-title>

                        <v-card-text>
                          <h1>{{currentMovieData.Title}}</h1>
                          <p>{{currentMovieData.Plot == "N/A"? '' : currentMovieData.Plot}}</p>
                        </v-card-text>

                        <div class="text-xs-center">
                          <v-rating v-model="currentMovieRating" length="10" readonly></v-rating>
                        </div>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <!--</v-card>-->
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../event-bus.js";
import SpinnerComponent from "../components/Spinner.vue";

export default {
  name: "SearchComponent",
  components: { SpinnerComponent },
  data() {
    return {
      data: [],
      movie: "",
      protocol:location.protocol,
      clickCount: 0,
      favoriteMoviesList: this.$store.state.myFavoriteMovies,
      dialog: false,
      currentMovieData: {},
      currentMovieRating: 0
    };
  },
  methods: {
    getData: function() {
      EventBus.$emit("showSpinner", this.clickCount);
      setTimeout(
        () =>
          axios
            .get(
              this.protocol+"//www.omdbapi.com/?s=" + this.movie + "&apikey=93d8cda4"
            )
            .then(response => {
              this.data = response.data.Search;
              EventBus.$emit("hideSpinner", this.clickCount);
            }),
        500
      );
    },
    getMovieData: function(movieId) {
      axios
        .get(this.protocol+"//www.omdbapi.com/?i=" + movieId + "&apikey=93d8cda4")
        .then(response => {
          this.currentMovieData = response.data;
          this.currentMovieRating = response.data.Ratings[0]
            ? parseInt(response.data.Ratings[0].Value.substring(0, 3))
            : 0;
        });
    },
    checkDupicate: function(imdbID) {
      let isDuplicate = false;
      this.favoriteMoviesList.forEach(movie => {
        if (movie.imdbID == imdbID) {
          isDuplicate = true;
        }
      });

      return !isDuplicate;
    },
    addToFavorites: function(movie) {
      this.$store.state.myFavoriteMovies.push(movie);
      this.favoriteMoviesList = this.$store.state.myFavoriteMovies;

      var config = { headers: { "X-Hasura-Access-Key": "freecodecamp" } };
      var query = `mutation insert_favorite_movies {insert_favorite_movies(objects: [ { Title : "${
        movie.Title
      }", imdbID : "${movie.imdbID}", Poster: "${movie.Poster}" , Year:${
        movie.Year
      }, fbUser:"${this.$store.state.loggedUser.id}" } ]  ) { returning {id   Title   }  }}`;

      var data = JSON.stringify({
        query: query,
        operationName: "insert_favorite_movies",
        variables: null
      });

      axios
        .post(
          this.protocol+"//fccbv-movie-list.herokuapp.com/v1alpha1/graphql",
          data,
          config
        )
        .then(response => {
          EventBus.$emit("addedToFavorites", this.clickCount);
        });
    },
    submitForm: function(event) {
      this.getData();
      event.preventDefault();
    }
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .text {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
</style>
