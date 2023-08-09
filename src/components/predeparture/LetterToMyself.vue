<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { updateRecord } from '/services/database.js';
import  sendData  from '/services/sendData.js';
import { getAuth } from 'firebase/auth';


const store = useStore();

const volunteerData = ref(props.volunteerData);
const answer = ref('');
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
        <h1>Letter to myself</h1>
    <div>
        <br>
        <br>
    <p>
        How this experience is connected with my future career? 
        (My first motivation to do an international mobility, which specific mission and which countries).
    </p>
    <br>
    <p>
       What would I like to achieve personally and professionally, my strengths to reach these objectives, my fears and challenges, what should I leave home and what should I take with me - material and not only.
    </p>
    <br>
    <p>
        Hybrid or virtual mobility? Explain also how you will organize your tasks in remote. What is important for you and the organisation which will work with you?
    </p>
    <br>
    <div>
        <v-textarea class="textarea" v-model="answer"  label="Your answer..." outlined></v-textarea>
        <v-btn icon @click="handleButtonClick()"  :color="buttonColor" class="myButton" style="margin: 0;">
            <i class="material-icons">add_circle_outline</i>
        </v-btn>
    </div>
    
    </div>

    </v-container>
    

  
</template>

