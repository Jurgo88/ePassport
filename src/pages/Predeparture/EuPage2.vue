<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import { checkboxesQuestions } from '../../../services/checkboxesQuestions';
import  QuestionsList  from '../../components/QuestionsList.vue';
import sendData from '../../../services/sendData.js';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.europeanUnion.part2";
const loading = ref(false);
const showQuestions = ref(false);

const selected = ref([])

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
const firstQuestion = { question1: thisFormQuestions.question1 };
console.log('firstQuestion: ' + firstQuestion);

const part2Checkbox1Values = checkboxesQuestions.beforeProject.europeanUnion.part2.checkbox1;
console.log('part2Checkbox1Values: ' + part2Checkbox1Values);

function handleShowQuestions() {
    showQuestions.value = true;
    console.log('showQuestions.value : ' + showQuestions.value);
}

function showSelectedOptions() {
  console.log('selectedOptions: ' + this.selectedOptions);
}

function updateSelectedQuestions() {
  selected.value = part2Checkbox1Values.filter((question) => selected.value.includes(question));
  console.log('selected: ' + selected.value);
}

function sendSelectedOptions() {
  console.log('selectedOptions: ' + selected.value);
  volunteerData.value.beforeProject.europeanUnion.part2.question2 = selected.value;
  console.log('volunteerData.value.beforeProject.europeanUnion.part2.question2: ' + volunteerData.value.beforeProject.europeanUnion.part2.question2);
  sendData(volunteerData.value);
}





onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    selected.value = volunteerData.value.beforeProject?.europeanUnion?.part2?.question2 || [];
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
        <h1>PART 2: CITIZENSHIP IN EUROPE</h1>
        <br>
        <QuestionsList :questions="firstQuestion" :volunteerData="volunteerData" :path="path" />        
        <br>
        <hr>
        <br>

        
        <!-- <div v-for="()"></div> -->

        {{ questions.beforeProject.europeanUnion.part2.question2  }} 
        <br><br>
      <div v-for="(question, index) in part2Checkbox1Values" :key="index">
       
        <v-checkbox  light
        class="shrink mr-1" hide-details="true"
          :label="question"
          :value="question"
          v-model="selected"
          @change="updateSelectedQuestions">
        </v-checkbox>
      </div>
      <v-btn class="my-button" color="primary" @click="sendSelectedOptions">Update options</v-btn>
       
        
        <!-- <p>{{ selected }}</p> -->
        <br>
        <br>
        <hr>
        <br>
        <br>
    
        <router-link :to="{
                name: 'EuPage3' 
            }" >
            <v-btn block color="primary" class="my-button">Continue to part 3</v-btn>
        </router-link>
    </v-container>
</template>

<style>
.v-selection-control__input input{
  opacity: 1;
  color: red;
  height: 20px;
  margin-top: 9px;
}
.v-checkbox .v-selection-control {
  min-height: 30px;
}

</style>