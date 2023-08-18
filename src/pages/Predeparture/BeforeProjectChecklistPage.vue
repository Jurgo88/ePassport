<script setup>
import { ref, computed, watch } from 'vue';

const selectedAll = ref(false);

// const selected = ref([]);

// const selectedLength = computed(() => selected.length);

// console.log('selectedLength: ' + selectedLength.value);

// Create an array to store checkbox values
const checkboxes = ref([]);

// Compute whether all checkboxes are selected
const allCheckboxesSelected = computed(() => {
  return checkboxes.value.every(checkbox => checkbox);
});

// Watch for changes in allCheckboxesSelected and update the button color
watch(allCheckboxesSelected, (newValue) => {
  if (newValue) {
    nextButtonColor.value = 'secondary';
  } else {
    nextButtonColor.value = 'accent';
  }
});

// Button color
const nextButtonColor = ref('accent');

</script>
<template>
    <v-container>
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
        <v-checkbox v-model="selected" label="Check the exchange rate costs with your bank."></v-checkbox>
        <v-checkbox v-model="selected" label="Call your bank adviser to inform him/her about your stay abroad and to avoid your credit card being blocked. This call could be the opportunity to negotiate some options to reduce the extra fees."></v-checkbox>
        <br>
        <h3>COMMUNICATION</h3>
        <br>
        <v-checkbox v-model="selected" label="Check if your European mobile operator works abroad and/or at home."></v-checkbox>
        <v-checkbox v-model="selected" label="Prepare and always keep with you a list (in your phone AND on paper) with the following information: Emergency numbers of the Hosting country (Police, Firemen, Medical emergencies, etc.) Sending Organisation, Project manager (email, phone numbers) Hosting organisation, Mentor (email, phone numbers, address) Home country Embassy (email, phone number, address) o Personal emergency contacts (email, phone numbers) Hospital (phone numbers, address) Insurance (email, phone numbers) Etc."></v-checkbox>
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
        <v-checkbox v-model="selected" label="Validate your insurance registration by creating your personal space (just follow the instructions in the emails you will receive)."></v-checkbox>
        <v-checkbox v-model="selected" label="Download and print your membership card, if any. Save it too in your emails."></v-checkbox>
        <v-checkbox v-model="selected" label="Check if all the vaccines have been done."></v-checkbox>
        <v-checkbox v-model="selected" label="In case of any specific medical needs, inform your doctor about your departure and find information about the availability of the medicines you need in your hosting country."></v-checkbox>
        <v-checkbox v-model="selected" label="Inform your Social Insurance and your complementary insurance about your departure."></v-checkbox>
        <br>
        <h3>SAFETY</h3>
        <br>
        <v-checkbox v-model="selected" label="Find information about the Hosting country situation. Check your Home Country’s Ministry of Foreign Affairs. They should have some advices to follow."></v-checkbox>
        <v-checkbox v-model="selected" label="Do not forget to register yourself at your arrival in your Home Country Embassy."></v-checkbox>
        <br>
        <h3>PRACTICAL INFORMATION</h3>
        <br>
        <v-checkbox v-model="selected" label="Check if you need a plug adaptor."></v-checkbox>
        <v-checkbox v-model="selected" label="Think to bring with you some adapted clothes to work onsite. If needed, you can also bring some specific material to realise your tasks. Ask your hosting organisation."></v-checkbox>
        <v-checkbox v-model="selected" label="Check if someone will pick you up at the airport or find out about local transports at your arrival."></v-checkbox>
        <v-checkbox v-model="selected" label="Get prepared for the jetlag."></v-checkbox>
        <br>
        <h3>DO NOT FORGET also</h3>
        <br>
        <v-checkbox v-model="selected" label="To bring a present to your host family and hosting organization (chocolate are the best present for all)"></v-checkbox>
        <v-checkbox v-model="selected" label="Inform your sending organization and your family that you have arrived."></v-checkbox>
        <v-checkbox v-model="selected" label="Send a scan of your boarding pass to your sending organization. Keep all the boarding passes and travel tickets in original – you will need to send them to your SO at the end of the project!"></v-checkbox>
        <v-checkbox v-model="selected" label="Gather the information regarding your results in the field."></v-checkbox>
        <v-checkbox v-model="selected" label="Complete and send the statistics table (here) to your sending organization. As your deployment is financed by European funds, it is our responsibility as sending organization to be accountant and report to the donor"></v-checkbox>
        <v-checkbox v-model="selected" label="During all the duration of your project keep a track of your activities: photos, attendance sheets from training that you have carried out, events... and send them to your sending organization..."></v-checkbox>
        <br>
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