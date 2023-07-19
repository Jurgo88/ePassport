<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
    volunteerData: {
        type: Object,
        required: true,
    },
});

const volunteerData = ref(props.volunteerData);

function handleButtonClick() {
    console.log('handleButtonClick');
}

</script>
<template>
    <v-container>
        <h1>English Test</h1>
        <br>
        <p>
            Tu bude link na test
        </p>
        <br>
        <v-btn
            color="primary"
            @click="handleButtonClick()"
            >
            Go to the test
        </v-btn>

    </v-container>
    
</template>