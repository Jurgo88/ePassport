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
const path = "beforeProject.healthQuiz.part6";
const loading = ref(false);
const volunteerName = ref('');
const hostOrganisationName = ref('');
const thisFormatedQuestions = ref({});

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
console.log('Volunteer name: ' + volunteerName.value);

function formatQuestion () {
    const question2 = thisFormQuestions.question2;
    const formattedQuestion = question2.replace('[name]', volunteerName.value).replace('[hoName]', hostOrganisationName.value);
    const formattedQuestions = {
        ...thisFormQuestions,
        question2: formattedQuestion,
    };
  return formattedQuestions;
};




onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    volunteerName.value = volunteerData.value.basicInfo?.volunteerInfo?.name || '';
    hostOrganisationName.value = volunteerData.value.basicInfo?.hoInfo?.hoName || '';
    thisFormatedQuestions.value = formatQuestion();
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = true;
  }
});

</script>
<template>
    <v-container v-if="!loading">
        <h1>PART 6 – VOCABULARY</h1>
        <br>
        <h2>English</h2>
        <br>
        <QuestionsList
            :questions="thisFormatedQuestions"
            :volunteerData="volunteerData"
            :path="path"
        />
        

        <br>

        <br>
        <hr>
        <br>
        <router-link
            :to="{
                name: 'HealthPage',
            }"
        >
            <v-btn color="secondary" class="my-button">Back</v-btn>
        </router-link>
    </v-container>
</template>