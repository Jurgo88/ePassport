<script setup>
import { defineProps, ref, onBeforeMount } from 'vue';
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
const buttonColor = ref('red');
const loading = ref(true);

const questionKeys = Object.keys(props.questions);
const multiQuestions = [];



const buttonColors = {
    question1: 'red',
    question2: 'red',
    question3: 'red',
    question4: 'red',
    question5: 'red',
    question6: 'red',
  }


for (let i = 0; i < questionKeys.length; i++) {
  const key = questionKeys[i];
  const questionNumber = i + 1; // Ocislovanie zacina od 1, nie od 0
  multiQuestions[`question${questionNumber}`] = {
    answer1: ref(''),
    answer2: ref(''),
    answer3: ref('')
  };
}



const handleButtonClick = (index) => {
    console.log('indexk : ' + index);
    console.log('Answer : ' + multiQuestions[index].answer1.value);

    
    const pathParts = props.path.split('.'); // Rozdelenie reťazca na časti podľa bodiek
    
    let currentObject = volunteerData.value; // Začiatočný objekt je volunteerData.value

    for (const part of pathParts) {
      currentObject = currentObject[part]; // Prístup k vnoreným objektom
    }

    currentObject[index].answer1 = multiQuestions[index].answer1.value; // Priradenie hodnoty
    currentObject[index].answer2 = multiQuestions[index].answer2.value; // Priradenie hodnoty
    currentObject[index].answer3 = multiQuestions[index].answer3.value; // Priradenie hodnoty

    
    checkButtons(index);
    sendData(volunteerData.value);

}

function checkButtons(index) {
  console.log('checkButtons : ' + index);
  if(volunteerData.value.beforeProject.project.expectations[index].answer1 && volunteerData.value.beforeProject.project.expectations[index].answer2 && volunteerData.value.beforeProject.project.expectations[index].answer3){
    buttonColors[index] = 'green';
  }
  else{
    buttonColor.value = 'red';
  }
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
    checkButtons('question1');
    checkButtons('question2');
    checkButtons('question3');
    checkButtons('question4');
    checkButtons('question5');
    checkButtons('question6');

});


</script>
<template>
    <div>
        <div v-for="(question, index) in props.questions" :key="index" style="height: auto; float: left; width: 100%;">
            <div>{{ question }}</div>
            <br>
            <div>
                <v-textarea class="textarea" rows="3" v-model="multiQuestions[index].answer1.value"  :label="props.multiAnswers.answer1" outlined></v-textarea>
                <v-btn icon @click="handleButtonClick(index)"  :color="buttonColors[index]" class="myButton" style="margin: 0;">
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