<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';


console.log('HealthPage');

</script>
<template>
    <v-container>
        <h1>Health and Security Quizz</h1>
        <br>
        <h2>OBJECTIVES AND INSTRUCTIONS</h2>
        <br>
        <b>The objectives of this sheet are to:</b><br>
        <ul>
            <li>Understand the safety regulations to be followed in your host country.</li>
            <li>Understand the risks and preventive measures related to your health and safety during your mobility project.</li>
            <li>Check that you have understood all the information contained in the organisation values charter and the safety guide/module.</li>
        </ul>

        <br>
        <b>Terms and Conditions are to:</b><br>
        <ul>
            <li>Read the safety guide carefully and feel free to take notes on the most important information important information.</li>
            <li>Be aware of the terms and conditions of your insurance policy.</li>
        </ul>
        <br>
        <router-link :to="{
                name: 'HealthPage1' 
            }" >
            <v-btn block color="primary" class="my-button">PART 1 - OFFICIAL AND ADMINISTRATIVE PROCEDURES</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage2' 
            }" >
            <v-btn block color="primary" class="my-button">PART 2 - PERSONAL BEHAVIOUR</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage3' 
            }" >
            <v-btn block color="primary" class="my-button">PART 3 - POLITICAL AND SECURITY RISKS</v-btn>            
        </router-link>
        <router-link :to="{
                name: 'HealthPage4' 
            }" >
            <v-btn block color="primary" class="my-button">PART 4 - HEALTH</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage5' 
            }" >
            <v-btn block color="primary" class="my-button">PART 5 – INSURANCE</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage6' 
            }" >
            <v-btn block color="primary" class="my-button">PART 6 – VOCABULARY</v-btn>
        </router-link>
        <br>
        <hr>
        <br>
        <router-link :to="{
                name: 'PredeparturePage' 
            }" >
            <v-btn color="secondary" class="my-button">Back</v-btn>
        </router-link>
    </v-container>
</template>