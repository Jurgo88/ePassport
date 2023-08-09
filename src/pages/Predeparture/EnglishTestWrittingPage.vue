<script setup>
import { ref, onBeforeMount, computed, onMounted } from 'vue';
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
const path = "beforeProject.englishTest.writting";
const loading = ref(true);


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
    question1: thisFormQuestions.question1,
    question2: thisFormQuestions.question2,
}
const secondQuestions = {
    question5: thisFormQuestions.question5,
    question6: thisFormQuestions.question6,
}

const writtenCheckbox1Values = checkboxesQuestions.beforeProject.englishTest.writting.checkbox1;
 const writtenCheckbox2Values = checkboxesQuestions.beforeProject.englishTest.writting.checkbox2;

function sendSelectedOptions() {
    volunteerData.value.beforeProject.englishTest.writting.question3 = selected1.value;
    volunteerData.value.beforeProject.englishTest.writting.question4 = selected2.value;
    sendData(volunteerData.value);
}

const selected1 = ref([]);
const selected2 = ref([]);


onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    //Neviem ci toto je dobre, ale musim to spravit pre kazdy checkbox, inak mi nenacita hodnoty z DB
    
    selected1.value = volunteerData.value.beforeProject.englishTest.writting.question3;
    selected2.value = volunteerData.value.beforeProject.englishTest.writting.question4;
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }

});




</script>
<template>
    <v-container v-if="!loading">
        <h1>Written COMPREHENSION</h1>
        <br>
        <p>
            Read the testimony of a participant who volunteered as part of the EU Aid Volunteers programme on the ADICE website: 
            <br>
            <br>
            <a href="http://adice.asso.fr/en/news/testimonials/jac-eu-aid-volunteer-in-nepal/" target="_blank">http://adice.asso.fr/en/news/testimonials/jac-eu-aid-volunteer-in-nepal/</a>
            <br>
            <br>
            <b>Answer the following questions:</b>
            <br>
            <br>
        </p>
        <QuestionsList :questions="firstQuestions" :volunteerData="volunteerData" :path="path" />
        <br>
        <br>
        {{ thisFormQuestions.question3 }}
        <div v-for="(question, index) in writtenCheckbox1Values" :key="index">
            <v-checkbox
                v-model="selected1"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        <br>
        {{ thisFormQuestions.question4 }}
        <div v-for="(question, index) in writtenCheckbox2Values" :key="index">
            <v-checkbox
                v-model="selected2"
                :label="question"
                :value="question"
                @change="sendSelectedOptions"
            ></v-checkbox>
        </div>
        <br>
        <br>
        <QuestionsList :questions="secondQuestions" :volunteerData="volunteerData" :path="path" />
    
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>