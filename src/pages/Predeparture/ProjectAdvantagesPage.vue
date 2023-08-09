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
const path = "beforeProject.project.advantages";
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
        <h1>Advantages, strengths, fears & challenges</h1>
        <br>
        <h2>INSTRUCTIONS AND PRACTICAL MATTERS</h2>
        <ul>
            <li>Please complete the table below with accurately information and set realistic objectives</li>
            <li>Start before the beginning of your experience and continue all along with your project</li>
        </ul>
        <QuestionsList :questions="thisFormQuestions" :volunteerData="volunteerData" :path="path" />
        <hr>
        <br>

        <router-link
            :to="{
                name: 'ProjectExpectationsPage'
                } ">
            <v-btn color="primary" class="my-button">Next</v-btn>
        </router-link>
 
        </v-container>
</template>