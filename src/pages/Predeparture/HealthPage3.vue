<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import { checkboxesQuestions } from '../../../services/checkboxesQuestions';
import  QuestionsList  from '../../components/QuestionsList.vue';
import sendData from '../../../services/sendData.js';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.healthQuiz.part3";
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
        <h1>PART 3 - POLITICAL AND SECURITY RISKS</h1>

        <QuestionsList :questions="thisFormQuestions" :volunteerData="volunteerData" :path="path" />
        
        <router-link :to="{
                name: 'HealthPage4' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to  PART 4</v-btn>
        </router-link>
        
    </v-container>
</template>