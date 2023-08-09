<script setup>
import { defineProps, ref, onBeforeMount } from 'vue';
import AnswerBox from '../AnswerBox.vue';
import sendData  from '/services/sendData.js';


const props = defineProps({
    questions: {
        type: Object,
        required: true,
    },
    volunteerData: {
        type: Object,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    multiAnswers: {
        type: Object,
        required: true,
    },
    multiAnswerFields: {
        type: Number,
        required: true,
    },
});

const volunteerData = ref(props.volunteerData);
const answer = ref('');
const answer1 = ref('');
const answer2 = ref('');
const answer3 = ref('');
const buttonColor = ref('red');
const question = ref(props.question);
const path = ref(props.path);
const loading = ref(true);
    let currentObject = volunteerData.value; // Začiatočný objekt je volunteerData.value

const questionKeys = Object.keys(props.questions);
const multiQuestions = [];

for (let i = 0; i < questionKeys.length; i++) {
  const key = questionKeys[i];
  const questionNumber = i + 1; // Ocislovanie zacina od 1, nie od 0
  multiQuestions[`question${questionNumber}`] = {
    answer1: ref(''),
    answer2: ref(''),
    answer3: ref('')
  };
  //multiQuestions.push(answerObj);
}


console.log(props.multiAnswers);
console.log(props.multiAnswerFields);
console.log(props.questions);
console.log(props.volunteerData);
console.log(props.path);

console.log(multiQuestions);

if(answer.value == ''){
  buttonColor.value = 'red';
}
else{
  buttonColor.value = 'green';
}

const getValueByPath = (obj, path) => {
  loading.value = true;
  const pathArray = path.split('.');
  let value = obj;

  for (const key of pathArray) {
    console.log(`Key: ${key}, Value: ${value}`);
    value = value[key];
    if (value === undefined) {
      return undefined;
    }
  }
  loading.value = false;
  console.log("pozrime sa co tu mame na getValueByPath " + value);
  return value;
};

const questionData = ref(getValueByPath(volunteerData.value, path.value));

const handleButtonClick = (index) => {
    console.log('indexk : ' + index);
    console.log('Answer : ' + multiQuestions[index].answer1.value);

    
    const pathParts = props.path.split('.'); // Rozdelenie reťazca na časti podľa bodiek

    for (const part of pathParts) {
      currentObject = currentObject[part]; // Prístup k vnoreným objektom
    }

    currentObject[index].answer1 = multiQuestions[index].answer1.value; // Priradenie hodnoty
    currentObject[index].answer2 = multiQuestions[index].answer2.value; // Priradenie hodnoty
    currentObject[index].answer3 = multiQuestions[index].answer3.value; // Priradenie hodnoty

    sendData(volunteerData.value);

}

onBeforeMount(() => {

    for (let i = 0; i < questionKeys.length; i++) {
        const questionNumber = i + 1; // Ocislovanie zacina od 1, nie od 0
        console.log(questionNumber)
        const question = `question${questionNumber}`;
        console.log(question);
        multiQuestions[question].answer1.value = volunteerData.value.beforeProject.project.expectations[question].answer1;
        multiQuestions[question].answer2.value = volunteerData.value.beforeProject.project.expectations[question].answer2;
        multiQuestions[question].answer3.value = volunteerData.value.beforeProject.project.expectations[question].answer3;
    }
    
});


</script>
<template>
    <div>
        <div v-for="(question, index) in props.questions" :key="index" style="height: auto; float: left; width: 100%;">
            <div>{{ question }}</div>
            <br>
            <div>
                <v-textarea class="textarea" rows="3" v-model="multiQuestions[index].answer1.value"  :label="props.multiAnswers.answer1" outlined></v-textarea>
                <v-btn icon @click="handleButtonClick(index)"  :color="buttonColor" class="myButton" style="margin: 0;">
                    <i class="material-icons">add_circle_outline</i>
                </v-btn>
            </div>
            <br>
            <v-textarea class="textarea" rows="3" v-model="multiQuestions[index].answer2.value"  :label="props.multiAnswers.answer2" outlined></v-textarea>
            <v-textarea class="textarea" rows="3" v-model="multiQuestions[index].answer3.value"  :label="props.multiAnswers.answer3" outlined></v-textarea>
        </div>



    </div>
</template>
<style>
.v-text-field__label {
    white-space: pre-line;
    word-wrap: break-word;
}
</style>