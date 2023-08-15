<script setup>
// import 'vuetify/dist/vuetify.min.css';
import { volunteerDataModel } from '/services/volunteerDataModel.js';
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});

const volunteerData = ref(props.volunteerData);
//const modelValue = ref(volunteerDataModel);
const initializedVolunteerData = computed(() => {
  const mergedData = { ...volunteerDataModel, ...props.volunteerData };
  return mergedData;
});


function countFieldsWithEmptyValue(mergedData) {
  let totalFields = 0;
  let emptyFields = 0;
  let withoutAnswerFields = 4;

  function traverseObject(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        totalFields++;

        if (value === '' || value === null || value === undefined) {
          emptyFields++;
        } else if (typeof value === 'object' && value !== null) {
          traverseObject(value); // Rekurzívne prehľadávanie vnorených štruktúr
        }
      }
    }
  }

  traverseObject(mergedData);

  return {
    totalFields,
    emptyFields,
    withoutAnswerFields,
  };
}

const progress = computed(() => {
  const { totalFields, emptyFields, withoutAnswerFields } = countFieldsWithEmptyValue(initializedVolunteerData.value);
  return (1 - (emptyFields  - withoutAnswerFields) / totalFields) * 100; // Výpočet percentuálneho progresu
});

onMounted(() => {
  console.log('onMounted: ' + props.volunteerData.value);
  const { totalFields, emptyFields, withoutAnswerFields } = countFieldsWithEmptyValue(initializedVolunteerData.value);
  console.log('Total Fields:', totalFields);
  console.log('Empty Fields:', emptyFields);

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
                color="accent"
                >
                <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-linear>
          <v-img src="path_to_your_image" alt="Welcome Image" height="100"></v-img>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12">
            <router-link :to="{
                path: '/predeparture', 
                params: { volunteerData: volunteerData.value},
            }" >
               <v-btn block color="primary" class="my-button">Pre-departure</v-btn>
            </router-link>
            <router-link :to="{
                name: 'OnProjectPage', 
                params: { volunteerData: volunteerData.value},
            }" >
               <v-btn block color="primary" class="my-button">On the project</v-btn>
            </router-link>
            <router-link :to="{
                name: 'AfterProjectPage', 
                params: { volunteerData: volunteerData.value},
            }" >
               <v-btn block color="primary" class="my-button">Evaluation of the Experience</v-btn>
            </router-link>
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
    height: 70px !important;
    white-space: nowrap;
  }
  .my-button > span {
    white-space: break-spaces;
  }
  </style>
  
