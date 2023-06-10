<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AdminPage from './AdminPage.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const admin = import.meta.env.VITE_ADMIN;

const isAdmin = computed(() => userState.value?.userData?.uid === admin);
</script>

<template>
  <div class="container mx-auto">
    <div class="w-full text-center">
      <h1>Home Page</h1>
      <h1 class="text-3xl ml-5 mb-7" v-text="isAdmin ? 'Toto je admin' : 'Toto nieje Admin'"></h1>
      <AdminPage v-if="isAdmin" :userState="userState"/>
    </div>
  </div>
</template>
