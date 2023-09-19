<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import ChangePasswordCard from "../components/ChangePasswordCard.vue";
import { useStore } from 'vuex';
import router from "../router";
import {loadVolunteerDataByID } from "../../services/database";
import sendData from '../../services/sendData';

const store = useStore()
const userState = computed(() => store.state.auth.userDetails)
const loading = ref(false);

const isShow = computed(() => store.state.actionSheet.changePasswordSheet.isShow)

const volunteerData = ref({});
const basicInfo = ref({});

// volunteerData.value = loadVolunteerDataByID(userState.value.userData.email);
// const basicInfo = volunteerData.value.basicInfo;
// console.log(volunteerData.value);
// console.log(basicInfo);

const logOut = () => {
  if (confirm('Are you sure you want to log out?') === false) {
    return;
  }
  else{
  store.dispatch('logOutAction')
  router.push('/login')
  }
    
}

const showChangePassword = () => {
  return store.dispatch('activeChangePasswordSheetAction')
}

const onDateSelected = (e) => {
  console.log('onDateSelected + e ' + e);
  volunteerInfo.value.basicInfo.volunteerInfo.start = e.target.value;
};
const onDateSelectedEnd = (e) => {
  volunteerInfo.value.basicInfo.volunteerInfo.end = e.target.value;
};


const submitForm = async (e) => {
    console.log('submitForm + e ' + e);
  e.preventDefault();
  try {
    await sendData(volunteerData.value);
    console.log('hehehe ' + volunteerData.value.basicInfo.volunteerInfo.name)
  }
  catch{
    console.log('error');
  }
}


onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(userState.value.userData.email);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    basicInfo.value = volunteerData.value.basicInfo;
    // console.log(volunteerData.value);
    // console.log(basicInfo);
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
});


</script>

<template>
  <div class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full relative pb-5 mb-8">
    <!-- <div class="overflow-hidden w-full h-full">
      <img class="rounded-tl-xl rounded-tr-xl h-[300px] w-full top-0 left-0 " src="../assets/portfolio-1.jpg"  alt="portfolio"/>
    </div>
    <div class="flex justify-center z-30 absolute w-full top-[13rem]">
      <img class="rounded-full h-[200px] w-[200px] border-8 border-white" src="../assets/portfolio-2.jpg" alt="profile"/>
    </div> -->
    <div class="mt-28">
      <h1 class="text-3xl text-left ml-5 mb-7" v-text="userState.userData.email" />
      <div class="text-center mr-5 flex justify-end">
        <!-- <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[85px] hover:bg-[#FF9000] transition ease-in-out mr-5" @click="logOut">LogOut</button> -->
      <v-btn class="myButton" color="error" @click="logOut">LogOut</v-btn>
        <!-- <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[190px] hover:bg-[#FF9000] transition ease-in-out" @click="showChangePassword">Change Password</button> -->
        <v-btn class="myButton" color="secondary" @click="showChangePassword">Change Password</v-btn>
      </div>
    </div>
    <div>
    </div>
  </div>
  <Transition>
    <ChangePasswordCard v-if="isShow" />
  </Transition>
  <div v-if="!loading" class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full relative pb-5 mb-8">
    <h1>Edit Volunteer Information</h1>
    <v-container>
    <v-form @submit.prevent="submitForm">
      <!-- Volunteer Info -->
      <h2>Volunteer Information</h2>
      <v-text-field v-model="volunteerData.basicInfo.volunteerInfo.name" label="Name" />
      <v-text-field v-model="basicInfo.volunteerInfo.surname" label="Surname" />
      <v-select v-model="basicInfo.volunteerInfo.sex" label="Sex" :items="['male', 'female', 'others']" required></v-select>
      <v-text-field v-model="basicInfo.volunteerInfo.address" label="Address" />
      <v-text-field v-model="basicInfo.volunteerInfo.email" label="Email" />
      <v-text-field v-model="basicInfo.volunteerInfo.telephone" label="Phone" />
      <v-text-field v-model="basicInfo.volunteerInfo.placeOfBirth" label="Place of Birth" />
      <div class ="dateInputs">
        <v-date-picker v-model="basicInfo.volunteerInfo.birthDate" label="Birth Date" :format="datePickerFormat" required></v-date-picker>
        <input type="date" class="myDatePicker" placeholder="Birth Date" onfocus="(this.type='date')" v-model="basicInfo.volunteerInfo.birthDate" @input="onDateSelected"  />
        <br>
        <br>
        <v-date-picker v-model="basicInfo.volunteerInfo.start" label="Start of mobility" :format="datePickerFormat" required></v-date-picker>
        <input type="date" class="myDatePicker" placeholder="Start of mobility" onfocus="(this.type='date')" v-model="basicInfo.volunteerInfo.start" @input="onDateSelected"  />
        <br>
        <br>
        <v-date-picker v-model="basicInfo.volunteerInfo.end" label="Start of mobility" :format="datePickerFormat" required></v-date-picker>
        <input type="date" class="myDatePicker" placeholder="End of mobility" onfocus="(this.type='date')" v-model="basicInfo.volunteerInfo.end" @input="onDateSelectedEnd"  />
      <br>
      <br>
      </div>


      <!-- ... other fields for volunteer info ... -->

      <!-- HO Info -->
      <h2>Host Organization Information</h2>
      <v-text-field v-model="basicInfo.hoInfo.hoName" label="Host Organization  Name" />
      <v-text-field v-model="basicInfo.hoInfo.hoAddress" label="Host Organization  Address" />
      <v-text-field v-model="basicInfo.hoInfo.projectName" label="Project name" />
      <v-text-field v-model="basicInfo.hoInfo.projectNo" label="Project number" />
      <v-text-field v-model="basicInfo.hoInfo.hoContactPerson" label="Contact person" />
      <v-text-field v-model="basicInfo.hoInfo.hoTelephone" label="Host Organization telephone" />
      <v-text-field v-model="basicInfo.hoInfo.hoEmail" label="Host Organization email" />
      <v-text-field v-model="basicInfo.hoInfo.hoWeb" label="Host Organization website" />


      <!-- ... other fields for HO info ... -->

      <!-- SO Info -->
      <h2>Sending Organization Information</h2>
      <v-text-field v-model="basicInfo.soInfo.soName" label="Sending Organization Name" />
      <v-text-field v-model="basicInfo.soInfo.soAddress" label="Sending Organization Address" />
      <v-text-field v-model="basicInfo.soInfo.soContactPerson" label="Contact person" />
      <v-text-field v-model="basicInfo.soInfo.soTelephone" label="Sending Organization Phone" />
      <v-text-field v-model="basicInfo.soInfo.soEmail" label="Sending Organization Email" />
      <v-text-field v-model="basicInfo.soInfo.soWeb" label="Sending Organization Website" />



      <!-- ... other fields for SO info ... -->

      <v-btn type="submit" class="my-button" color="primary">Submit changes</v-btn>
    </v-form>
    </v-container>


  </div>
</template>

<style >
input[type="date"] {
    background: #e8e8e8;
    border: none;
    /* border-bottom: 1px solid #000000; */
    outline: none;
    height: 50px;
    width: 100%;
    color: #000000;
    font-size: 16px;
    margin: 5px;
}
input[type="date"]:before {
  color: #2B2E4A;
  content: attr(placeholder) !important;
  margin-right: 1em;
}
input[type="date"]:focus:before {
  content: '' !important;
  margin-right: 1em;
}
.dateInputs{
  padding-right: 5px;
  margin-left: -5px;
}
</style>
