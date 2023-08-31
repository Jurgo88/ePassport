<script setup>
</script>
<template>
    <v-container>
        <h1>English Test</h1>
        <br>
        <v-btn text="Start test" color="primary" class="my-button" href="https://docs.google.com/forms/d/e/1FAIpQLSdVA2GbRonud-joulyLHGWAyvf0tvykEyFkJ3TvBQOuR_VYTw/viewform?usp=sf_link"></v-btn>
        <br>
        <br>
        <hr>
        <br>
        <router-link :to="{
                name: 'EnglishTestPage' 
            }" >
            <v-btn block color="secondary" class="my-button">BACK</v-btn>
        </router-link>
    </v-container>
</template>