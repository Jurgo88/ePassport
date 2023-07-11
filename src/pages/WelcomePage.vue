<script setup>
// import 'vuetify/dist/vuetify.min.css';

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});
</script>

<script>
  export default {
    data: () => ({ 
        value: 1,
        progress: 33,
    }),

  }
</script>

<template>
    <v-container class="welcome-page" fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12">
            Welcome {{ volunteerData.basicInfo.volunteerInfo.name }}. Here is your progress:
            <v-progress-linear
                v-model="progress"
                height="25"
                >
                <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-linear>
          <v-img src="path_to_your_image" alt="Welcome Image" height="100"></v-img>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-btn block color="primary" class="my-button">Pre-departure</v-btn>
          <v-btn block color="secondary" class="my-button">On the project</v-btn>
          <v-btn block color="accent" class="my-button">Evaluation of the Experience</v-btn>
        </v-col>
      </v-row>
     
      <v-row>
        <v-layout class="overflow-visible">
            <v-bottom-navigation
            v-model="value"
            active
            bg-color="primary"
            rounded="true"
            >
            <v-btn>
                <i class="material-icons">add_home</i>
            </v-btn>

            <v-btn>
                <i class="material-icons">add_alert</i>
            </v-btn>

            <v-btn>
                <i class="material-icons">file_open</i>
                <span></span>
            </v-btn>
            </v-bottom-navigation>
        </v-layout>
        
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
    /* height: 80px !important; */
  }
  </style>
  
