<template>
  <div>
    <FavoriteMoviesList />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import FavoriteMoviesList from "../components/FavoriteMoviesList.vue";

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    FavoriteMoviesList
  }
};
</script>
