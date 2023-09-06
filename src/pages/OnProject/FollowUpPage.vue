<script setup>
//import { ref, onMounted, defineProps, defineEmits } from 'vue';

</script>
<template>
    <v-toolbar class="navigation-predeparture" color="primary" dark>
        <v-toolbar-title><button @click="goBack"><i class="material-icons">arrow_back_ios_new</i></button></v-toolbar-title>
    </v-toolbar>

    <v-container>
        <router-link :to="{
            name: 'FollowUpActivitiesPage',
            params: {
                data: volunteerData
            }
        }">
            <v-btn color="primary" class="my-button">Activities/objectives</v-btn>
        </router-link>
        <router-link :to="{
            name: 'FollowUpSupportPage',
            params: {
                data: volunteerData
            }
        }">
            <v-btn color="primary" class="my-button">Support during the activities</v-btn>
        </router-link>
        <router-link :to="{
            name: 'FollowUpCompetencesPage',
            params: {
                data: volunteerData
            }
        }">
            <v-btn color="primary" class="my-button">Competences</v-btn>
        </router-link>
        <br>
        <br>
        <hr>
        <br>
        <router-link :to="{
            name: 'OnProjectPage',
        }">
            <v-btn color="secondary" class="my-button">Back</v-btn>
        </router-link>
    </v-container>
</template>