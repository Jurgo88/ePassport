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
const path = "afterProject.support";
const loading = ref(false);

const question1value = ref(0);
const question2value = ref(0);
const question3value = ref(0);
const question5value = ref(0);
const question7value = ref(0);
const question9value = ref(0);
const question11value = ref(0);




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

const fourtQuestion = { question4: thisFormQuestions.question4 };
const sixthQuestion = { question6: thisFormQuestions.question6 };
const eighthQuestion = { question8: thisFormQuestions.question8 };
const tenthQuestion = { question10: thisFormQuestions.question10 };
const twelfthQuestion = { question12: thisFormQuestions.question12 };
const lastQuestion = { question14: thisFormQuestions.question14, question15: thisFormQuestions.question15 };

function emitRating(value) {
    console.log('currentValue.value', value);
    // volunteerData.value.afterProject.support.question1 = currentValue.value;
    // console.log('volunteerData.value', volunteerData.value);
    // sendData(volunteerData.value);
}

onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    question1value.value = volunteerData.value.afterProject?.support?.question1 || 0;
    question2value.value = volunteerData.value.afterProject?.support?.question2 || 0;
    question3value.value = volunteerData.value.afterProject?.support?.question3 || 0;
    question5value.value = volunteerData.value.afterProject?.support?.question5 || 0;
    question7value.value = volunteerData.value.afterProject?.support?.question7 || 0;
    question9value.value = volunteerData.value.afterProject?.support?.question9 || 0;
    question11value.value = volunteerData.value.afterProject?.support?.question11 || 0;


    loading.value = false;
  } catch (error) {
    console.error(error);
  }
});


</script>
<template>
    <v-container v-if="!loading">
        <h1>Guidance and support</h1>
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
        <h3>I received all the information I needed before the beginning of my project:</h3>
        {{ thisFormQuestions.question1}}

        <RatingBox :initialRating="question1value" :volunteerData="volunteerData" :path="path" questionData="question1" @update="emitRating()" />
        <br>
        {{ thisFormQuestions.question2}}
        <RatingBox  :initialRating="question2value" :volunteerData="volunteerData" :path="path" questionData="question2" />
        <br>
        {{ thisFormQuestions.question3}}
        <RatingBox :initialRating="question3value" :volunteerData="volunteerData" :path="path" questionData="question3" />
        <br>
        <QuestionsList :questions="fourtQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question5}}
        <RatingBox :initialRating="question5value" :volunteerData="volunteerData" :path="path" questionData="question5" />
        <br>
        <QuestionsList :questions="sixthQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question7}}
        <RatingBox :initialRating="question7value" :volunteerData="volunteerData" :path="path" questionData="question7" />
        <br>
        <QuestionsList :questions="eighthQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question9}}
        <RatingBox :initialRating="question9value" :volunteerData="volunteerData" :path="path" questionData="question9" />
        <br>
        <QuestionsList :questions="tenthQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question11}}
        <RatingBox :initialRating="question11value" :volunteerData="volunteerData" :path="path" questionData="question11" />
        <br>
        <QuestionsList :questions="twelfthQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        {{ thisFormQuestions.question13}}
        <RatingBox :initialRating="question13value" :volunteerData="volunteerData" :path="path" questionData="question13" />
        <br>
        <QuestionsList :questions="lastQuestion" :volunteerData="volunteerData" :path="path" />
        <br>
        <router-link :to="{
                name: 'TasksPage' 
            }" >
            <v-btn block color="primary" class="my-button">Tasks and Activities</v-btn>
        </router-link>
        




    </v-container>
</template>
<style scoped>
.rating {
  display: flex;
}

label {
  cursor: pointer;
  margin-right: 5px;
}

.active {
  color: orange;
}
</style>