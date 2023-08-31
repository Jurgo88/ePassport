<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID }  from '/services/database.js';
import sendData from '../../../services/sendData.js';
import { questions } from '../../../services/questions';
import QuestionsList from '../../components/QuestionsList.vue';
import AnswerBox from '../../components/AnswerBox.vue';


const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.letterToMyself";
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

//4.8. toto treba spravit tak aby sa posielal objekt, bud vytvorit pre LetterToMyself question1 alebo nebudem vobec posielat QestionList a spravim si novu funkciu


function handleAnswer(answerData) {
  console.log('handleAnswer', answerData);
  volunteerData.value.beforeProject.letterToMyself = answerData.answer;
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
        <h1>Letter to myself</h1>
        <br>
        <p>How is this experience is connected with my future career? (My first motivation to do an international mobility), 
            which specific mission and which countries. 
        <br><br>
        What would I like to achieve personally and professionally, my strengths to reach these objectives, my fears and challenges, 
        what should I leave home and what should I take with me - material and not only
        <br><br>
        Hybrid or virtual mobility? Explain also how you will organize your tasks in remote. 
        What is important for you and the organisation which will work with you?
    </p>
    <br>
    <br>
    <!-- {{ questions.beforeProject.letterToMyself  }} -->
    <br>
    <br>
    <hr>
    <br>
    <AnswerBox :answer="volunteerData.beforeProject.letterToMyself" :volunteerData="volunteerData" @answer="handleAnswer" />
    <br>
    <hr>
    <br>
    <router-link :to="{
            path: '/predeparture' 
        }" >
        <v-btn block color="secondary" class="my-button">Back</v-btn>
    </router-link>
    </v-container>
</template>
