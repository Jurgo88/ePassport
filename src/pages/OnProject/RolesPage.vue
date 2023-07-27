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
    Rules page    

</template>