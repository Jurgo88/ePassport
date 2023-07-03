<script setup>
import { defineProps } from 'vue';
import  BasicInfoCard  from '../components/BasicInfoCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { volunteerDataModel } from '/services/volunteerDataModel.js';

const store = useStore();


const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
  volunteerData: {
    type: Object,
    required: true,
    //data: [],
  },
});

const userMail = ref(props.userState.userData.email);

const volunteerData = ref(volunteerDataModel);

//const user = ref(props.userState.userData.user);

const handleFormSubmited  = (data) => {
  volunteerData.value.basicInfo.volunteerInfo = data.volunteerInfo;
  volunteerData.value.basicInfo.hoInfo = data.hoInfo;
  volunteerData.value.basicInfo.soInfo = data.soInfo;
  console.log('handleFormSubmitted');
  console.log('Updated volunteerData:', volunteerData.value);
}





console.log('Volunteer page' + volunteerData.value);
//console.log("has basic info " +user);
</script>
<template>
    <div class="container mx-auto">
      <div class="w-full text-center">
        <h1>Volunteer Page</h1>
        <div>{{ userMail }}</div>
        <div>Tu by mal byt temnto uzivatel : {{ volunteerData}}</div>
        <div class="home-screen">
          <div class="flex flex-col">
            <div ></div>
            <BasicInfoCard :formSubmitted="handleFormSubmited" :volunteerData="volunteerData" />
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>