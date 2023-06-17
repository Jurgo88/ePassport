<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
});

const userMail = ref(props.userState.userData.email);





console.log('Volunteer page');
</script>
<template>
    <div class="container mx-auto">
      <div class="w-full text-center">
        <h1>Volunteer Page</h1>
        <div>{{ userMail }}</div>
      </div>
    </div>
  </template>

<style scoped>

</style>