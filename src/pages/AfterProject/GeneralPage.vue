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
const path = "afterProject.general";
const loading = ref(false);

const question1value = ref(0);
const question4value = ref(0);
const question5value = ref(0);
const question6value = ref(0);
const question7value = ref(0);
const question8value = ref(0);
const question9value = ref(0);
const question10value = ref(0);
const question11value = ref(0);


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
const firstQuestionsKeys = keys.slice(1, 3);
const lastQuestionsKeys = keys.slice(-3);

const firstQuestion = {};
firstQuestionsKeys.forEach(key => {
    firstQuestion[key] = thisFormQuestions[key];
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
    question1value.value = volunteerData.value.afterProject?.general?.question1 || 0;
    question4value.value = volunteerData.value.afterProject?.general?.question4 || 0;
    question5value.value = volunteerData.value.afterProject?.general?.question5 || 0;
    question6value.value = volunteerData.value.afterProject?.general?.question6 || 0;
    question7value.value = volunteerData.value.afterProject?.general?.question7 || 0;
    question8value.value = volunteerData.value.afterProject?.general?.question8 || 0;
    question9value.value = volunteerData.value.afterProject?.general?.question9 || 0;
    question10value.value = volunteerData.value.afterProject?.general?.question10 || 0;
    question11value.value = volunteerData.value.afterProject?.general?.question11 || 0;

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
        {{thisFormQuestions.question1}}
        <RatingBox :initialRating="question1value" :volunteerData="volunteerData" :path="path" questionData="question1" />
        <br>
        <QuestionsList :questions="firstQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        <h3>How satisfied am I with:</h3>
        <br>
        {{thisFormQuestions.question4}}
        <RatingBox :initialRating="question4value" :volunteerData="volunteerData" :path="path" questionData="question4" />
        <br>
        {{thisFormQuestions.question5}}
        <RatingBox :initialRating="question5value" :volunteerData="volunteerData" :path="path" questionData="question5" />
        <br>
        {{thisFormQuestions.question6}}
        <RatingBox :initialRating="question6value" :volunteerData="volunteerData" :path="path" questionData="question6" />
        <br>
        {{thisFormQuestions.question7}}
        <RatingBox :initialRating="question7value" :volunteerData="volunteerData" :path="path" questionData="question7" />
        <br>
        {{thisFormQuestions.question8}}
        <RatingBox :initialRating="question8value" :volunteerData="volunteerData" :path="path" questionData="question8" />
        <br>
        {{thisFormQuestions.question9}}
        <RatingBox :initialRating="question9value" :volunteerData="volunteerData" :path="path" questionData="question9" />
        <br>
        {{thisFormQuestions.question10}}
        <RatingBox :initialRating="question10value" :volunteerData="volunteerData" :path="path" questionData="question10" />
        <br>
        {{thisFormQuestions.question11}}
        <RatingBox :initialRating="question11value" :volunteerData="volunteerData" :path="path" questionData="question11" />
        <br>
        <QuestionsList :questions="lastQuestion" :volunteerData="volunteerData" :path="path" />
        <br>

        <router-link
           :to=" {
            name: 'AfterProjectPage',
           }">
            <v-btn color="secondary" class="my-button">Go Back</v-btn>
        </router-link>


    </v-container>
</template>