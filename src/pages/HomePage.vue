<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AdminPage from './AdminPage.vue';
import VolunteerPage from './VolunteerPage.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const admin = import.meta.env.VITE_ADMIN;

// Check if user is admin
const isAdmin = computed(() => userState.value?.userData?.uid === admin);
</script>

<template>
  <v-container fluid class="container mx-auto">
    <div class="text-center">
      <AdminPage v-if="isAdmin" :userState="userState"/>
      <VolunteerPage v-if="!isAdmin" :userState="userState"/>
    </div>
  </v-container>
</template>