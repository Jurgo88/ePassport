<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';
import AnswerBox from '../AnswerBox.vue';
import sendData from '/services/sendData.js';

const emit = defineEmits(['isShowingWrittingTest']);
const isShowingWrittingTest = ref(props.isShowingWrittingTest);

// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  isShowingWrittingTest: {
    type: Boolean,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
});

const volunteerData = ref(props.volunteerData);
const path = "beforeProject.englishTest.writting";

// Initialize the answers with values from the model, if available
const answers = ref({
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: '',
  question6: '',
});

// Check if the model has the necessary properties before assigning values to answers
// if (props.volunteerData.beforeProject?.englishTest?.writting) {
//     console.log('Kokotko');
//   const writting = props.volunteerData.beforeProject.englishTest.writting;
//   answers.value = {
//     question1: writting.question1 || '',
//     question2: writting.question2 || '',
//     question3: writting.question3 || '',
//     question4: writting.question4 || '',
//     question5: writting.question5 || '',
//     question6: writting.question6 || '',
//   };
// }
// else {
//     console.log('Kokotko2');
//      volunteerData.beforeProject.englishTest.writting = {
//        question1: '',
//        question2: '',
//        question3: '',
//        question4: '',
//        question5: '',
//        question6: '',};
//      console.log(volunteerData.beforeProject.englishTest.writting);
// }

// methods
function handleButtonClick() {
  console.log('handleButtonClick');
  isShowingWrittingTest.value = false;
  emit('isShowingWrittingTest', isShowingWrittingTest.value);
  console.log('isShowingWrittingTest.value : ' + isShowingWrittingTest.value);
}

function handleAnswer(question, value) {
//   console.log(`Odchytená hodnota emitovanej udalosti handleAnswer ${value}`);
//   answers.value[question] = value;
//   console.log(`answers.value.${question}: ${answers.value[question]}`);

//   // Create the path to the specific question
//   const questionPath = `${path}.${question}`;

//   // Update the corresponding answer in volunteerData
//   volunteerData.value = {
//     ...volunteerData.value,
//     [questionPath]: value,
//   };

//   sendData(volunteerData.value);
}


onBeforeMount(() => {
  console.log('ListeningTest.vue mounted');
  if(!volunteerData.value.beforeProject.englishTest.writting)
    {
        volunteerData.value.beforeProject.englishTest.writting = {
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        };
    }
});


</script>

<template>
    <p class="subheading">
        WRITTEN COMPREHENSION
    </p>
    <p>
        Read the testimony of a participant who volunteered as part of the EU Aid Volunteers programme on the ADICE website: 
        <a href="http://adice.asso.fr/en/news/testimonials/jac-eu-aid-volunteer-in-nepal/" target="_blank">http://adice.asso.fr/en/news/testimonials/jac-eu-aid-volunteer-in-nepal/</a>
        

        <br>
        <br>
        Listen to the 3 scenarios and answer the questions.
    </p>
    <br>
    <b>Scenario 1:</b>
    <br>
    <br>
    <p>
        Where did Jac volunteer and when did he start?
    </p>
    <br>
    <AnswerBox
    :volunteerData="volunteerData"
    :answer="answers.question1"
    @answer="value => handleAnswer('question1', value)"
  >
  </AnswerBox>
    <br>
    <!-- <p>
        What the fuck?
    </p>
    <br>
    <AnswerBox
    :volunteerData="volunteerData"
    :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario1.question2"
    @answer="value => handleAnswer('Scenario1', 'question2', value)"
  >
  </AnswerBox>
    <br>
    <p>
        Why is the person lost?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario1.question3"
        @answer="value => handleAnswer('Scenario1', 'question3', value)">
    </AnswerBox>
    <br>

    <br>
    <b>Scenario 2:</b>
    <br>
    <br>
    <p>
        Where does Carla work?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario2.question1"
        @answer="value => handleAnswer('Scenario2', 'question1', value)">
    </AnswerBox>
    <br>
    <p>
        Why does she enjoy her work?
    </p>
    <br>
    <AnswerBox 
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario2.question2"
        @answer="value => handleAnswer('Scenario2', 'question2', value)">
    </AnswerBox>
    <br>
    <p>
        What does she do in the design department?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario2.question3"
        @answer="value => handleAnswer('Scenario2', 'question3', value)">
    </AnswerBox>
    <br>
    <p>
        Which countries are Pierre and Carla from?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario2.question4"
        @answer="value => handleAnswer('Scenario2', 'question4', value)">
    </AnswerBox>
    <br>
    <p>
        How many months will Pierre be working within the association?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario2.question5"
        @answer="value => handleAnswer('Scenario2', 'question5', value)">
    </AnswerBox>
    <br>
    <b>Scenario 3:</b>
    <br>
    <br>
    <p>
        Where is the director’s office?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario3.question1"
        @answer="value => handleAnswer('Scenario3', 'question1', value)">
    </AnswerBox>
    <br>
    <p>
        How often does the general meeting take place?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario3.question2"
        @answer="value => handleAnswer('Scenario3', 'question2', value)">
    </AnswerBox>
    <br>
    <p>
        How long does it last?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario3.question3"
        @answer="value => handleAnswer('Scenario3', 'question3', value)">
    </AnswerBox>
    <br>
    <p>
        When do the activities start?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario3.question4"
        @answer="value => handleAnswer('Scenario3', 'question4', value)">
    </AnswerBox>
    <br>
    <p>
        How long is the lunch break?
    </p>
    <br>
    <AnswerBox
        :volunteerData="volunteerData"
        :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario3.question5"
        @answer="value => handleAnswer('Scenario3', 'question5', value)">
    </AnswerBox> -->
    <br>
    


    
    <v-btn
            color="primary"
            @click="handleButtonClick()"
            >
            Go back
        </v-btn>
</template>