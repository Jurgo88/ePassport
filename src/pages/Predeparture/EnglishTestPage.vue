<script setup>
import { useRoute, useRouter } from 'vue-router';
</script>
<template>
    <v-container v-if="!loading">
        <h1>English Test</h1>
        <br>
            <div class="subheading">
            The objectives of this sheet : 
        </div>
        <br>
        <p>
            The purpose of this test is to evaluate your level of English. 
            It focuses on your general knowledge of the  English language, including grammar and vocabulary, 
            and also assesses your oral and written comprehension of English.
        </p>
        <br>
        <div class="subheading">
            Instructions and practical details
        </div>
        <br>
        <p>
            <b>The test is divided into 3 parts:</b>  

            <ul>
                <li>Part 1: MCQ (40 questions)</li>
                <li>Part 2: Listening comprehension</li>
                <li>Part 3: Written comprehension</li>
            </ul>
        </p>
        <br>
        <router-link
            :to="{
                name: 'EnglishTestStartTestPage',
            }"
            >
            <v-btn
                text="Start TEST"
                color="primary"
                class="my-button"
                >
            </v-btn>
        </router-link>
        <br>
        <router-link
            :to="{
                name: 'EnglishTestListeningPage',
            }"
            >
            <v-btn
                text="Start Listening"
                color="primary"
                class="my-button"
                >
            </v-btn>
        </router-link>
        <br>
        <router-link
            :to="{
                name: 'EnglishTestWrittingPage',
            }"
            >
            <v-btn
                text="Start Written"
                color="primary"
                class="my-button"
                >
            </v-btn>
        </router-link>
        <br>
        <router-link
            :to="{
                name: 'EnglishTestLearningPage',
            }"
            >
            <v-btn
                text="Language learning"
                color="primary"
                class="my-button"
                >
            </v-btn>
        </router-link>
        <br>
        <br>
        <hr>
        <br>
        <router-link
            :to="{
                name: 'PredeparturePage',
            }"
            >
            <v-btn
                color="secondary"
                class="my-button"
                >
                BACK TO PREDEPARTURE PAGE
            </v-btn>
        </router-link>
        

    </v-container>
 
</template>