<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { questions } from '../../../services/questions';
import showEnglishTest from '../adminPage/showEnglishTest.vue';
import showProject from './showProject.vue';
import showCountry from './showCountry.vue';
import showEU from './showEU.vue';
import showHealthQuiz from './showHealthQuiz.vue';

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
            <h3>LetterToMyself</h3>
            <p>{{ volunteerData.beforeProject.letterToMyself }}</p>
        </div>
        <br>
        <show-english-test :volunteerData="volunteerData" />
        <br>
        <show-project :volunteerData="volunteerData" />
        <br>
        <show-country :volunteerData="volunteerData" />
        <br>
        <showEU :volunteerData="volunteerData" />
        <br>
        <show-health-quiz :volunteerData="volunteerData" />
       
    </v-container>
</template>
