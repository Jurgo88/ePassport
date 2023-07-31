<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';
//import AnswerBox from '../AnswerBox.vue';
import sendData from '/services/sendData.js';





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

const volunteerData = ref(props.volunteerData);
const path = "beforeProject.englishTest.writting";

console.log(volunteerData.value);

</script>

<template>
    <v-container>
      <div>
        <div class="subheading">Roles and Responsibilities</div>
        <br>
        <br>
          <p>
            The three parties involved in a mobility are: the sending organisation, the hosting organisation, and the mobility participant.
          </p>
          <br>
          <p>
            The following section details the duties, roles, and responsibilities of the three parties before, during and after the international mobility period:
          </p>
          <br>
          <div class="subheading">Sending organisation:</div>
          <br>
          <p>
            <ul>
              <li>Signs the Grant agreement with the respective National Agency and manages the project.</li>
              <li>Assigns a person responsible for managing the project and a contact person.</li>
              <li>Manages the grant.</li>
              <li>Selects the participant(s).</li>
              <li>Provides information about the overall sending process.</li>
              <li>Provides all the necessary documentation to carry out the mobility.</li>
              <li>Subscribes to the insurance for the participants and provide detailed explanations on its functioning.</li>
              <li>Signs the learning agreement with the participant and the hosting organisation.</li>
              <li>Supports participants during the preparation phase, as well as during the mobility and after it.</li>
              <li>Makes the relevant reports during the whole process.</li>
              <li>Submits the final report to the Agency.</li>
              <li>Reports on the results to the relevant National Agency.</li>
              <li>Encourage their participants to take part in alumni activities and networks.</li>
            </ul>
          </p>
          <br>
          <div class="subheading">Hosting organisation:</div>
          <br>
          <ul>
            <li>Signs an agreement for the implementation of the project with the sending organisation.</li>
            <li>Signs the learning agreement with the participant and the sending organisation.</li>
            <li>Assigns a person responsible for managing the project and a contact person.</li>
            <li>Welcomes participants.</li>
            <li>Prepares and manages all hosting details.</li>
            <li>Provides any necessary information from the host country.</li>
            <li>Ensures fair and equal conditions for all participants.</li>
            <li>Identifies a mentor and a line manager who will be following the participant during their stay.</li>
            <li>Support</li>
            <li>Prepares and monitors participants during the mobility period.</li>
            <li>Enables participants to develop skills and take initiatives throughout the mobility period.</li>
            <li>Provides recognitions related to the mobility period.</li>
            <li>Makes the relevant reports during the participant's stay in the host country or during the virtual mobility period.</li>
            <li>Promotes environmentally sustainable and responsible behaviour among the participants.</li>
          </ul>
          <br>
          <div class="subheading">Participants:</div>
          <br>
          <ul>
            <li>Provide reliable information relating to their personal and professional situation.</li>
            <li>Provide information about their needs, expectations, and desired learning outcomes.</li>
            <li>Inform the sending organisation of any steps taken in parallel that may alter the course of the project (job search, application for training, etc.).</li>
            <li>Provide information about their competences and educational background.</li>
            <li>Carefully read all the information provided about the mobility project.</li>
            <li>Attend all the introductory meetings/interviews with both the sending and hosting organisation (in person or online).</li>
            <li>Sign the learning agreement.</li>
            <li>Submit the relevant report.</li>
            <li>Follow the rules and laws of the host country.</li>
            <li>Maintain regular contact with the sending and hosting organisation.</li>
            <li>Ensure their own safety and the safety of their entourage by avoiding putting themselves in any dangerous or hazardous situation.</li>
          </ul>
          <br>
          <br>
          <router-link :to="{
                path: '/project/activities' 
            }" >
            <v-btn block color="primary" class="my-button">Activities of the project:</v-btn>
        </router-link>
        <p>
          
        </p>
      </div>
    </v-container>

</template>