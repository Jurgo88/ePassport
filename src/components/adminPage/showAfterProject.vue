<script setup>
import { ref, defineProps} from 'vue';
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
            <h3>Evaulation</h3>
            <div v-for="scenarioKey in  Object.keys(questions.afterProject)" :key="scenarioKey">
                <h4>{{ scenarioKey }}</h4>
                <br>
                <div v-for="questionKey in Object.keys(questions.afterProject[scenarioKey])" :key="questionKey">
                <p><strong>{{ questions.afterProject[scenarioKey][questionKey] }}</strong></p>
                <p>{{ volunteerData.afterProject[scenarioKey][questionKey] }}</p>
                <hr>
                </div>
                <br>
            </div>
            <br>
        </div>
    </v-container>
</template>