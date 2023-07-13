<script setup>
import { ref, onMounted,   } from 'vue';

const volunteerData = ref(props.volunteerData);

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});

</script>
<template>
    <v-container class="mobile-first-container">
            <h1>Europass CV</h1>
        <br>
        <br>
        <p class="subheading">The objectives of this sheet are to :</p>
        <br>
        <p>
            <ul>
                <li>Give you detailed instructions for using the Europass curriculum vitae Help you enhance your career path</li>
                <li>Help and accompany you in defining your project </li>
                <li>Allow you to list your skills and experience </li>
                <li>Help you enhance your career path</li>
            </ul>
        </p>
        <br>  
        <p class="subheading">Instruction and practical details</p>
        <br>
        <p>
            <ul>
                <li>Use the online interface or download the Word format of the Europass CV</li>
                <li>Write the CV in English and complete it with as many details as possible</li>
                <li>Send it by e-mail to your project manager, along with the cover letter and the language test.</li>
            </ul>
        </p>
        <br>
        <p class="subheading">HOW TO WRITE YOUR EUROPASS CURRICULUM VITAE?</p>
        <br>
        <p>
            Go to the website: <a href="https://europass.cedefop.europa.eu/editors/en/cv/compose">https://europass.cedefop.europa.eu/</a>
        </p>
    </v-container>
</template>

<style>
.subheading {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0;
    color: #0c2f6b;
    text-transform: uppercase;
}
ul {
    list-style-type: disc;
    margin: 0 20px;
    padding: 0;
}
a{
    color: #0c2f6b;
    text-decoration: underline;
}
</style>