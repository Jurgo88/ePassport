<script setup>
</script>
<template>
    <v-container>
        <h1>Project</h1>
        <br>
        <h2>The objectives of this form are to:</h2>
        <br>
        <ul>
            <li>Help you to understand your project before the departure or the beginning of your mission and all along with its implementation</li>
            <li>Enable you to determine objectives, the resources and skills to be applied, and identify in advance any impediments/difficulties....</li>
            <li>It will enable you and your project leader to check the prerequisites (effectiveness of the work done, level of definition of the mobility project, etc.)</li>
        </ul>
        <br>
        <router-link to="/predeparture/project/advantages">
            <v-btn text color="primary" class="my-button">Advantages, strengths, fears & challenges</v-btn>
        </router-link>
        <br>
        <router-link
                :to="{
                    name: 'ProjectExpectationsPage'
                    } ">
            <v-btn text color="primary" class="my-button">Expectations</v-btn>
        </router-link>
        <router-link 
            :to="{
            name: 'ProjectHowIseePage'
            }">
            <v-btn text color="primary" class="my-button">How I see my project</v-btn>
        </router-link>
        <router-link 
            :to="{
            name: 'ProjectCompetencesPage'
            }">
            <v-btn text color="primary" class="my-button">Competences</v-btn>
        </router-link>
        <router-link 
            :to="{
            name: 'ProjectHowBenefitPage'
            }">
            <v-btn text color="primary" class="my-button">HOW WILL THE PROJECT BENEFIT ME?</v-btn>
        </router-link>
    </v-container>
</template>