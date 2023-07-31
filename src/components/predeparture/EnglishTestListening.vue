<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import AnswerBox from '../AnswerBox.vue';
import sendData from '/services/sendData.js';

const emit = defineEmits(['isShowingListeningTest']);
const isShowingListeningTest = ref(props.isShowingListeningTest);

// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  isShowingListeningTest: {
    type: Boolean,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
});

const volunteerData = ref(props.volunteerData);
const path = "beforeProject.englishTest.listening";

const listeningAnswers = ref({
  Scenario1: {
    question1: '',
    question2: '',
    question3: '',
  },
  Scenario2: {
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  },
  Scenario3: {
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  },
});

// methods
function handleButtonClick() {
  console.log('handleButtonClick');
  isShowingListeningTest.value = false;
  emit('isShowingListeningTest', isShowingListeningTest.value);
  console.log('isShowingListeningTest.value : ' + isShowingListeningTest.value);
}

function handleAnswer(scenario, question, value) {
  console.log(`Odchytená hodnota emitovanej udalosti handleAnswer ${value.answer}`);
  listeningAnswers.value[scenario][question] = value.answer;
  console.log(`listeningAnswers.value.${scenario}.${question}: ${listeningAnswers.value[scenario][question]}`);

  // Create the path to the specific question
  const questionPath = `${path}.${scenario}.${question}`;

  // Update the corresponding answer in volunteerData
  volunteerData.value = {
    ...volunteerData.value,
    [questionPath]: value.answer,
  };

  sendData(volunteerData.value);
}

onMounted(() => {
  console.log('ListeningTest.vue mounted');
  if(!volunteerData.value.beforeProject.englishTest.listening.Scenario3){
    volunteerData.value.beforeProject.englishTest.listening.Scenario3 = {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
    };
  }
    if(!volunteerData.value.beforeProject.englishTest.listening.Scenario2){
        volunteerData.value.beforeProject.englishTest.listening.Scenario2 = {
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        };
    }
});
</script>

<template>
    <p class="subheading">
        LISTENING COMPREHENSION
    </p>
    <p>
        Copy the following link on your web browser: 
        <a href="https://www.youtube.com/watch?v=xpmflnvpo0A" target="_blank">https://www.youtube.com/watch?v=xpmflnvpo0A</a>
        <!-- <iframe width="auto" height="auto" src="https://www.youtube.com/embed/xpmflnvpo0A?start=0&end=60" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
 

        <br>
        <br>
        Listen to the 3 scenarios and answer the questions.
    </p>
    <br>
    <b>Scenario 1:</b>
    <br>
    <br>
    <p>
        What is the person looking for?
    </p>
    <br>
    <AnswerBox
    :volunteerData="volunteerData"
    :answer="props.volunteerData.beforeProject.englishTest.listening.Scenario1.question1"
    @answer="value => handleAnswer('Scenario1', 'question1', value)"
  >
  </AnswerBox>
    <br>
    <p>
        What?
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
    </AnswerBox>
    <br>
    


    
    <v-btn
            color="primary"
            @click="handleButtonClick()"
            >
            Go back
        </v-btn>
</template>