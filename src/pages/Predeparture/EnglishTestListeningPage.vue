<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.englishTest.listening";
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
const scenario1 = thisFormQuestions.Scenario1;
const scenario1Path = path + '.Scenario1';
const scenario2 = thisFormQuestions.Scenario2;
const scenario2Path = path + '.Scenario2';
const scenario3 = thisFormQuestions.Scenario3;
const scenario3Path = path + '.Scenario3';

console.log('scenario1', scenario1);


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
        <h1>LISTENING COMPREHENSION</h1>
        <br>
        <p>
            Copy the following link on your web browser: 
            <a href="https://www.youtube.com/watch?v=xpmflnvpo0A" target="_blank">https://www.youtube.com/watch?v=xpmflnvpo0A</a>
            <!-- <iframe width="auto" height="auto" src="https://www.youtube.com/embed/xpmflnvpo0A?start=0&end=60" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
    

            <br>
            <br>
            Listen to the 3 scenarios and answer the questions.
        </p>
        <br>
        <br>
        <b>Scenario 1 : </b>
        <br>
        <br>
        <QuestionsList :questions="scenario1" :volunteerData="volunteerData" :path="scenario1Path" />
        <br>
        <br>
        <b>Scenario 2 : </b>
        <br>
        <br>
        <QuestionsList :questions="scenario2" :volunteerData="volunteerData" :path="scenario2Path" />
        <br>
        <br>
        <b>Scenario 3 : </b>
        <br>
        <br>
        <QuestionsList :questions="scenario3" :volunteerData="volunteerData" :path="scenario3Path" />
        <br>
        <br>
        <hr>
        <br>
        <br>
        <router-link :to="{
                name: 'EnglishTestPage' 
            }" >
            <v-btn block color="secondary" class="my-button">BACK</v-btn>
        </router-link>

        
    </v-container>
</template>