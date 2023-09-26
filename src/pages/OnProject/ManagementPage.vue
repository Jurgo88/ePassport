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

    <v-img src="/assets/daily_activity_log.png" alt="Activity Log 1" width="100%"></v-img>
    <br>
    <p>
      How to keep a daily activity log:
    </p>
    <br>
    <p>
      To keep an Activity Log, you need to create a new spreadsheet and set up (for example) the following column headers:
    </p>
    <br>
    <ul>
      <li>Date/Time</li>
      <li>Activity description</li>
      <li>Value (high, medium, low, none)</li>
      <li>How I feel</li>
    </ul>
    <br>
    <p>
      In the first column, Date/Time, note in the title column the date, and further indicate the hour each time you start a new task or activity.
    </p>
    <br>
    <p>
      In the second column, Activity Description, indicate the activity you started doing.
    </p>
    <br>
    <p>
      In the third column, Value, indicate which importance the task has in general (from your organisation’s point of view).
    </p>
    <br>
    <p>
      In the last column, How I feel, indicate the emotion you feel when doing the mentioned activity.
    </p>
    <br>
    <h3>Example 02: Weekly Activity Log</h3>
    <v-img src="/src/assets/weekly_activity_log.png" alt="Activity Log 2" width="100%"></v-img>

    <br>
    <p>      
      How to keep a weekly activity log:
    </p>

    <br>
    <p>
      To keep a weekly activity Log, you need to create a new spreadsheet and set up (for example) the following column headers:
    </p>
    <br>
    <ul>
      <li>Tasks/Time</li>
      <li>Checklist</li>
      <li>Exchange (Questions/Answers)</li>
    </ul>
    <br>
    <p>
      In the column Tasks/Time you can indicate the action that has to be done for the moment or for the indicated time. For instance, 
      training preparation is the action that must be completed.
    </p>
    <br>
    <p>
      Next, in the second column Checklist, you can indicate the tasks that need to be done in order for the task (for instance the training 
      preparation) to be completed.
    </p>
    <br>
    <p>
      In the third column Exchange, the user can note the potential questions that have to be answered either with the participant, 
      either with the hosting or sending organisation. The table will be considered complete, when all the questions will be answered.
    </p>
    <br>
    <p>
      Activity Logs are also useful in identifying non-core activities that do not contribute to achieving important objectives, 
      and in giving the Host organisation and Sending organisation a better overall understanding of your daily schedule. 
      Keeping such a track of your activities will support you to identify the tasks that feel less relevant and interesting and enable you to inform the hosting/sending organisation.
    </p>
    <br>
    <br>
    <hr>
    <br>
    <router-link to="/project/management/tools">
      <v-btn color="primary" class="my-button">Digital Tools for Daily Task Management</v-btn>
    </router-link>

  </v-container>
</template>