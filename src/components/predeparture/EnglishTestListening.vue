<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import  AnswerBox  from '../AnswerBox.vue';
import { useStore } from 'vuex';
import { updateRecord } from '/services/database.js';
import  sendData  from '/services/sendData.js';
import { getAuth } from 'firebase/auth';

const emit = defineEmits(['isShowingTest']);
const isShowingTest = ref(props.isShowingTest);

// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  isShowingTest: {
    type: Boolean,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
});

const volunteerData = ref(props.volunteerData);

const listeningAnswers = ref({
    Scenario1:{
        question1: '',
        question2: '',
        question3: '',
    },
    Scenario2:{
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
    },
    Scenario3:{
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
    isShowingTest.value = false;
    emit('isShowingTest', isShowingTest.value);
    console.log('isShowingTest.value : ' + isShowingTest.value);
}

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
    <AnswerBox :volunteerData="volunteerData" :answer="listeningAnswers.Scenario1.question1"></AnswerBox>
    
    <!-- <v-btn
            color="primary"
            @click="handleButtonClick()"
            >
            Go back
        </v-btn> -->
</template>