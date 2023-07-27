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
    On The Project Page
    <v-container class="mobile-first-container">
        <v-row>
            <v-col cols="12">
                <h1>On The Project</h1>
            </v-col>
        </v-row>
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
        <router-link to="/volunteer/ontheproject/europasscv">Europass CV</router-link>
        <router-link to="/volunteer/ontheproject/englishtest">English Test</router-link>
        <router-link to="/volunteer/ontheproject/languagelearning">Language Learning</router-link>
        <v-row v-if="showing">
            <v-col cols="12"  v-for="(buttonText, index) in buttonList" :key="buttonText">
                <v-btn block color="primary" class="my-button" @click="handleButtonClick(buttonText, index)">{{ buttonText }}</v-btn>
            </v-col>
        </v-row>
        <v-row>
            kokot
            <LetterToMyself v-if="indexButton === 0 && !showing" :volunteerData="volunteerData" />
            <EuropassCV v-if="indexButton === 1 && !showing" :volunteerData="volunteerData" />
            <EnglishTest v-if="indexButton === 2 && !showing" :volunteerData="volunteerData" />
            <LanguageLearning v-if="indexButton === 3 && !showing" :volunteerData="volunteerData" />
            <Project v-if="indexButton === 4 && !showing" :volunteerData="volunteerData" />
            <Country v-if="indexButton === 5 && !showing" :volunteerData="volunteerData" />
            <Competences v-if="indexButton === 6 && !showing" :volunteerData="volunteerData" />
            <EuropeanSolidarity v-if="indexButton === 7 && !showing" :volunteerData="volunteerData" />
            <Insurance v-if="indexButton === 8 && !showing" :volunteerData="volunteerData" />
            <HealthAndSecurity v-if="indexButton === 9 && !showing" :volunteerData="volunteerData" />
            <BeforeDepartureChecklist v-if="indexButton === 10 && !showing" :volunteerData="volunteerData" /> 

        </v-row>
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