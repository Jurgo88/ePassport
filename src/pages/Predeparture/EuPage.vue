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
    <v-container>
        <h1>European Union, Citizenship and Eco-responsibility</h1>
        <br>
        <h2>OBJECTIVES AND INSTRUCTIONS</h2>
        <br>
        <b>The objectives of this sheet are to:</b><br>
        <ul>
            <li>Help you understand the role of the European Union and its principles.</li>
            <li>Understand the status of "European citizen" through your research and your own knowledge.</li>
            <li>Select the most useful and relevant information on what is being implemented by the host country in terms of sustainable development. It is not a matter of copying and pasting information found on the Internet but of reviewing different sources and selecting the most relevant ones.</li>
        </ul>
        <br>
        <b>Terms and Conditions are to:</b><br>
        <ul>
            <li>Use your knowledge, your practices to answer to this question</li>
            <li>Some answers can be find on the European Union website: <a  href="http://europa.eu/index_fr.htm" >europa.eu/index_fr.htm</a></li>
        </ul>
        <br>
        <router-link :to="{
                name: 'EuPage1' 
            }" >
            <v-btn block color="primary" class="my-button">PART 1: SOME GENERAL INFORMATION ABOUT THE EUROPEAN UNION</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuPage2' 
            }" >
            <v-btn block color="primary" class="my-button">PART 2: CITIZENSHIP IN EUROPE</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuPage3' 
            }" >
            <v-btn block color="primary" class="my-button">PART 3: SUSTAINABLE DEVELOPMENT AND ECO-RESPONSIBILITY</v-btn>
        </router-link>
        <br>
        <hr>
        <br>
        <router-link
            :to="{
                name: 'PredeparturePage',
            }"
        >
            <v-btn color="secondary" class="my-button">Back</v-btn>
        </router-link>

    </v-container>
</template>