<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { volunteerDataModel } from '/services/volunteerDataModel.js';
import { loadVolunteerDataByID } from '/services/database.js';


import { useStore } from 'vuex';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);

const router = useRouter();

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
});

const userMail = ref(userState.value.userData.email);
const volunteerData = ref(props.volunteerData);
const loading = ref(true);
const showing = ref(true);

console.log('OnProject Page  volunteerData:', volunteerData.value);

const goBack = () => {
    console.log('goBack with data ' + volunteerData.value);
    if(showing.value) {
        router.back();
    } else {
        showing.value = true;
        
    }
  
};

// const loadVolunteerDataFromDatabase = async () => {
//   try {
//     console.log('Loading volunteerData from database... with email ' + userMail.value);
//     const dataFromDatabase = await loadVolunteerDataByID(userMail.value);
//     volunteerData.value = dataFromDatabase;
//     loading.value = false;
//     console.log('Loaded volunteerData:', dataFromDatabase);
//   } catch (error) {
//     console.error('Error loading data from database:', error);
//     loading.value = false;
//   }
// }


onBeforeMount(() => {
//     console.log('onBeforeMOunt loaded data from DB :' + volunteerData.value);
//   loadVolunteerDataFromDatabase();
//   console.log('onBeforeMOunt loaded data from DB :' + volunteerData.value)

  //volunteerData.value.beforeProject.beforeProject = true
  
});

onMounted(() => {
  //console.log('Toto su data ktore mam na On Project Page: ' + volunteerData.value);
//   console.log('VolunteerPage routeParams:', router.params);
//   console.log('VolunteerPage volunteerData:', volunteerData.value);
    // const volunteerData = routeParams.data;
});

</script>
<template>
    <v-toolbar class="navigation-predeparture" color="primary" dark>
        <v-toolbar-title><button @click="goBack"><i class="material-icons">arrow_back_ios_new</i></button></v-toolbar-title>
    </v-toolbar>
    <v-container class="mobile-first-container">

        <router-link :to="{
                path: '/project/roles' 
            }" >
            <v-btn block color="primary" class="my-button">Roles and Responsibilities</v-btn>
        </router-link>
        <router-link :to="{
                path: '/project/activities' 
            }" >
            <v-btn block color="primary" class="my-button">Activities of the project:</v-btn>
        </router-link>
        <router-link :to="{
                path: '/project/management' 
            }" >
            <v-btn block color="primary" class="my-button">Management of Daily Tasks</v-btn>
        </router-link>
        <router-link :to="{
                path: '/project/followup'
            }" >
            <v-btn block color="primary" class="my-button">Follow-up during the Project</v-btn>
        </router-link>
        <br>
        <hr>
        <br>
        <router-link :to="{
                path: '/home'
            }" >
            <v-btn block color="secondary" class="my-button">BACK</v-btn>
        </router-link>

       
    </v-container>
</template>

<style>
    .v-toolbar__content{
        height: 0;
    }
    /* .nav-margin{
        margin-top: 0;
    } */
    .navigation-predeparture {
        
        position: absolute !important;
        top: 0;
        
    }
</style>