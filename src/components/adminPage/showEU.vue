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
    <h2>EU</h2>
    <div v-for="scenarioKey in  Object.keys(questions.beforeProject.europeanUnion)" :key="scenarioKey">
                <h4>{{ scenarioKey }}</h4>
                <br>
                <div v-for="questionKey in Object.keys(questions.beforeProject.europeanUnion[scenarioKey])" :key="questionKey">
                    <p><b><div v-html="questions.beforeProject.europeanUnion[scenarioKey][questionKey]"></div></b></p>
                    <p>{{ volunteerData.beforeProject.europeanUnion[scenarioKey][questionKey] }}</p>
                    <hr>
                    <br>
                </div>
                <br>
            </div>
    </div>
</template>