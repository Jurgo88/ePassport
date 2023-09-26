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
const path = "beforeProject.project.competences";
const loading = ref(false);

const selected1 = ref([]);
const selected2 = ref([]);
const selected3 = ref([]);
const selected4 = ref([]);
const selected5 = ref([]);


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
const firstQuestionsKeys = keys.slice(0, 5);
const lastQuestionKey = keys.slice(-1);


const firstQuestion = {};
firstQuestionsKeys.forEach(key => {
    firstQuestion[key] = thisFormQuestions[key];
});

const lastQuestion = {};
lastQuestion[lastQuestionKey] = thisFormQuestions[lastQuestionKey];


const competencesCheckbox1Values = checkboxesQuestions.beforeProject.project.competences.checkbox1;
const competencesCheckbox2Values = checkboxesQuestions.beforeProject.project.competences.checkbox2;
const competencesCheckbox3Values = checkboxesQuestions.beforeProject.project.competences.checkbox3;
const competencesCheckbox4Values = checkboxesQuestions.beforeProject.project.competences.checkbox4;
const competencesCheckbox5Values = checkboxesQuestions.beforeProject.project.competences.checkbox5;

function sendSelectedOptions() {
    volunteerData.value.beforeProject.project.competences.question6 = selected1.value;
    volunteerData.value.beforeProject.project.competences.question7 = selected2.value;
    volunteerData.value.beforeProject.project.competences.question8 = selected3.value;
    volunteerData.value.beforeProject.project.competences.question9 = selected4.value;
    volunteerData.value.beforeProject.project.competences.question10 = selected5.value;
    console.log('volunteerData.value', volunteerData.value);
    sendData(volunteerData.value);
}





onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    selected1.value = volunteerData.value.beforeProject?.project?.competences?.question6 || [];
    selected2.value = volunteerData.value.beforeProject?.project?.competences?.question7 || [];
    selected3.value = volunteerData.value.beforeProject?.project?.competences?.question8 || [];
    selected4.value = volunteerData.value.beforeProject?.project?.competences?.question9 || [];
    selected5.value = volunteerData.value.beforeProject?.project?.competences?.question10 || [];
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }

});

</script>
<template>
    <v-container v-if="!loading">
        <h1>Competences</h1>
        <br>
        <h3>1. What kind of competences you would like to develop?</h3>

        <QuestionsList :questions="firstQuestion" :volunteerData="volunteerData" :path="path" />

        <br>
        <h3>2. What kind of competences you could transfer to the local organization?</h3>
        <br>

        {{ thisFormQuestions.question6 }}
        <div v-for="(question, index) in competencesCheckbox1Values" :key="index">
            <v-checkbox
                v-model="selected1"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question7 }}
        <div v-for="(question, index) in competencesCheckbox2Values" :key="index">
            <v-checkbox
                v-model="selected2"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question8 }}
        <div v-for="(question, index) in competencesCheckbox3Values" :key="index">
            <v-checkbox
                v-model="selected3"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        Network <br>
        {{ thisFormQuestions.question9 }}
        <div v-for="(question, index) in competencesCheckbox4Values" :key="index">
            <v-checkbox
                v-model="selected4"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question10 }}
        <div v-for="(question, index) in competencesCheckbox5Values" :key="index">
            <v-checkbox
                v-model="selected5"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        <QuestionsList :questions="lastQuestion" :volunteerData="volunteerData" :path="path" />




        
        <router-link :to="{
                name: 'ProjectHowBenefitPage' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to HOW WILL THE PROJECT BENEFIT ME?</v-btn>
        </router-link>
        
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>