<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import router from "../router";
import {loadVolunteerDataByID } from "../../services/database";

const store = useStore()
const userState = computed(() => store.state.auth.userDetails)
const loading = ref(false);

const volunteerData = ref({});
const basicInfo = ref({});

// volunteerData.value = loadVolunteerDataByID(userState.value.userData.email);
// const basicInfo = volunteerData.value.basicInfo;
console.log(volunteerData.value);
console.log(basicInfo);

const logOut = () => {
  store.dispatch('logOutAction')
  router.push('/login')
}

const showChangePassword = () => {
  return store.dispatch('activeChangePasswordSheetAction')
}

onBeforeMount(async () => {
  try {
    loading.value = true;
    const dataFromDatabase = await loadVolunteerDataByID(userState.value.userData.email);
    volunteerData.value = dataFromDatabase; // Meníme hodnotu ref.
    basicInfo.value = volunteerData.value.basicInfo;
    console.log(volunteerData.value);
    console.log(basicInfo);
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
});


</script>

<template>
  <div class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full relative pb-5 mb-8">
    <div class="overflow-hidden w-full h-full">
      <img class="rounded-tl-xl rounded-tr-xl h-[300px] w-full top-0 left-0 " src="../assets/portfolio-1.jpg"  alt="portfolio"/>
    </div>
    <div class="flex justify-center z-30 absolute w-full top-[13rem]">
      <img class="rounded-full h-[200px] w-[200px] border-8 border-white" src="../assets/portfolio-2.jpg" alt="profile"/>
    </div>
    <div class="mt-28">
      <h1 class="text-3xl text-left ml-5 mb-7" v-text="userState.userData.email" />
      <div class="text-center mr-5 flex justify-end">
        <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[85px] hover:bg-[#FF9000] transition ease-in-out mr-5" @click="logOut">LogOut</button>
        <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[190px] hover:bg-[#FF9000] transition ease-in-out" @click="showChangePassword">Change Password</button>
      </div>
    </div>
    <div>
    </div>
  </div>
  <div v-if="!loading" class="flex-col text-center bg-white md:w-[75%] rounded-xl shadow-lg mx-auto sm:w-full relative pb-5 mb-8">
    <h1>Edit Volunteer Information</h1>
    <v-form @submit.prevent="submitForm">
      <!-- Volunteer Info -->
      <h2>Volunteer Information</h2>
      <v-text-field v-model="volunteerData.basicInfo.volunteerInfo.name" label="Name" />
      <v-text-field v-model="basicInfo.volunteerInfo.surname" label="Surname" />
      <v-text-field v-model="basicInfo.volunteerInfo.address" label="Address" />
      <v-text-field v-model="basicInfo.volunteerInfo.email" label="Email" />
      <v-text-field v-model="basicInfo.volunteerInfo.telephone" label="Phone" />
      <v-text-field v-model="basicInfo.volunteerInfo.birthDate" label="Birth Date" />

      <!-- ... other fields for volunteer info ... -->

      <!-- HO Info -->
      <h2>Host Organization Information</h2>
      <v-text-field v-model="basicInfo.hoInfo.hoName" label="HO Name" />
      <v-text-field v-model="basicInfo.hoInfo.hoAddress" label="HO Address" />

      <!-- ... other fields for HO info ... -->

      <!-- SO Info -->
      <h2>Sending Organization Information</h2>
      <v-text-field v-model="basicInfo.soInfo.soName" label="SO Name" />
      <v-text-field v-model="basicInfo.soInfo.soAddress" label="SO Address" />

      <!-- ... other fields for SO info ... -->

      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>


  </div>
</template>

<style scoped>

</style>
