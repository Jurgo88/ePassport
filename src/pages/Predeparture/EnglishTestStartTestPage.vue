<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { loadVolunteerDataByID }  from '/services/database.js';
import sendData from '../../../services/sendData.js';
import AnswerBox from '../../components/AnswerBox.vue';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;
const volunteerData = ref({});
const loading = ref(true);

const handleAnswer = (answerData) => {
    volunteerData.value.beforeProject.englishTest.result = answerData.answer;
    sendData(volunteerData.value);
}

onMounted(async () => {
    console.log('OnMounted');
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
        <h1>English Test</h1>
        <br>
        <v-btn text="Start test" color="primary" class="my-button" href="https://docs.google.com/forms/d/e/1FAIpQLSdVA2GbRonud-joulyLHGWAyvf0tvykEyFkJ3TvBQOuR_VYTw/viewform?usp=sf_link"></v-btn>
        <br>
        <br>
        <AnswerBox :answer="volunteerData.beforeProject.englishTest.result" :volunteerData="volunteerData" @answer="handleAnswer" />

        <hr>
        <br>
        <router-link :to="{
                name: 'EnglishTestPage' 
            }" >
            <v-btn block color="secondary" class="my-button">BACK</v-btn>
        </router-link>
    </v-container>
</template>