<script setup>
import 'vuetify/dist/vuetify.min.css';

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
    <v-container class="welcome-page" fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12">
            Welcome {{ volunteerData.basicInfo.volunteerInfo.name }} Here is your welcome page. Hope that you will find everything what you want.
          <v-img src="path_to_your_image" alt="Welcome Image" height="100"></v-img>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-btn block color="primary" class="my-button">Before project</v-btn>
          <v-btn block color="secondary" class="my-button">On project</v-btn>
          <v-btn block color="accent" class="my-button">After project</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style>
  .welcome-page {
    /* height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .my-button {
    margin: 10px 0;
    width: 100%;
  }
  </style>
  
