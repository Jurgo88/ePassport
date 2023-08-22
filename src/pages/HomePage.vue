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
    <div class="">
      <AdminPage v-if="isAdmin" :userState="userState"/>
      <VolunteerPage v-if="!isAdmin" :userState="userState"/>
    </div>
  </v-container>
</template>
<style >
    .mobile-first-container {
    }
    .textarea {
        width: 80%;
        float: left;
    }  
    .myButton {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
        display: none;
    }
    h1 {
        font-size: 32px;
        font-weight: 700;
        color: #0c2f6b;
    }
    h2{
        font-size: 24px;
        font-weight: 700;
        color: #0c2f6b;
    }
    h3{
        font-size: 20px;
        font-weight: 700;
        color: #0c2f6b;
    }
    h4{
        font-size: 16px;
        font-weight: 700;
        color: #0c2f6b;
    }
    h5{
        font-size: 14px;
        font-weight: 700;
        color: #0c2f6b;
    }
</style>