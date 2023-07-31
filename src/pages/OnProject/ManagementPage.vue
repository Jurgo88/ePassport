<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID, loadOnProjectDataByID } from '/services/database.js';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({}); // Tu používame ref, pretože budeme meniť hodnotu.

onBeforeMount(async () => {
  try {
    console.log('akebo je prv toto onBefore ?');
    console.log(`uid : ${uid}`);
    console.log('pod sem');
    const dataFromDatabase = await loadOnProjectDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    console.log(`dataFromDatabase.value : ${dataFromDatabase}`);
    console.log(`volunteerData.value : ${volunteerData.value}`);
  } catch (error) {
    console.log(error);
  }
});

console.log('MgmtPage');

</script>
<template>
    Management Page
</template>