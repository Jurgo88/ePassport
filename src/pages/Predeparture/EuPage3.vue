<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';
import { questions } from '../../../services/questions';
import { checkboxesQuestions } from '../../../services/checkboxesQuestions';
import  QuestionsList  from '../../components/QuestionsList.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); 
const path = "beforeProject.europeanUnion.part3";
const loading = ref(false);
const showQuestions = ref(false);

const selected1 = ref([]);
const selected2 = ref([]);
const selected3 = ref([]);
const selected4 = ref([]);
const selected5 = ref([]);

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
const ecoResposibilityFirstQuestion = { question5: questions.beforeProject.europeanUnion.part3.question5};
const ecoResposibilitySecondQuestion = { question6: questions.beforeProject.europeanUnion.part3.question6, 
  question7: questions.beforeProject.europeanUnion.part3.question7, 
  question8: questions.beforeProject.europeanUnion.part3.question8,
};
const ecoResposibilityThirdQuestion = {
  question10: questions.beforeProject.europeanUnion.part3.question10, 
  question11: questions.beforeProject.europeanUnion.part3.question11,
};

const part3Checkbox1Values = checkboxesQuestions.beforeProject.europeanUnion.part3.checkbox1;
const part3Checkbox2Values = checkboxesQuestions.beforeProject.europeanUnion.part3.checkbox2;
const part3Checkbox3Values = checkboxesQuestions.beforeProject.europeanUnion.part3.checkbox3;
const part3Checkbox4Values = checkboxesQuestions.beforeProject.europeanUnion.part3.checkbox4;
const part3Checkbox5Values = checkboxesQuestions.beforeProject.europeanUnion.part3.checkbox5;


function handleShowQuestions() {
    showQuestions.value = true;
    console.log('showQuestions.value : ' + showQuestions.value);
}

function updateSelectedQuestions(selected , checkboxes) {
  //selected.value = checkboxes.filter((question) => selected.value.includes(question));
  console.log('selected: ' + selected.value);
}


onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    //selected1.value = volunteerData.value.beforeProject?.europeanUnion?.part3?.question1 || [];
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
        <h1>PART 3: SUSTAINABLE DEVELOPMENT AND ECO-RESPONSIBILITY</h1>
        <br>
        <p>
          Sustainable development is "development that meets the needs of the present without compromising the ability of future generations to meet their own needs", quote from Mrs. Gro Harlem Brundtland, Norwegian Prime Minister (1987).
          <br><br>
          Sustainable development and eco-responsibility are subjects to be taken into account during an international mobility in order to have a responsible behavior that does not harm the planet and others.
        </p>
        <br>
        <h2>1. Small quiz on Europe and sustainable development:</h2><br>
        <br>
        {{  questions.beforeProject.europeanUnion.part3.question1  }}

        <div v-for="(question, index) in part3Checkbox1Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected1"
            @change="updateSelectedQuestions(selected1)">
          </v-checkbox>
        </div> 

        {{ selected1 }}

        <br>
        <br>

        {{ questions.beforeProject.europeanUnion.part3.question2  }}

        <div v-for="(question, index) in part3Checkbox2Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected2"
            @change="updateSelectedQuestions(selected2, part3Checkbox2Values)">
          </v-checkbox>
        </div>
          
          {{ selected2 }}

        <br>
        <br>

        {{ questions.beforeProject.europeanUnion.part3.question3  }}  

        <div v-for="(question, index) in part3Checkbox3Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected3"
            @change="updateSelectedQuestions(selected3)">
          </v-checkbox>
        </div>
          
          {{ selected3 }}

        <br>
        <br>

        {{ questions.beforeProject.europeanUnion.part3.question4  }}

        <div v-for="(question, index) in part3Checkbox4Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected4"
            @change="updateSelectedQuestions(selected4)">
          </v-checkbox>
        </div>
          
          {{ selected4 }}

        <br>
        <br>

        <h2>2. Eco-responsibility:</h2>
        <br>
        <b>In everyday life</b>
        <br>
        <br>
        <br>
        <questions-list :questions="ecoResposibilityFirstQuestion" :path="path" :volunteerData="volunteerData" />
        <br>
        <b>During your mobility:</b><br>
        <br>
        <questions-list :questions="ecoResposibilitySecondQuestion" :path="path" :volunteerData="volunteerData" />
        <hr>
        <br>
        {{ questions.beforeProject.europeanUnion.part3.question9 }}<br>
        <br>
        <div v-for="(question, index) in part3Checkbox5Values" :key="index">       
          <v-checkbox  light
          class="shrink mr-1" hide-details="true"
            :label="question"
            :value="question"
            v-model="selected5"
            @change="updateSelectedQuestions(selected5)">
          </v-checkbox>
        </div>
            
            {{ selected5 }}

        <br>
        <br>
        <questions-list :questions="ecoResposibilityThirdQuestion" :path="path" :volunteerData="volunteerData" />



        <router-link :to="{
                name: 'EuPage1' 
            }" >
            <v-btn block color="primary" class="my-button">PART 1: SOME GENERAL INFORMATION ABOUT THE EUROPEAN UNION</v-btn>
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