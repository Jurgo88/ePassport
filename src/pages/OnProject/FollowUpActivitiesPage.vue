<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import  QuestionsList  from '../../components/QuestionsList.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerDataOnProject = ref({}); // Tu používame ref, pretože budeme meniť hodnotu.
const volunteerData = ref({}); 
const path = "onProject.followUp.activities";
const pathForQuestionsList = "followUp.activities";
const loading = ref(false);

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

const followUpActivitiesQuestions = getQuestionsByPath(questions, path); // Získanie hodnoty pod cestou z objektu questions
    console.log('Follow-up activities:', followUpActivitiesQuestions);


onBeforeMount(async () => {
  try {
    loading.value = true;
    //Toto je pre pripad, keby som chcel nacitat iba onProject data
    // const dataFromDatabase = await loadOnProjectDataByID(uid);
    // volunteerDataOnProject.value = dataFromDatabase; // Meníme hodnotu ref.
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
});

console.log('ActivitiesPage');
console.log('Questions: ' + questions );

console.log('Mame tieto data volunteerData  na Activities: ' + volunteerDataOnProject.value);

</script>
<template>
    <v-container v-if="!loading">
<!-- {{ followUpActivitiesQuestions.question1 }} -->
        <h1>Support during the activitiess</h1>
        <QuestionsList :questions="followUpActivitiesQuestions" :volunteerData="volunteerData" :path="path" />
        <br>
        <hr>
        <br>
        <br>
        <router-link :to="{
            name: 'FollowUpSupportPage',
            params: {
                data: volunteerData
            }
        }">
            <v-btn color="primary" class="my-button">Support during the activities</v-btn>
        </router-link>

    </v-container>
    
</template>