<script setup>

</script>
<template>
    <v-container>
        <h1>Evaluation of the Experience</h1>
        <br>
        <p>
            The evaluation is done at the end of the project and is multi-dimensional. Its aim is to give you the opportunity to evaluate your learning achievements, the success of your project, as well as provide valuable input for the planning and implementation of future projects by the sending and hosting organisations.

            </p>
            <br>
            <p>
Use the following activity to evaluate your progress throughout your experience. Rate each statement with a note from 1 to 5 and provide detailed answers to the questions with dedicated space.
        </p>
        <br>
        <br>
        <router-link :to="{
                name: 'SupportPage' 
            }" >
            <v-btn block color="primary" class="my-button">Guidance and support</v-btn>
        </router-link>
        <router-link :to="{
                name: 'TasksPage' 
            }" >
            <v-btn block color="primary" class="my-button">Tasks and Activities</v-btn>
        </router-link>
        <router-link :to="{
                name: 'CompetencesPage' 
            }" >
            <v-btn block color="primary" class="my-button">Learning and competences</v-btn>
        </router-link>
        <router-link :to="{
                name: 'GeneralPage' 
            }" >
            <v-btn block color="primary" class="my-button">General Evaluation</v-btn>
        </router-link>

    </v-container>
    
</template>