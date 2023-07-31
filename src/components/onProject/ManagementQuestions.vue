<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

//props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  }
});

const volunteerData = ref(props.volunteerData);

console.log('Mame tieto data volunteerData  na Management: ' + volunteerData.value);

</script>
<template>
    Questions
</template>