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
  } catch (error) {
    console.log(error);
  }
});

console.log('MgmtPage');

</script>
<template>
  <v-container>
    <h1>Management of Daily Tasks</h1>
    <br>
    <p>
      An effective task management implies a good organisation and a multitude of abilities: planning, analysing, evaluating, and the capacity to report about your progress on a specific task. Below, you will find some recommendations to implement an efficient workflow between you and the hosting organisation.
    </p>
    <br>
    <h2>Activity log:</h2>
    <br>
    <p>
      An Activity Log is a personally written record (timetable) showing effectively how you, as a participant, spend their time. By keeping an Activity Log (in a digital format), the sending and the hosting organisation can build up an accurate picture of what you are doing during the day, and how you are investing your time. It is particularly adapted to participants doing hybrid or virtual mobilities as it is a tool enabling easy daily follow-up.
    </p>
    <br>
    <p>
      Keeping an Activity Log helps you, as a VET participant, but also the sending and hosting organisations, to understand how to organise your time at work, and how to minimise or eliminate low value activities.
    </p>
    <p>
      Two different examples of Activity 
    </p>
    <br>
    <p>
      Logs are presented below:
    </p>
    <br>
    <h3>Example 01: Daily Activity Log</h3>



  </v-container>
</template>