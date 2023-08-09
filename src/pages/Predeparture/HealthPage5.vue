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
const selected3 = ref([]);

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

const part5Checkbox1Values = checkboxesQuestions.beforeProject.healthQuiz.part5.checkbox1;
const part5Checkbox2Values = checkboxesQuestions.beforeProject.healthQuiz.part5.checkbox2;
const part5Checkbox3Values = checkboxesQuestions.beforeProject.healthQuiz.part5.checkbox3;

function sendSelectedOptions() {
    volunteerData.value.beforeProject.healthQuiz.part5.question1 = selected1.value;
    volunteerData.value.beforeProject.healthQuiz.part5.question2 = selected2.value;
    volunteerData.value.beforeProject.healthQuiz.part5.question3 = selected3.value;
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
    console.error(error);
  }
});

    



</script>
<template>
    <v-container v-if="!loading">
        <h1>PART 5 – INSURANCE</h1>
        <br>
        {{ thisFormQuestions.question1 }}
        <div v-for="(question, index) in part5Checkbox1Values" :key="index">
            <v-checkbox
                v-model="selected1"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question2 }}
        <div v-for="(question, index) in part5Checkbox2Values" :key="index">
            <v-checkbox
                v-model="selected2"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question3 }}
        <div v-for="(question, index) in part5Checkbox3Values" :key="index">
            <v-checkbox
                v-model="selected3"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        
        <router-link :to="{
                name: 'HealthPage6' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to PART 6 </v-btn>
        </router-link>
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>