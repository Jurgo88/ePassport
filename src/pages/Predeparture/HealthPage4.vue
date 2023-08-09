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
const path = "beforeProject.healthQuiz.part4";
const loading = ref(false);

const selected1 = ref([]);
const selected2 = ref([]);

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
const firstQuestions = { 
  question2 : thisFormQuestions.question2, 
  question3 : thisFormQuestions.question3, 
  question4 : thisFormQuestions.question4 
};
const lastQuestion = { 
  question6: thisFormQuestions.question6, 
  question7: thisFormQuestions.question7 
};


const part4Checkbox1Values = checkboxesQuestions.beforeProject.healthQuiz.part4.checkbox1;
const part4Checkbox2Values = checkboxesQuestions.beforeProject.healthQuiz.part4.checkbox2;


function sendSelectedOptions() {
    volunteerData.value.beforeProject.healthQuiz.part4.question1 = selected1.value;
    volunteerData.value.beforeProject.healthQuiz.part4.question5 = selected2.value;
    console.log('volunteerData.value', volunteerData.value);
    sendData(volunteerData.value);
}

onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});


</script>
<template>
    <v-container v-if="!loading">
        <h1>PART 4 - HEALTH</h1>
        <br>
        {{ thisFormQuestions.question1 }}
        <div v-for="(quiestion, index) in part4Checkbox1Values" :key="index">
            <v-checkbox
                v-model="selected1"
                :label="quiestion"
                :value="quiestion"
                @change="sendSelectedOptions"
                ></v-checkbox>
        </div>
        <br>
        <QuestionsList :questions="firstQuestions"  :volunteerData="volunteerData" :path="path"/>

        {{ thisFormQuestions.question5 }}
        <div v-for="(quiestion, index) in part4Checkbox2Values" :key="index">
            <v-checkbox
                v-model="selected2"
                :label="quiestion"
                :value="quiestion"
                @change="sendSelectedOptions"
                ></v-checkbox>
        </div>
        <br>
        <QuestionsList :questions="lastQuestion"  :volunteerData="volunteerData" :path="path"/>


        <router-link :to="{
                name: 'HealthPage5' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to PART 5</v-btn>
        </router-link>
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>