<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';
import RatingBox from '../../components/RatingBox.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "afterProject.competences";
const loading = ref(false);

const question12value = ref(0);
const question13value = ref(0);
const question14value = ref(0);


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
const keys = Object.keys(thisFormQuestions);
const firstQuestionsKeys = keys.slice(0, 6);
const secondQuestionsKeys = keys.slice(6, 11);
const lastQuestionsKeys = keys.slice(-2);

const firstQuestion = {};
firstQuestionsKeys.forEach(key => {
    firstQuestion[key] = thisFormQuestions[key];
});

const secondQuestion = {};
secondQuestionsKeys.forEach(key => {
    secondQuestion[key] = thisFormQuestions[key];
});

const lastQuestion = {};
lastQuestionsKeys.forEach(key => {
    lastQuestion[key] = thisFormQuestions[key];
});





onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    //question1value.value = volunteerData.value.afterProject?.tasks?.question1 || 0;
    question12value.value = volunteerData.value.afterProject?.competences?.question12 || 0;
    question13value.value = volunteerData.value.afterProject?.competences?.question13 || 0;
    question14value.value = volunteerData.value.afterProject?.competences?.question14 || 0;


    loading.value = false;
  } catch (error) {
    console.error(error);
  }
});


</script>
<template>
    <v-container v-if="!loading">
        <h1>Learning and competences</h1>
        <br>
        <p>
            What kind of competences did I develop throughout the activity?
        </p>
        <br>
        <QuestionsList :questions="firstQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        <h3>What kind of competences was I able to bring to my hosting organization?</h3>
        <br>
        <QuestionsList :questions="secondQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question12 }}
        <RatingBox :initialRating="question12value" :volunteerData="volunteerData" :path="path" questionData="question12" />
        <br>
        {{ thisFormQuestions.question13 }}
        <RatingBox :initialRating="question13value" :volunteerData="volunteerData" :path="path" questionData="question13" />
        <br>
        {{ thisFormQuestions.question14 }}
        <RatingBox :initialRating="question14value" :volunteerData="volunteerData" :path="path" questionData="question14" />
        <br>
        <QuestionsList :questions="lastQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        <router-link
           :to=" {
            name: 'GeneralPage',
           }">
            <v-btn color="primary" class="my-button">General Evaluation</v-btn>
        </router-link>


    </v-container>
</template>