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
const path = "beforeProject.europeanUnion.part1";
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
        <h1>PART 1: SOME GENERAL INFORMATION ABOUT THE EUROPEAN UNION</h1>
        <br>
        <QuestionsList :questions="thisFormQuestions" :volunteerData="volunteerData" :path="path" />
        <router-link :to="{
                name: 'EuPage2' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to Part 2</v-btn>
        </router-link>
    </v-container>
</template>