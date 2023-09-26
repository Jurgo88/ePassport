<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';
import sendData from '../../services/sendData.js';

const props = defineProps({
  initialRating: Number, // Počáteční hodnocení (1-5)

  volunteerData: {
    type: Object,
    required: false,
  },

  questionData: {
    type: String,
    required: true,
  },

    path: {
        type: String,
        required: false,
    },
  
});

const emit = defineEmits(['update']);

const currentValue = ref(props.initialRating);
const volunteerData = ref(props.volunteerData);

function emitRating() {
    console.log('emitRating : ' + currentValue.value)
  emit('update',currentValue.value);
}

function updateRatting() {

    const questionPath = `${props.path}.${props.questionData}`;

    const pathSegments = questionPath.split('.');

// Nastavení hodnoty v odpovídajícím objektu na základě cesty
let targetObject = volunteerData.value;
for (let i = 0; i < pathSegments.length - 1; i++) {
  const segment = pathSegments[i];
  if (!targetObject[segment]) {
    targetObject[segment] = {};
  }
  targetObject = targetObject[segment];
}

// Nastavení hodnoty uvnitř finálního objektu na základě hodnoty currentValue
const lastSegment = pathSegments[pathSegments.length - 1];
targetObject[lastSegment] = currentValue.value;

console.log('volunteerData.value', volunteerData.value);
sendData(volunteerData.value);

}

onBeforeMount(() => {
    console.log('onBeforeMount : ' + props.initialRating);
    currentValue.value = props.initialRating;
});

</script>
<template>
  <div class="rating" >
    <!-- <label v-for="value in 5" :key="value" :class="{ active: value <= currentValue }">
      <input type="radio" :value="value" v-model="currentValue" @change="updateRatting" />
      {{ value }}
    </label> -->
    <v-radio-group v-model="currentValue" @change="updateRatting" inline >
    <v-radio v-for="value in 5" :key="value" :value="value" :class="{ active: value <= currentValue}">
        {{ value }}
    </v-radio>
    </v-radio-group>
  </div>

</template>
<style >
.rating {
  display: flex;
  padding-top: 10px;
  padding-left: 10px;
}

label {
  cursor: pointer;
  margin-right: 5px;
}

.active {
  color: rgb(0, 17, 255);
  opacity: 1;
}

.v-selection-control__input input{
    opacity: 0.7 !important;
    color: red !important;
    height: 40px !important;
    margin-top: 0px !important;
  }
  .v-selection-control__input {
    
    margin-left: -24px;
  }
  .v-checkbox .v-selection-control {
    min-height: 30px;
  }
  .v-selection-control--inline {
    flex: 1 0 auto;
  }
</style>