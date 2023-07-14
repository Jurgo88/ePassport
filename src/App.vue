<script setup>
import Nav from "./components/Nav.vue";
</script>

<template>
  <Nav  v-if="$route.name !== 'PredeparturePage'"/>
  <div class="nav-margin">
    <RouterView />
  </div>
</template>

<style>
  .nav-margin {
    margin-top: 64px;
  }
</style>
