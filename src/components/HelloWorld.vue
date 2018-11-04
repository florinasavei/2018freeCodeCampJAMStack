<template>
  <div id="app">
    <main>
      <v-container>
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
              <v-btn id="btn" class="" v-on:click="getData">Find movie</v-btn>
            </v-flex>
          </v-layout>
        </v-form> 
        <v-layout>
          <v-flex xs12>
            <!--<v-card>-->
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex
                    v-for="(movie, index) in data"
                    :key="index"
                    xs4
                  >
                    <v-card flat tile>
                      <img
                        v-if="movie.Poster" v-bind:src="movie.Poster"
                        height="150px"
                      />
                      <v-flex xs4>
                        <v-btn id="btn" class="" v-on:click="addToFavorites(movie)">Add to watchlitst</v-btn>
                      </v-flex>
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
  import axios from 'axios';
  import { EventBus } from '../event-bus.js';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        data: [],
        movie: '',
        clickCount: 0
      }
    },
    methods: {
      getData: function () {
        axios.get('http://www.omdbapi.com/?s=' + this.movie + '&apikey=93d8cda4')
          .then((response) => {
            this.data = response.data.Search;
          });

      },
      addToFavorites: function (movie) {
        console.log('movie', movie);

        this.$store.state.myFavoriteMovies.push(movie);

        console.log('movies lost', this.$store.state.myFavoriteMovies);
        EventBus.$emit('i-got-clicked', this.clickCount);
      },
      submitForm: function (event) {
        this.getData();
        event.preventDefault();
      }
    }
  }

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
</style>
