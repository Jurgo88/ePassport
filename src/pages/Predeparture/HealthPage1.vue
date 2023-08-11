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
const path = "beforeProject.healthQuiz.part1";
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
const firstQuestion = { question1: thisFormQuestions.question1 };
console.log('firstQuestion', firstQuestion);
// const firstQuestion = { question1: questions.beforeProject.healthQuiz.part1.question1};

const part1Checkbox1Values = checkboxesQuestions.beforeProject.healthQuiz.part1.checkbox1;
const part1Checkbox2Values = checkboxesQuestions.beforeProject.healthQuiz.part1.checkbox2;
const part1Checkbox3Values = checkboxesQuestions.beforeProject.healthQuiz.part1.checkbox3;



console.log('HealthPage');

function sendSelectedOptions() {
    // const quiz = {
    //   part1: {
    //     //prvu otazku mam zle, lebo pri refreshnuti a posielani do db sa posle povodna hodnota, nie ta, ktoru som vybral
    //     //asi by som mal ukladat iba selected values do konkretnej hodnoty v db, nie vsetky hodnoty
    //     question1: volunteerData.value.beforeProject.healthQuiz.part1.question1, 
    //     question2: selected1.value,
    //     question3: selected2.value,
    //     question4: selected3.value,
    //   },
    // };
    // volunteerData.value.beforeProject.healthQuiz = quiz;
    volunteerData.value.beforeProject.healthQuiz.part1.question2 = selected1.value;
    volunteerData.value.beforeProject.healthQuiz.part1.question3 = selected2.value;
    volunteerData.value.beforeProject.healthQuiz.part1.question4 = selected3.value; 


    sendData(volunteerData.value);
}



onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    //selected1.value = volunteerData.value.beforeProject?.europeanUnion?.part3?.question1 || [];
    selected1.value = volunteerData.value.beforeProject?.healthQuiz?.part1?.question2 || [];
    selected2.value = volunteerData.value.beforeProject?.healthQuiz?.part1?.question3 || [];
    selected3.value = volunteerData.value.beforeProject?.healthQuiz?.part1?.question4 || [];
    // selected4.value = volunteerData.value.beforeProject?.healthQuiz?.part1?.question5 || [];
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
});

</script>
<template>
    <v-container v-if="!loading">
        <h1>PART 1 - OFFICIAL AND ADMINISTRATIVE PROCEDURES</h1>
        <br>
        <h2>OBJECTIVES AND INSTRUCTIONS</h2>
        <br>

        <questions-list :questions="firstQuestion" :path="path"  :volunteerData="volunteerData"/>
        <br>
        {{ questions.beforeProject.healthQuiz.part1.question2 }}

        <div v-for="(question, index) in part1Checkbox1Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected1"
            @change="sendSelectedOptions">
          </v-checkbox>
        </div>
        <br>
        {{ questions.beforeProject.healthQuiz.part1.question3 }}
        <div v-for="(question, index) in part1Checkbox2Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected2"
            @change="sendSelectedOptions">
          </v-checkbox>
        </div>
        <br>
        {{ questions.beforeProject.healthQuiz.part1.question4 }}
        <div v-for="(question, index) in part1Checkbox3Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected3"
            @change="sendSelectedOptions">
          </v-checkbox>
        </div>
        
        <br>
        <!-- <v-btn class="my-button" color="primary" @click="sendSelectedOptions">Update options</v-btn> -->
        <br>
        <router-link :to="{
                name: 'HealthPage2' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to part 2 </v-btn>
        </router-link>
    </v-container>
</template>
<style>
.v-selection-control__input input{
  opacity: 1;
  color: red;
  height: 20px;
  margin-top: 9px;
}
.v-checkbox .v-selection-control {
  min-height: 30px;
}

</style>