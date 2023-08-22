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
    <h2>Country</h2>
    <div v-for:="questionKey in Object.keys(questions.beforeProject.country)" :key="questionKey">
        <p><b><div v-html="questions.beforeProject.country[questionKey]"></div></b></p>
        <p>{{ volunteerData.beforeProject.country[questionKey] }}</p>
        <hr>
        <br>
    </div>
   </div>
</template>