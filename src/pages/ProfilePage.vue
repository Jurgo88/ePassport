<script setup>
import ProfileCard from '../components/ProfileCard.vue'
import ChangePasswordCard from "../components/ChangePasswordCard.vue";
import Message from "../components/Message.vue";
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const isShow = computed(() => store.state.actionSheet.changePasswordSheet.isShow)
const changePasswordState = store.state.auth.changePassword

</script>

<template>
  <v-container>
    <div class="mx-auto">
      <ProfileCard />
    </div>
    <Message
        :success="changePasswordState.isSuccess"
        successMsg="Change Password Success"
        :warning="changePasswordState.isError"
        :warningMsg="changePasswordState.errorMessage"
    />
  </v-container>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
