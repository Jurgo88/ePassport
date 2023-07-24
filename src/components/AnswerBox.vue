<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { updateRecord } from '/services/database.js';
import  sendData  from '/services/sendData.js';
import { getAuth } from 'firebase/auth';


const store = useStore();

const volunteerData = ref(props.volunteerData);
const answer = ref(props.answer);
const buttonColor = ref('red');


 if (!volunteerData.value.beforeProject) {
    volunteerData.value.beforeProject = {}; // Ak cesta beforeProject neexistuje, vytvorte ju ako prázdny objekt
  }
  else if (!volunteerData.value.beforeProject.letterToMyself) {
    volunteerData.value.beforeProject.letterToMyself = ''; // Ak cesta beforeProject neexistuje, vytvorte ju ako prázdny objekt
  }
  else{
    console.log('letterToMyself existuje : ' + volunteerData.value.beforeProject.letterToMyself);
    answer.value = volunteerData.value.beforeProject.letterToMyself;
  }

// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

// methods

// const sendData = async () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const email = user.email;
//   const data = volunteerData.value;
//   const letterToMyself = answer.value;



//   volunteerData.value.beforeProject.letterToMyself = letterToMyself;

//   console.log('Sending data to database... data + answer : ' + data + answer.value)
//   await updateRecord(email, volunteerData.value);
// };

const handleButtonClick = () => {
    //sendData();
    const letterToMyself = answer.value;
    volunteerData.value.beforeProject.letterToMyself = letterToMyself;
    sendData(volunteerData.value);

    if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }

   
};

const handleAnswerChange = () => {
    console.log('handleAnswerChange : ' + answer.value);

if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }
};

// const handleAnswerChange = () => {
//     buttonColor.value = 'red';
// };

onMounted(() => {
    if (answer.value) {
        buttonColor.value = 'green';
    } else {
        buttonColor.value = 'red';
    }
});

</script>

<template>
    <v-container class="mobile-first-container">
   
    <div>
        <v-textarea class="textarea" v-model="answer"  label="Your answer..." outlined></v-textarea>
        <v-btn icon @click="handleButtonClick()"  :color="buttonColor" class="myButton" style="margin: 0;">
            <i class="material-icons">add_circle_outline</i>
        </v-btn>
    </div>
    
    </v-container>
    

  
</template>

<style >
    .mobile-first-container {
    }
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
    h1 {
        font-size: 32px;
        font-weight: 700;
        color: #0c2f6b;
    }
    h2{
        font-size: 24px;
        font-weight: 700;
        color: #0c2f6b;
    }
</style>