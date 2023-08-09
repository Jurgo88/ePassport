<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { volunteerDataModel } from '/services/volunteerDataModel.js';
import { loadVolunteerDataByID } from '/services/database.js';

//Predeparture components
import LetterToMyself from '../components/predeparture/LetterToMyself.vue';
import EuropassCV from '../components/predeparture/EuropassCV.vue';
import EnglishTest from '../components/predeparture/EnglishTest.vue';
import LanguageLearning from '../components/predeparture/LanguageLearning.vue';
import Project from '../components/predeparture/Project.vue';
import Country from '../components/predeparture/Country.vue';
import Competences from '../components/predeparture/Competences.vue';
import EuropeanSolidarity from '../components/predeparture/EuropeanSolidarity.vue';
import Insurance from '../components/predeparture/Insurance.vue';
import HealthAndSecurity from '../components/predeparture/HealthAndSecurity.vue';
import BeforeDepartureChecklist from '../components/predeparture/BeforeDepartureChecklist.vue';


import { useStore } from 'vuex';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
// const route = useRoute();
// const routeParams = router.params;

const route = useRoute();
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
const volunteerData = ref(volunteerDataModel);
const loading = ref(true);
const showing = ref(true);
const indexButton = ref(null);

const buttonList = [
  'Letter to myself',
  'Europass CV',
  'English test',
  'Language learning',
  'Project',
  'Country',
  'Competences',
  'European Union',
  'Citizenship and Eco-responsibility',
  'Health and Security Quizz',
  'Before departure CHECKLIST',
];


const goBack = () => {
    console.log('goBack with data ' + volunteerData.value);
    if(showing.value) {
        router.back();
    } else {
        showing.value = true;
        
    }
  
};

const loadVolunteerDataFromDatabase = async () => {
  try {
    console.log('Loading volunteerData from database... with email ' + userMail.value);
    const dataFromDatabase = await loadVolunteerDataByID(userMail.value);
    volunteerData.value = dataFromDatabase;
    loading.value = false;
    console.log('Loaded volunteerData:', dataFromDatabase);
  } catch (error) {
    console.error('Error loading data from database:', error);
    loading.value = false;
  }
}

const handleButtonClick = (buttonText, index) => {
  console.log(index);
  showing.value = false;
  indexButton.value = index;
};



onBeforeMount(() => {
  loadVolunteerDataFromDatabase();

  //volunteerData.value.beforeProject.beforeProject = true
  console.log('onBeforeMOunt loaded data from DB :' + volunteerData.value.beforeProject.beforeProject);
});

onMounted(() => {
  console.log('VolunteerPage mounted');
  console.log('VolunteerPage email:', userMail.value);
  console.log('Toto su data ktore mam : ' + volunteerData.value);
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
        <!-- <v-row v-if="showing">
            <v-col cols="12"  v-for="(buttonText, index) in buttonList" :key="buttonText">
                <v-btn block color="primary" class="my-button" @click="handleButtonClick(buttonText, index)">{{ buttonText }}</v-btn>
            </v-col>
        </v-row> -->
        <router-link :to="{
                name: 'LetterToMyselfPage' 
            }" >
            <v-btn block color="primary" class="my-button">Letter to myself</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuropassCVPage' 
            }" >
            <v-btn block color="primary" class="my-button">Europass CV</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EnglishTestPage' 
            }" >
            <v-btn block color="primary" class="my-button">English test</v-btn>
        </router-link>
        <router-link :to="{
                name: 'ProjectPage' 
            }" >
            <v-btn block color="primary" class="my-button">Project</v-btn>
        </router-link>
        <!--<router-link :to="{
                name: 'LanguageLearningPage' 
            }" >
            <v-btn block color="primary" class="my-button">Language learning</v-btn>
        </router-link> -->
        <router-link :to="{
                name: 'CountryPage' 
            }" >
            <v-btn block color="primary" class="my-button">Country</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuPage' 
            }" >
            <v-btn block color="primary" class="my-button">European Union, Citizenship and Eco-responsibility</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage' 
            }" >
            <v-btn block color="primary" class="my-button">Health and Security Quizz</v-btn>
        </router-link>


        <!-- <v-row>
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

        </v-row> -->
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