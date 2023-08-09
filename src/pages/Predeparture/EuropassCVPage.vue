<script setup>
import { ref, onBeforeMount,computed } from 'vue';
import { useStore } from 'vuex';
import EuropassCV from '../../components/predeparture/EuropassCV.vue';
// import EuropassCV from '../components/predeparture/EuropassCV.vue';
import { loadVolunteerDataByID } from '/services/database.js';


const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({});
const loading = ref(true); 


onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
});

</script>
<template>
  <v-container v-if="!loading">
    <EuropassCV :volunteerData="volunteerData" />
  </v-container>
</template>