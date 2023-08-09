<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';
import MultiAnswerQuestionVue from '../../components/predeparture/MultiAnswerQuestion.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.project.expectations";
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
//const lastFormQuestion = thisFormQuestions[thisFormQuestions.length - 1];
// Odstránenie posledných dvoch otázok, ktoré sú iného typu
const keys = Object.keys(thisFormQuestions);
const multiAnswerKeys = keys.slice(0, -2);
const lastFormQuestionsKeys = keys.slice(-2);
console.log('lastFormQuestionsKeys', lastFormQuestionsKeys);

const multiAnswerQuestions = {};
multiAnswerKeys.forEach(key => {
    multiAnswerQuestions[key] = thisFormQuestions[key];
});

const lastFormQuestions = {};
lastFormQuestionsKeys.forEach(key => {
    lastFormQuestions[key] = thisFormQuestions[key];
});

const multiAnswerFields = 3;
const multiAnswers ={
    answer1: 'When (At what point in the mission would you like to implement it?)',
    answer2: 'How (Which tools, which methods...?)',
    answer3: 'Is it reasonable/ achievable'
};

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
        <h1>My expectations</h1>
        <br>
        <p>
            Please justify your answer for each suggestion proposed. You can also add some expectations that you have about your project.
        </p>
        <br>
        <h2>1. What I expect from this project? How? When? Is it reasonable/achievable?</h2>
        <br>
        <p>
            Please justify your answer for each suggestion proposed. You can also add some expectations that you have about your project.
        </p>
        <br>
        <MultiAnswerQuestionVue :questions="multiAnswerQuestions" :volunteerData="volunteerData" :path="path" :multiAnswers="multiAnswers" :multiAnswerFields="multiAnswerFields" />
        <br>
        <h3>TIPS</h3>
        <p>
            <ul>
                <li><b>It is good to set some professional and personal objectives,</b> but you should also be open for change and flexibility in the field.</li>
                <li><b>Set SMART objectives</b><br>  considering also the resources and the capacity of the organisation and the length of your project.</li>
                <li><b>Flexibility and adaptability</b> are key skills in an European or international project.</li>
            </ul>
        </p>
        <br>
        <br>
        <h2>2. What I expect from my hosting Organisation:</h2>

        <QuestionsList :questions="lastFormQuestions" :volunteerData="volunteerData" :path="path" />
        <br>
        <router-link
            :to="{
                name: 'ProjectHowIseePage',
            }"
        >
            <v-btn color="primary" class="my-button">NEXT</v-btn>
        </router-link>


    </v-container>
  
</template>