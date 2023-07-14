<script setup>
import { firebaseAuth } from '../../firebase/config';
import { useStore } from "vuex";
import { watchEffect, computed } from "vue";
import { useRouter } from 'vue-router';
import 'vuetify/dist/vuetify.min.css';

const store = useStore()
const userState = computed(() => store.state.auth.userDetails)
const admin = import.meta.env.VITE_ADMIN;
const router = useRouter();

// Check if user is admin
const isAdmin = computed(() => userState.value?.userData?.uid === admin);

const logOut = () => {
  store.dispatch('logOutAction')
  router.push('/login')
}

const firebaseUser = () => firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    store.commit('successRequestUser', user)
  } else {
    store.commit('failRequestUser', 'Fail to get user')
  }
});

watchEffect(firebaseUser)

</script>

<template>
  <v-layout>
    <v-app-bar
        color="primary"
      >
        <!-- <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template> -->

        <!-- <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template> -->

        <v-app-bar-title>ePasport</v-app-bar-title>

        <!-- <v-spacer></v-spacer> -->

        <div v-if="userState.isSignIn">
          <router-link to="/" class="">
            <v-btn icon ><i class="material-icons">home</i></v-btn>
          </router-link>

          <router-link to="/profile" class="">
            <v-btn icon ><i class="material-icons">account_circle</i></v-btn>
          </router-link>

          <router-link to="/" class="">
            <v-btn icon  @click="logOut" ><i class="material-icons">logout</i></v-btn>
          </router-link>

          <span v-if="isAdmin">
            <router-link to="/register" >
              <v-btn ><i class="material-icons">plus_one</i></v-btn>
              
            </router-link>
          </span>
        </div>

        <div v-else>
          <router-link to="/login" >
            <v-btn icon ><i class="material-icons">login</i></v-btn>
          </router-link>         
        </div>

      </v-app-bar>
  </v-layout>
</template>
<style>
i{
  color: white;
}
</style>