<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { updateRecord } from '/services/database.js';
import { getAuth } from 'firebase/auth';
import  sendData  from '/services/sendData.js';


const emit = defineEmits(['isShowingTest']);



// props
const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
  isShowingTest: {
    type: Boolean,
    required: true,
  },
  userState: {
    type: Object,
    required: true,
  },
});

const isShowingTest = ref(props.isShowingTest);

// const emit = (eventName, payload) => {
//   if (eventName === 'isShowingTest') {
//     isShowingTest.value = payload;
//   }
// };

// methods
function handleButtonClick() {
    console.log('handleButtonClick');
    isShowingTest.value = false;
    emit('isShowingTest', isShowingTest.value);
    console.log('isShowingTest.value : ' + isShowingTest.value);
}

function handleTestClick() {
    console.log('handleTestClick');
    isShowingTest.value = true;
    emit('isShowingTest', isShowingTest.value);
    console.log('isShowingTest.value : ' + isShowingTest.value);
}

const store = useStore();

const volunteerData = ref(props.volunteerData);
const answer = ref('');

</script>

<template>
        <p>
            EnglishTestHomePage
        </p>
        <p>
                Tu bude link na test
            </p>
            <br>
            <!-- <v-btn
                color="primary"
                @click="handleButtonClick()"
                >
                Go to the test
            </v-btn> -->
        <v-btn
            text="Start TEST"
            color="primary"
            @click="handleTestClick()"
            >
        </v-btn>
            
        

        <br>
        <v-btn
            color="primary"
            @click="handleButtonClick()"
            >
            Go back
        </v-btn>
    
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