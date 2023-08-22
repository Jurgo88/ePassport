<script setup>
import { ref, defineProps } from 'vue';
import { questions } from '../../../services/questions';


//props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  }
});

const volunteerData = ref(props.volunteerData);

</script>
<template>
    <v-container>
        <div>
            <h3>Activities of the project</h3>
            <div v-for:="questionKey in Object.keys(questions.onProject.activities)" :key="questionKey">
                <p><b><div v-html="questions.onProject.activities[questionKey]"></div></b></p>
                <p>{{ volunteerData.onProject.activities[questionKey] }}</p>
                <hr>
                <br>
            </div>
            <br>
            <h3>Follow Up</h3>
            <div v-for="scenarioKey in  Object.keys(questions.onProject.followUp)" :key="scenarioKey">
                <h4>{{ scenarioKey }}</h4>
                <br>
                <div v-for="questionKey in Object.keys(questions.onProject.followUp[scenarioKey])" :key="questionKey">
                <p><strong>{{ questions.onProject.followUp[scenarioKey][questionKey] }}</strong></p>
                <p>{{ volunteerData.onProject.followUp[scenarioKey][questionKey] }}</p>
                <hr>
                </div>
                <br>
            </div>
        </div>
        <br>

       
    </v-container>
</template>