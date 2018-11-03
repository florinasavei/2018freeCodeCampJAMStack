<template>
  <div>
    <h1>ceva</h1>
    <FavoriteMoviesList />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import FavoriteMoviesList from "../components/FavoriteMoviesList.vue";

export default {
  components: {
    HelloWorld,
    FavoriteMoviesList
  }
};
</script>
