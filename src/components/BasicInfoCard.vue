<script setup>
import { ref, onMounted, defineProps, getCurrentInstance  } from 'vue';
import { useStore } from 'vuex';
import { createNewRecord } from '/services/database.js';
import { getAuth, updateProfile } from 'firebase/auth';

const store = useStore();

const volunteerInfo = ref({
    name: '',
    surname: '',
    start: '',
    end: '',
    dateOfBirth: '',
    placeOfBirth: '',
    sex: '',
    address: '',
    telephone: '',
    email: '',
    hoName: '',
    hoAddress: '',
    projectNo: '',
    projectName: '',
    hoContactPerson: '',
    hoTelephone: '',
    hoEmail: '',
    hoWeb: '',
    soName: '',
    soAddress: '',
    soContactPerson: '',
    soTelephone: '',
    soEmail: '',
    soWeb: '',
});

const userMail = ref('');

const emit = defineEmits(['volunteerData'])

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
    //default: () => ({}),
  },
});

const volunteerData = ref(props.volunteerData);

onMounted(() => {
  userMail.value = store.state.auth.userDetails.userData.email;
  //console.log("store: " + store.state.auth.userDetails.userData.hasBasicInfo);
});



const submitForm = async (e) => {
    e.preventDefault();
    console.log('createNewRecord');
    console.log(volunteerInfo.value);
    try{
        await createNewRecord(userMail.value, volunteerInfo.value);
        store.state.auth.userDetails.userData.hasBasicInfo = true;


        const updatedVolunteerData = {
            ...volunteerInfo.value,
        };

        volunteerData.value = updatedVolunteerData;
        console.log("Props data : " + volunteerData.data)
        

        const auth = getAuth(); // Získání instance autentizační služby
        const user = auth.currentUser; // Získání aktuálního přihlášeného uživatele

        if (user) {
            // Aktualizace profilu uživatele s vlastností hasBasicInfo
            await updateProfile(user, { hasBasicInfo: true });
            console.log('Profil byl úspěšně aktualizován.');
        }

        //const { emit } = getCurrentInstance();
        emit('volunteerData', volunteerData.value);
        return volunteerInfo.value;

    }
    catch(error){
        store.state.auth.userDetails.userData.hasBasicInfo = false;
        console.log(error);
    }
    // createNewRecord(userMail.value, volunteerInfo.value);
    // store.state.auth.userDetails.userData.hasBasicInfo = true;
     console.log("Ma zakladne info : " + store.state.auth.userDetails.userData.hasBasicInfo)
};


// const createNewRecord = (data) => {
    
//   // Implementujte logiku pro vytvoření nového záznamu v databázi
// };


</script>

<!-- <script>
  export default {
    props: ['volunteerData'],
  }
</script> -->

<template>
  <div>
    <p>Ma Info email: {{ store.state.auth.userDetails.userData.hasBasicInfo }}</p>
    <div v-if="!store.state.auth.userDetails.userData.hasBasicInfo">
        <form novalidate  @submit="submitForm">
        <!-- novalidet sluzi na to aby neboli polia required -->
      <!-- Informace o dobrovolníkovi -->
      <h2>Volunteer Details</h2>
      <div>
        <label for="name">Name of volunteer:</label>
        <input type="text" id="name" v-model="volunteerInfo.name" required>
      </div>
      <div>
        <label for="surname">Surname of volunteer:</label>
        <input type="text" id="surname" v-model="volunteerInfo.surname" required>
      </div>
      <div>
        <label for="start">Start of mobility:</label>
        <input type="date" id="start" v-model="volunteerInfo.start" required>
      </div>
      <div>
        <label for="end">End of mobility:</label>
        <input type="date" id="end" v-model="volunteerInfo.end" required>
      </div>
      <div>
        <label for="dob">Date of birth:</label>
        <input type="date" id="dob" v-model="volunteerInfo.dateOfBirth" required>
      </div>
      <div>
        <label for="placeOfBirth">Place of birth:</label>
        <input type="text" id="placeOfBirth" v-model="volunteerInfo.placeOfBirth" required>
      </div>
      <div>
        <label for="sex">Sex:</label>
        <select id="sex" v-model="volunteerInfo.sex" required>
          <option value="male">Muž</option>
          <option value="female">Žena</option>
        </select>
      </div>
      <div>
        <label for="address">Address of volunteer:</label>
        <input type="text" id="address" v-model="volunteerInfo.address" required>
      </div>
      <div>
        <label for="telephone">Telephone no.:</label>
        <input type="tel" id="telephone" v-model="volunteerInfo.telephone" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="volunteerInfo.email" required>
      </div>

      <!-- Informace o hostitelské organizaci -->
      <h2>Host Organisation Information</h2>
      <div>
        <label for="hoName">Name of HO:</label>
        <input type="text" id="hoName" v-model="volunteerInfo.hoName" required>
      </div>
      <div>
        <label for="hoAddress">Address of HO:</label>
        <input type="text" id="hoAddress" v-model="volunteerInfo.hoAddress" required>
      </div>
      <div>
        <label for="projectNo">No. of project:</label>
        <input type="text" id="projectNo" v-model="volunteerInfo.projectNo" required>
      </div>
      <div>
        <label for="projectName">Name of project:</label>
        <input type="text" id="projectName" v-model="volunteerInfo.projectName" required>
      </div>
      <div>
        <label for="hoContactPerson">Contact person:</label>
        <input type="text" id="hoContactPerson" v-model="volunteerInfo.hoContactPerson" required>
      </div>
      <div>
        <label for="hoTelephone">Telephone no.:</label>
        <input type="tel" id="hoTelephone" v-model="volunteerInfo.hoTelephone" required>
      </div>
      <div>
        <label for="hoEmail">Email:</label>
        <input type="email" id="hoEmail" v-model="volunteerInfo.hoEmail" required>
      </div>
      <div>
        <label for="hoWeb">Web:</label>
        <input type="text" id="hoWeb" v-model="volunteerInfo.hoWeb" required>
      </div>

      <!-- Informace o odesílající organizaci -->
      <h2>Sending Organisation Information</h2>
      <div>
        <label for="soName">Name of SO:</label>
        <input type="text" id="soName" v-model="volunteerInfo.soName" required>
      </div>
      <div>
        <label for="soAddress">Address of SO:</label>
        <input type="text" id="soAddress" v-model="volunteerInfo.soAddress" required>
      </div>
      <div>
        <label for="soContactPerson">Contact person:</label>
        <input type="text" id="soContactPerson" v-model="volunteerInfo.soContactPerson" required>
      </div>
      <div>
        <label for="soTelephone">Telephone no.:</label>
        <input type="tel" id="soTelephone" v-model="volunteerInfo.soTelephone" required>
      </div>
      <div>
        <label for="soEmail">Email:</label>
        <input type="email" id="soEmail" v-model="volunteerInfo.soEmail" required>
      </div>
      <div>
        <label for="soWeb">Web:</label>
        <input type="text" id="soWeb" v-model="volunteerInfo.soWeb" required>
      </div>

      <button type="submit" @submit="submitForm">Submit</button>
    </form>
    </div>
    <div v-else>
        <h2>Thank you for your submission!</h2>
        
    </div>
    
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

input[type="text"],
input[type="tel"],
input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
}

@media (min-width: 768px) {
  form div {
    display: flex;
    align-items: center;
  }

  label {
    width: 150px;
    margin-right: 10px;
  }

  input[type="text"],
  input[type="tel"],
  input[type="email"] {
    width: calc(100% - 160px);
  }
}
</style>

