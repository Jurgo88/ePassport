<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "onProject.activities";
const loading = ref(false);

function getQuestionsByPath(obj, path) {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      return '';
    }
  }
  return value;
}

const thisFormQuestions = getQuestionsByPath(questions, path); // Získanie hodnoty pod cestou z objektu questions



onBeforeMount(async () => {
  try {
    loading.value = true;
    //Toto je pre pripad, keby som chcel nacitat iba onProject data
    // const dataFromDatabase = await loadOnProjectDataByID(uid);
    // volunteerDataOnProject.value = dataFromDatabase; // Meníme hodnotu ref.
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
});




</script>

<template>
  <v-container v-if="!loading">
    <h1>Activities of the project:</h1>
    <QuestionsList :questions="thisFormQuestions" :volunteerData="volunteerData" :path="path" />
    <br>
    <br>
    <router-link
       :to=" {
        name: 'ManagementPage',
       }">
      <v-btn color="primary" class="my-button">NEXT</v-btn>
     
    </router-link>

    
  </v-container>

</template>