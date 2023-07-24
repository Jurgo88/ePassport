<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import EnglishTestHomePage from './EnglishTestHomePage.vue';
import EnglishTestListening from './EnglishTestListening.vue';


const props = defineProps({
    volunteerData: {
        type: Object,
        required: true,
    },
});

// Emitované udalosti
const emit = defineEmits(['isShowingTest']);

//const volunteerData = ref(props.volunteerData);
const isShowingTest = ref(false);
const isShowingListeningTest = ref(false);

function handleButtonClick() {
    console.log('handleButtonClick');
    isShowingTest.value = true;
    console.log('isShowingTest.value : ' + isShowingTest.value);
}

function handleListeningButtonClick() {
    console.log('handleListeningButtonClick');
     isShowingListeningTest.value = true;
     console.log('isShowingListeningTest.value : ' + isShowingListeningTest.value);
}

const  handleIsShowingTest = (value) => {
  console.log('Odchytená hodnota emitovanej udalosti isShowingTest:', value);
  // Tu môžete vykonať ďalšie operácie na základe emitovanej hodnoty
    isShowingTest.value = value;
}

</script>
<template>
    <v-container>
        <h1>English Test</h1>
        <br>
        <div class="firstLink" v-if="!isShowingTest && !isShowingListeningTest " >
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
            <v-btn
                text="Start TEST"
                color="primary"
                @click="handleButtonClick()"
                >
            </v-btn>
            <br>
            <br>
            <v-btn
                text="Start Listening"
                color="primary"
                @click="handleListeningButtonClick()"
                >
            </v-btn>
        </div>
        <EnglishTestHomePage 
            v-if="isShowingTest"
            :isShowingTest="isShowingTest" 
            :volunteerData="volunteerData"
            @isShowingTest="handleIsShowingTest"
        ></EnglishTestHomePage>
        <EnglishTestListening 
            v-if="isShowingListeningTest"
            :isShowingListeningTest="isShowingListeningTest" 
            :volunteerData="volunteerData"
            @isShowingListeningTest="handleListeningButtonClick"
        ></EnglishTestListening>
        

    </v-container>
    
</template>

<style >
.subheading {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0;
    color: #0c2f6b;
    text-transform: uppercase;
}
</style>