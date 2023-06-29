<script setup>
import LoginCard from "../components/LoginCard.vue";
import Message from "../components/Message.vue";
import {useStore} from "vuex";

// Get the Vuex store.
const store = useStore()
// Get the signIn state from the store.
const signInState = store.state.auth.signIn
console.log('Login page' + signInState);

</script>

<template>
  <div class="flex flex-col items-center" style="background-color: #0c2e6b; flex-grow: 1;">
    <div class="container mx-auto" >
      <LoginCard />
    </div>
    <Message
        :warning="signInState.isError"
        :warningMsg="signInState.errorMessage"
    />
  </div>
</template>