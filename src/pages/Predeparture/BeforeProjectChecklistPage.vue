<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID } from '/services/database.js';
import sendData from '../../../services/sendData.js';

const selectedAll = ref(false);
const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({});
const loading = ref(false);
const hasChecklist = ref(false); 

// Create an array to store checkbox values
const checkboxes = ref([false, false, false , false, false, false, false, false, false, false, false, false, false, false, false, false, false, false , false, false, false, false, false, false]);

// Compute whether all checkboxes are selected
const allCheckboxesSelected = computed(() => {
  for (let i = 0; i < checkboxes.value.length; i++) {
    if (!checkboxes.value[i]) {
      return "secondary";
    }
  }
  console.log('allCheckboxesSelected computed true');
  selectedAll.value = true;
  nextButtonColor.value = 'success';
  return "success";
});


// Button color
const nextButtonColor = ref('error');

function checkAllCheckboxes () {
  for (let i = 0; i < checkboxes.value.length; i++) {
    checkboxes.value[i] = true;
  }
}

function controlChecklistFromDatabase() {

  if(hasChecklist.value)
  {
    for (let i = 0; i < checkboxes.value.length; i++) {
      checkboxes.value[i] = volunteerData.value.beforeProject.checklist[i];
    }
    nextButtonColor.value = 'success';
    // checkAllCheckboxes();
  }
}

function saveChecklist() {
  volunteerData.value.beforeProject.checklist = checkboxes.value;
  // console.log(checkboxes.value);
  sendData(volunteerData.value);
}

onBeforeMount(async () => {
  try {
    const dataFromDatabase = await loadVolunteerDataByID(uid);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    loading.value = true;
    console.log('volunteerData.value.beforeProject.checklist: ' + volunteerData.value.beforeProject.checklist);
    if(volunteerData.value.beforeProject.checklist)
    {
      hasChecklist.value = true;
      controlChecklistFromDatabase();
    }
  } catch (error) {
    console.log(error);
  }
});

</script>
<template>
    <v-container v-if="loading">
        <h1>Before departure</h1>
        <br>
        <p>
            You are almost ready for the departure. Check the TO DO list and the last reminders:
        </p>
        <br>
        <h3>ADMINISTRATIVE DUTIES</h3>
        <br>
        <v-checkbox v-model="checkboxes[0]" label="Always keep your original travel tickets (boarding passes, train tickets). The proofs of your international travel from your Home to your Hosting organisation have to be sent by post to the sending organisation."></v-checkbox>
        <v-checkbox v-model="checkboxes[1]" label="Scan your ID card and your passport and send them to your mailbox."></v-checkbox>
        <br>
        <h3>BANK</h3>
        <br>
        <v-checkbox v-model="checkboxes[2]" label="Check if your credit card works abroad. Check the potential extra fees to withdraw cash abroad."></v-checkbox>
        <v-checkbox v-model="checkboxes[3]" label="Check the exchange rate costs with your bank."></v-checkbox>
        <v-checkbox v-model="checkboxes[4]" label="Call your bank adviser to inform him/her about your stay abroad and to avoid your credit card being blocked. This call could be the opportunity to negotiate some options to reduce the extra fees."></v-checkbox>
        <br>
        <h3>COMMUNICATION</h3>
        <br>
        <v-checkbox v-model="checkboxes[5]" label="Check if your European mobile operator works abroad and/or at home."></v-checkbox>
        <v-checkbox v-model="checkboxes[6]" label="Prepare and always keep with you a list (in your phone AND on paper) with the following information: Emergency numbers of the Hosting country (Police, Firemen, Medical emergencies, etc.) Sending Organisation, Project manager (email, phone numbers) Hosting organisation, Mentor (email, phone numbers, address) Home country Embassy (email, phone number, address) o Personal emergency contacts (email, phone numbers) Hospital (phone numbers, address) Insurance (email, phone numbers) Etc."></v-checkbox>
        <br>
        <div style="padding-left: 2em;">
            <ul>
            <li>Emergency numbers of the Hosting country (Police, Firemen, Medical emergencies, etc.)</li>
            <li>Sending Organisation, Project manager (email, phone numbers)</li>
            <li>Hosting organisation, Mentor (email, phone numbers, address)</li>
            <li>Home country Embassy (email, phone number, address)</li>
            <li>Personal emergency contacts (email, phone numbers)</li>
            <li>Hospital (phone numbers, address)</li>
            <li>Insurance (email, phone numbers)</li>
            <li>Etc.</li>
        </ul>
        </div>

        <br>
        <h3>HEALTH</h3>
        <br>
        <v-checkbox v-model="checkboxes[7]" label="Validate your insurance registration by creating your personal space (just follow the instructions in the emails you will receive)."></v-checkbox>
        <v-checkbox v-model="checkboxes[8]" label="Download and print your membership card, if any. Save it too in your emails."></v-checkbox>
        <v-checkbox v-model="checkboxes[9]" label="Check if all the vaccines have been done."></v-checkbox>
        <v-checkbox v-model="checkboxes[10]" label="In case of any specific medical needs, inform your doctor about your departure and find information about the availability of the medicines you need in your hosting country."></v-checkbox>
        <v-checkbox v-model="checkboxes[11]" label="Inform your Social Insurance and your complementary insurance about your departure."></v-checkbox>
        <br>
        <h3>SAFETY</h3>
        <br>
        <v-checkbox v-model="checkboxes[12]" label="Find information about the Hosting country situation. Check your Home Country’s Ministry of Foreign Affairs. They should have some advices to follow."></v-checkbox>
        <v-checkbox v-model="checkboxes[13]" label="Do not forget to register yourself at your arrival in your Home Country Embassy."></v-checkbox>
        <br>
        <h3>PRACTICAL INFORMATION</h3>
        <br>
        <v-checkbox v-model="checkboxes[14]" label="Check if you need a plug adaptor."></v-checkbox>
        <v-checkbox v-model="checkboxes[15]" label="Think to bring with you some adapted clothes to work onsite. If needed, you can also bring some specific material to realise your tasks. Ask your hosting organisation."></v-checkbox>
        <v-checkbox v-model="checkboxes[16]" label="Check if someone will pick you up at the airport or find out about local transports at your arrival."></v-checkbox>
        <v-checkbox v-model="checkboxes[17]" label="Get prepared for the jetlag."></v-checkbox>
        <br>
        <h3>DO NOT FORGET also</h3>
        <br>
        <v-checkbox v-model="checkboxes[18]" label="To bring a present to your host family and hosting organization (chocolate are the best present for all)"></v-checkbox>
        <v-checkbox v-model="checkboxes[19]" label="Inform your sending organization and your family that you have arrived."></v-checkbox>
        <v-checkbox v-model="checkboxes[20]" label="Send a scan of your boarding pass to your sending organization. Keep all the boarding passes and travel tickets in original – you will need to send them to your SO at the end of the project!"></v-checkbox>
        <v-checkbox v-model="checkboxes[21]" label="Gather the information regarding your results in the field."></v-checkbox>
        <v-checkbox v-model="checkboxes[22]" label="Complete and send the statistics table (here) to your sending organization. As your deployment is financed by European funds, it is our responsibility as sending organization to be accountant and report to the donor"></v-checkbox>
        <v-checkbox v-model="checkboxes[23]" label="During all the duration of your project keep a track of your activities: photos, attendance sheets from training that you have carried out, events... and send them to your sending organization..."></v-checkbox>
        <br>

        <!-- Sellect all for test purpose -->
        <!-- <v-checkbox v-model="selectedAll" label="Select all" @change="checkAllCheckboxes"></v-checkbox> -->

        <v-btn @click="saveChecklist" :color="allCheckboxesSelected" class="my-button sticky">Save</v-btn>
        <hr>
        <br>
        <router-link :to="{
            name: 'PredeparturePage'
        }">
        <v-btn color="accent" class="my-button">Back</v-btn>

        </router-link> 
         
    </v-container>
</template>
<style src="../../css/checkbox.css"></style>
<style scoped>
 .sticky {
     position: sticky;
     bottom: 10px;
 }
</style>