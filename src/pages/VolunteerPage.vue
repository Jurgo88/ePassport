<script setup>
import { defineProps, onBeforeMount } from 'vue';
import  BasicInfoCard  from '../components/BasicInfoCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { volunteerDataModel } from '/services/volunteerDataModel.js';
import { loadVolunteerDataByID } from '/services/database.js';

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
    <div class="container mx-auto">
      <div v-if="!loading" class="w-full text-center">
        <h1>Volunteer Page</h1>
        <div>{{ userMail }}</div>
        <div class="home-screen">
          <div class="flex flex-col">
            <div v-if="!volunteerData.hasBasicInfo">
              <BasicInfoCard @formSubmitted="handleFormSubmited" :volunteerData="volunteerData" />
            </div>
            <div v-if="loading">Loading your data...</div>
            <div v-else>
              Welcome page
            </div>
            
          </div>
        </div>
      </div>
      <div v-else>
        Loading your data...
      </div>
    </div>
  </template>

<style scoped>

</style>