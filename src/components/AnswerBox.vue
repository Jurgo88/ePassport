<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
// import { updateRecord } from '/services/database.js';
// import  sendData  from '/services/sendData.js';
// import { getAuth } from 'firebase/auth';


const store = useStore();

// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: false,
  },
  userState: {
    type: Object,
    required: false,
  },
  answer: {
    type: String,
    required: true,
  },
  question : {
    type: String,
    required: false,
  },
});

// emits
const emit = defineEmits(['answer, question']);


const volunteerData = ref(props.volunteerData);
const answer = ref(props.answer);
const buttonColor = ref('red');
const question = ref(props.question);

const answerData = ref({
  question: '',
  answer: '',
});


if(answer.value == ''){
  buttonColor.value = 'red';
}
else{
  buttonColor.value = 'green';
}



const handleButtonClick = () => {
    console.log('handleButtonClick : ' + answer.value);
    answerData.value.question = question.value;
  answerData.value.answer = answer.value;
  emit('answer', answerData.value);
    // emit('question', question.value);
    // emit('answer', answer.value);

    if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }
    
    return answer.value;

   
};

const handleAnswerChange = () => {
    console.log('handleAnswerChange : ' + answer.value);

if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }
};


onMounted(() => {
    if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }
});

</script>

<template>
   
    <div style="height: 125px;">
        <v-textarea class="textarea" rows="3" v-model="answer"  label="Your answer..." outlined></v-textarea>
        <v-btn icon @click="handleButtonClick()"  :color="buttonColor" class="myButton" style="margin: 0;">
            <i class="material-icons">add_circle_outline</i>
        </v-btn>
    </div>
       

  
</template>

<style >
    .textarea {
        width: 80%;
        float: left;
    }  
    .myButton {
        float: right;
        margin-top: 20px;
        margin-right: 20px;
        display: none;
    }
</style>