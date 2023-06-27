<script setup>
import { useStore } from 'vuex';
import {ref, reactive } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import LoadingSpinner from './LoadingSpinner.vue';
import router from "../router";

const store = useStore()
const signInState = store.state.auth.signIn

// The data model for the password and email fields.
const passwordModel = ref('')
const emailModel= ref('')

// The state of the component, which is used to control the disabled state of the sign-in button.
const localState = reactive({
  disableSignIn: true,
  emailError: false,
  passwordError: false,
})

// The sign-in function.
const signIn = () => {
  // Dispatch the sign-in action.
  store.dispatch('signInAction', {email: emailModel.value, password: passwordModel.value}).then(() => {
    if (!signInState.isError) {
      // Dispatch the get-user action.
      console.log('signInAction');
      store.dispatch('getUserAction')
      router.push('/home');
    }
  })
}

// Validate the email field.
const validateEmail = () => {
  const mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  localState.emailError = emailModel.value.length < 1 || !emailModel.value.match(mail_format);
}

// Validate the password field.
const validatePassword = () => {
  localState.passwordError = passwordModel.value.length < 1;
}

// Validate the form.
const validateForm = () => {
  validateEmail()
  validatePassword()
  localState.disableSignIn = (localState.emailError || localState.passwordError);
}

</script>

<template>
  <form class="flex-col text-center bg-white lg:w-[40%] md:w-[60%] rounded-xl shadow-lg mx-auto sm:w-full p-5 relative" @submit.prevent="signIn" @change="validateForm">
    <LoadingSpinner v-if="signInState.isLoading" />
    <img src="../assets/logo.png" alt="" srcset="">
    <div class="md:w-[90%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="EmailInputText" type="email" v-model="emailModel" class="w-full" required :class="{'p-invalid': localState.emailError}"/>
        <label for="EmailInputText">Email</label>
      </span>
      <p v-if="localState.emailError" class="text-red-500 text-xs italic text-left">Email is required</p>
    </div>
    <div class="md:w-[90%] mx-auto my-10 sm:w-full">
      <span class="p-float-label mb-2">
        <InputText id="PasswordInputText" type="password" v-model="passwordModel" class="w-full" required :class="{'p-invalid': localState.passwordError}"/>
        <label for="PasswordInputText">Password</label>
      </span>
      <p v-if="localState.passwordError" class="text-red-500 text-xs italic text-left">Password is required</p>
    </div>
    <button class="bg-[#2B2E4A] rounded-full drop-shadow-lg text-white text-md h-9 w-[85px] opacity-40" :class="{ 'ableSignIn': !localState.disableSignIn }" :disabled="localState.disableSignIn">Login</button>
  </form>
</template>

<style scoped lang="postcss">
.ableSignIn {
  @apply hover:bg-[#FF9000] transition ease-in-out opacity-100
}
form{
  background-color: #0c2e6b;
}
</style>
