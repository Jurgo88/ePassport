<script setup>
import { defineProps, onBeforeMount } from 'vue';
import  BasicInfoCard  from '../components/BasicInfoCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { volunteerDataModel } from '/services/volunteerDataModel.js';
import { loadVolunteerDataByID } from '/services/database.js';
import WelcomePage from './WelcomePage.vue';

const store = useStore();

// props
const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
  volunteerData: {
    type: Object,
    required: true,
  },
});

// reactive variables
const userMail = ref(props.userState.userData.email);
const volunteerData = ref(volunteerDataModel);
const loading = ref(true);

// methods
const handleFormSubmited  = (data) => {
  console.log('handleFormSubmitted : ' + data.basicInfo.volunteerInfo.name);
  volunteerData.value = data;
  console.log('Updated volunteerData:', volunteerData.hasBasicInfo);
}

const loadVolunteerDataFromDatabase = async () => {
  try {
    console.log('Loading volunteerData from database...');
    const dataFromDatabase = await loadVolunteerDataByID(userMail.value);
    volunteerData.value = dataFromDatabase;
    loading.value = false;
    console.log('Loaded volunteerData:', dataFromDatabase);
  } catch (error) {
    console.error('Error loading data from database:', error);
    loading.value = false;
  }
}

// lifecycle hooks
onBeforeMount(() => {
  loadVolunteerDataFromDatabase();
  console.log('onBeforeMOunt loaded data from DB :' + volunteerData.value);
});



</script>
<template>
    <div class="">
      <div v-if="!loading" class="w-full text-center">
        <div class="home-screen">
          <div class="">
            <div v-if="loading">Loading your data...</div>
            <div v-if="!volunteerData.hasBasicInfo">
              <BasicInfoCard @formSubmitted="handleFormSubmited" :volunteerData="volunteerData" />
            </div>
            <div v-else>
              <WelcomePage :volunteerData="volunteerData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>