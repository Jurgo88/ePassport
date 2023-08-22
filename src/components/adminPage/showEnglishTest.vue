<script setup>
import { ref, defineProps  } from 'vue';
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
        <div>
            <h2>English Test</h2>
            <h3>Listnening</h3>
            <br>
            <div v-for="scenarioKey in  Object.keys(questions.beforeProject.englishTest.listening)" :key="scenarioKey">
                <h4>{{ scenarioKey }}</h4>
                <br>
                <div v-for="questionKey in Object.keys(questions.beforeProject.englishTest.listening[scenarioKey])" :key="questionKey">
                <p><strong>{{ questions.beforeProject.englishTest.listening[scenarioKey][questionKey] }}</strong></p>
                <p>{{ volunteerData.beforeProject.englishTest.listening[scenarioKey][questionKey] }}</p>
                <hr>
                </div>
                <br>
            </div>
            <br>
            <h3>Writting</h3>
            <br>
            <div v-for="questionKey in Object.keys(questions.beforeProject.englishTest.writting)" :key="questionKey">
                <p><strong>{{ questions.beforeProject.englishTest.writting[questionKey] }}</strong></p>
                <p>{{ volunteerData.beforeProject.englishTest.writting[questionKey] }}</p>
                <br>
            </div>

            
        </div>
        <br>
</template>
