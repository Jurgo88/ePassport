<script setup>

</script>
<template>
    <v-container>
        <router-link :to="{
                name: 'LetterToMyselfPage' 
            }" >
            <v-btn block color="primary" class="my-button">Letter to myself</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuropassCVPage' 
            }" >
            <v-btn block color="primary" class="my-button">Europass CV</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EnglishTestPage' 
            }" >
            <v-btn block color="primary" class="my-button">English test</v-btn>
        </router-link>
        <router-link :to="{
                name: 'ProjectPage' 
            }" >
            <v-btn block color="primary" class="my-button">Project</v-btn>
        </router-link>
        <!--<router-link :to="{
                name: 'LanguageLearningPage' 
            }" >
            <v-btn block color="primary" class="my-button">Language learning</v-btn>
        </router-link> -->
        <router-link :to="{
                name: 'CountryPage' 
            }" >
            <v-btn block color="primary" class="my-button">Country</v-btn>
        </router-link>
        <router-link :to="{
                name: 'EuPage' 
            }" >
            <v-btn block color="primary" class="my-button">European Union, Citizenship and Eco-responsibility</v-btn>
        </router-link>
        <router-link :to="{
                name: 'HealthPage' 
            }" >
            <v-btn block color="primary" class="my-button">Health and Security Quizz</v-btn>
        </router-link>
        <router-link :to="{
                name: 'BeforeProjectChecklistPage' 
            }" >
            <v-btn block color="primary" class="my-button">Before departure CHECKLIST </v-btn>
        </router-link>
        <br>
        <hr>
        <br>
        <router-link :to="{
                path: '/home'
            }" >
            <v-btn block color="secondary" class="my-button">Back</v-btn>
        </router-link>
         
    </v-container>
</template>