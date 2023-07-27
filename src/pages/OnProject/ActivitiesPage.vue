<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';
import AnswerBox from '../../components/AnswerBox.vue';
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


</script>

<template>
    Activities
    {{ props.volunteerData }}

    </template>