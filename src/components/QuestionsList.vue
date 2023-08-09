<script setup>
import { ref, onMounted, defineProps, defineEmits, watchEffect } from 'vue';
import AnswerBox from './AnswerBox.vue';
import sendData  from '/services/sendData.js';

//props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  questions : {
    type: Array,
    required: true,
  },
  path : {
    type: String,
    required: true,
  }
});

console.log(props.questions)


const questions = ref(props.questions);

const volunteerData = ref(props.volunteerData);
const path = ref(props.path);

const loading = ref(true);


//tuto mam chybu, nacitava mi vsetky polia treba to opravit
const deepValue = (obj, path) => {
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      obj = obj[path[i]];
  };
  
  console.log("pozrime sa co tu mame na deepValue " + obj);
  return obj;
};
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
console.log("pozrime sa co tu mame na questionData " + questionData.value);



const handleAnswer = (answer) => {
    console.log('Odchytená hodnota emitovanej udalosti handleAnswerChange ' + answer );

  const updateQuestionData = () => {
    Object.entries(questionData.value).forEach(([key, index]) => {
      if (key == answer.question) {
        questionData.value[key] = answer.answer; // toto potrebujem opracvit uircite je to picovina
        console.log(questionData.value)
      }
    });
  };
  updateQuestionData();

sendData(volunteerData.value);

};




</script>

<template>
    
    <div v-if="!loading">
        <div v-for="(question, index ) in questions" key="question.id" >
            <hr>
            <br>
            <div v-html="question"></div>
            <br>            
            <hr>
            <br>
            <div>
                <AnswerBox 
                    :answer="questionData[index]"
                    :question ="index"
                    @answer="handleAnswer"
                    @question ="handleAnswer"
                />
            </div>
            
        </div>
    </div>

</template>