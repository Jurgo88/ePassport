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
const path = "beforeProject.healthQuiz.part2";
const loading = ref(false);


const selected1 = ref([]);
const selected2 = ref([]);
const selected3 = ref([]);
const selected4 = ref([]);


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
const lastQuestion = { question5: thisFormQuestions.question5 };

const part2Checkbox1Values = checkboxesQuestions.beforeProject.healthQuiz.part2.checkbox1;
const part2Checkbox2Values = checkboxesQuestions.beforeProject.healthQuiz.part2.checkbox2;
const part2Checkbox3Values = checkboxesQuestions.beforeProject.healthQuiz.part2.checkbox3;
const part2Checkbox4Values = checkboxesQuestions.beforeProject.healthQuiz.part2.checkbox4;



function sendSelectedOptions() {
    volunteerData.value.beforeProject.healthQuiz.part2.question1 = selected1.value;
    volunteerData.value.beforeProject.healthQuiz.part2.question2 = selected2.value;
    volunteerData.value.beforeProject.healthQuiz.part2.question3 = selected3.value;
    volunteerData.value.beforeProject.healthQuiz.part2.question4 = selected4.value;
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
    loading.value = false;
  }
});

</script>
<template>
    <v-container v-if="!loading">
        <h1>PART 2 - PERSONAL BEHAVIOUR</h1>
        <br>
        {{ thisFormQuestions.question1 }}
        <div v-for="(item, index) in part2Checkbox1Values" :key="index">
            <v-checkbox v-model="selected1" :label="item" :value="item" @change="sendSelectedOptions"></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question2 }}
        <div v-for="(item, index) in part2Checkbox2Values" :key="index">
            <v-checkbox v-model="selected2" :label="item" :value="item" @change="sendSelectedOptions"></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question3 }}
        <div v-for="(item, index) in part2Checkbox3Values" :key="index">
            <v-checkbox v-model="selected3" :label="item" :value="item" @change="sendSelectedOptions"></v-checkbox>
        </div>
        <br>
        {{ thisFormQuestions.question4 }}
        <div v-for="(item, index) in part2Checkbox4Values" :key="index">
            <v-checkbox v-model="selected4" :label="item" :value="item" @change="sendSelectedOptions"></v-checkbox>
        </div>
        <br>
        
        <QuestionsList :questions="lastQuestion"  :volunteerData="volunteerData" :path="path" />

        <router-link :to="{
                name: 'HealthPage3' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to PART 3</v-btn>            
        </router-link>
       
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>