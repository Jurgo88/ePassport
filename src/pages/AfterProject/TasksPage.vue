<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import { checkboxesQuestions } from '../../../services/checkboxesQuestions';
import  QuestionsList  from '../../components/QuestionsList.vue';
import sendData from '../../../services/sendData.js';
import RatingBox from '../../components/RatingBox.vue';
import AnswerBox from '../../components/AnswerBox.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "afterProject.tasks";
const loading = ref(false);

const question1value = ref(0);
const question3value = ref(0);
const question5value = ref(0);
const question6value = ref(0);
const question7value = ref(0);
const question12value = ref(0);
const question14value = ref(0);
const question16value = ref(0);
const question17value = ref(0);

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
const secondQuestion = { question2: thisFormQuestions.question2 };
const fourthQuestion = { question4: thisFormQuestions.question4 };
const midlleQuestion = { 
    question8: thisFormQuestions.question8,
    question9: thisFormQuestions.question9,
    question10: thisFormQuestions.question10,
    question11: thisFormQuestions.question11, 
};
const therteenthQuestion = { question13: thisFormQuestions.question13 };
const fifteenthQuestion = { question15: thisFormQuestions.question15 };
const lastQuestion = { 
    question18: thisFormQuestions.question18,
    question19: thisFormQuestions.question19,
    question20: thisFormQuestions.question20,
    question21: thisFormQuestions.question21,
 };



onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    question1value.value = volunteerData.value.afterProject?.tasks?.question1 || 0;
    question3value.value = volunteerData.value.afterProject?.tasks?.question3 || 0;
    question5value.value = volunteerData.value.afterProject?.tasks?.question5 || 0;
    question6value.value = volunteerData.value.afterProject?.tasks?.question6 || 0;
    question7value.value = volunteerData.value.afterProject?.tasks?.question7 || 0;
    question12value.value = volunteerData.value.afterProject?.tasks?.question12 || 0;
    question14value.value = volunteerData.value.afterProject?.tasks?.question14 || 0;
    question16value.value = volunteerData.value.afterProject?.tasks?.question16 || 0;
    question17value.value = volunteerData.value.afterProject?.tasks?.question17 || 0;


    loading.value = false;
  } catch (error) {
    console.error(error);
  }
});


</script>
<template>
    <v-container v-if="!loading">
        <h1>Tasks and Activities</h1>
        <br>
        <b>Rating:</b>
        <ol>
            <li>1. not at all satisfied</li>
            <li>2. slightly satisfied</li>
            <li>3. neutral</li>
            <li>4. very satisfied</li>
            <li>5. extremely satisfied</li>
        </ol>
        <br>
        {{ thisFormQuestions.question1 }}
        <RatingBox :initialRating="question1value" :volunteerData="volunteerData" :path="path" questionData="question1" />
        <br>
        <QuestionsList :questions="secondQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        {{ thisFormQuestions.question3 }}
        <RatingBox :initialRating="question3value" :volunteerData="volunteerData" :path="path" questionData="question3" />
        <br>
        <QuestionsList :questions="fourthQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        {{ thisFormQuestions.question5 }}
        <RatingBox :initialRating="question5value" :volunteerData="volunteerData" :path="path" questionData="question5" />
        <br>
        {{ thisFormQuestions.question6 }}
        <RatingBox :initialRating="question6value" :volunteerData="volunteerData" :path="path" questionData="question6" />
        <br>
        {{ thisFormQuestions.question7 }}
        <RatingBox :initialRating="question7value" :volunteerData="volunteerData" :path="path" questionData="question7" />
        <br>
        <QuestionsList :questions="midlleQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        {{ thisFormQuestions.question12 }}
        <RatingBox :initialRating="question12value" :volunteerData="volunteerData" :path="path" questionData="question12" />
        <br>
        <QuestionsList :questions="therteenthQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        {{ thisFormQuestions.question14 }}
        <RatingBox :initialRating="question14value" :volunteerData="volunteerData" :path="path" questionData="question14" />
        <br>
        <QuestionsList :questions="fifteenthQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        {{ thisFormQuestions.question16 }}
        <RatingBox :initialRating="question16value" :volunteerData="volunteerData" :path="path" questionData="question16" />
        <br>
        {{ thisFormQuestions.question17 }}
        <RatingBox :initialRating="question17value" :volunteerData="volunteerData" :path="path" questionData="question17" />
        <br>
        <QuestionsList :questions="lastQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        <router-link to="/after-project/support">Next</router-link>

        <router-link :to="{
                name: 'CompetencesPage' 
            }" >
            <v-btn block color="primary" class="my-button">Learning and competences</v-btn>
        </router-link>

    </v-container>
</template>