<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.country";
const loading = ref(false);
const showQuestions = ref(false);

console.log(path);


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

function handleShowQuestions() {
    showQuestions.value = true;
    console.log('showQuestions.value : ' + showQuestions.value);
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

console.log('CountryPage');
console.log('Questions: ' + questions );

</script>
<template>
    <v-container v-if="!loading">
    <div v-if="!showQuestions">
        <h1>Country</h1><br>
        <b>The objectives of this form </b><br><br>
        <ul>
            <li>It is intended to help you become familiar with the local context in addition to providing general information about the country. </li>
            <li>It asks you to conduct research that will help you understand the country’s particular reality (daily life of the inhabitants, sociology, administrative organisation, etc.). Instructions and Practical Matters</li>
            <li>Select the most useful and relevant information for participating the mobility project (this doesn’t mean just copying/pasting information found on the Internet) but going through different sources and select the most relevant for your project and your own knowledge.</li>
        </ul>

        <br><br><br>
        <b>How to fill in this sheet?</b><br> 
        Find information about the country in which your host organization is located. You can find this information on dedicated websites or by watching videos about the country's business and history. 
        <br><br>    
        <h2>Virtual Mobility</h2>
        <ul>
            <li>Even if you are going to do a completely virtual mobility, it will be important to know the country in which the host organization is. </li>
            <li>Indeed, to better understand the culture, the working habits, the inhabitants will be a real gain and an asset for all the activities you will be able to set up during your virtual mobility.</li>
        </ul>
        <br><br>
        <v-btn color="primary" class="my-button" @click="handleShowQuestions()">Click here to fill the sheet</v-btn>
    </div>
        <div v-if="showQuestions">
            <h1>Country sheet</h1>
            <QuestionsList :questions="thisFormQuestions" :volunteerData="volunteerData" :path="path" />
        </div>
    </v-container>
    
</template>