<script setup>
import { ref, onMounted, defineProps, getCurrentInstance, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { createNewRecord } from '/services/database.js';
import { getAuth, updateProfile } from 'firebase/auth';

const emit = defineEmits(['formSubmitted']);

const store = useStore();

const volunteerInfo = ref({
    basicInfo: {
        volunteerInfo: {
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
        },
        hoInfo: {
            hoName: '',
            hoAddress: '',
            projectNo: '',
            projectName: '',
            hoContactPerson: '',
            hoTelephone: '',
            hoEmail: '',
            hoWeb: '',
        },
        soInfo: {
            soName: '',
            soAddress: '',
            soContactPerson: '',
            soTelephone: '',
            soEmail: '',
            soWeb: '',
        },
  },
});

const userMail = ref('');

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});

const volunteerData = ref(props.volunteerData);

onMounted(() => {
  userMail.value = store.state.auth.userDetails.userData.email;
});

const submitForm = async (e) => {
    console.log('submitForm + e ' + e);
  e.preventDefault();

  try {
    await createNewRecord(userMail.value, volunteerInfo.value);
    store.state.auth.userDetails.userData.hasBasicInfo = true;

    const updatedVolunteerData = {
      ...volunteerInfo.value,
      hasBasicInfo: true,
      userId: userMail.value,
    };

    volunteerData.value = updatedVolunteerData;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, { hasBasicInfo: true });
      console.log('Profil bol úspešne aktualizovaný.');
    }
    console.log('Volunteer info:', volunteerData.value);

    emit('formSubmitted', volunteerData.value);
    return volunteerInfo.value;
  } catch (error) {
    store.state.auth.userDetails.userData.hasBasicInfo = false;
    console.log(error);
  }
};



</script>


<template>
    <v-container>
        <h2>Volunteer Details</h2>
        <div v-if="!props.volunteerData.hasBasicInfo">
            <v-app full-height>
                <v-form novalidate @submit="submitForm" v-if="!props.volunteerData.hasBasicInfo">
                    <v-col cols="12">
                        <v-text-field class="" height="22px" v-model="volunteerInfo.basicInfo.volunteerInfo.name" label="Name of volunteer" hide-details clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.surname" label="Surname of volunteer" hide-details  clearable required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.start" label="Start of mobility" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.end" label="End of mobility" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" label="Date of birth" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.placeOfBirth" label="Place of birth" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                        <v-select v-model="volunteerInfo.basicInfo.volunteerInfo.sex" label="Sex" :items="['male', 'female']" required></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.address" label="Address" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.telephone" label="Telephone" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.email" label="Email" hide-details  clearable required></v-text-field>
                    </v-col>
                    <h2>Host Organisation Information</h2>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoName" label="Hosting organisation name" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoAddress" label="Hosting organisation address" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.projectNo" label="Project number and you dont have my number?" hide-details  clearable required></v-text-field>
                    </v-col>
                    </v-row>
                    


                </v-form>
            </v-app>
        </div>


    </v-container>
    <div>
      <div v-if="!props.volunteerData.hasBasicInfo">
        <form novalidate @submit="submitForm">
          <!-- Informace o dobrovolníkovi -->
          <h2>Volunteer Details</h2>
          <div>
            <label for="name">Name of volunteer:</label>
            <input type="text" id="name" v-model="volunteerInfo.basicInfo.volunteerInfo.name" required>
          </div>
          <div>
            <label for="surname">Surname of volunteer:</label>
            <input type="text" id="surname" v-model="volunteerInfo.basicInfo.volunteerInfo.surname" required>
          </div>
          <div>
            <label for="start">Start of mobility:</label>
            <input type="date" id="start" v-model="volunteerInfo.basicInfo.volunteerInfo.start" required>
          </div>
          <div>
            <label for="end">End of mobility:</label>
            <input type="date" id="end" v-model="volunteerInfo.basicInfo.volunteerInfo.end" required>
          </div>
          <div>
            <label for="dob">Date of birth:</label>
            <input type="date" id="dob" v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" required>
          </div>
          <div>
            <label for="placeOfBirth">Place of birth:</label>
            <input type="text" id="placeOfBirth" v-model="volunteerInfo.basicInfo.volunteerInfo.placeOfBirth" required>
          </div>
          <div>
            <label for="sex">Sex:</label>
            <select id="sex" v-model="volunteerInfo.basicInfo.volunteerInfo.sex" required>
              <option value="male">Muž</option>
              <option value="female">Žena</option>
            </select>
          </div>
          <div>
            <label for="address">Address of volunteer:</label>
            <input type="text" id="address" v-model="volunteerInfo.basicInfo.volunteerInfo.address" required>
          </div>
          <div>
            <label for="telephone">Telephone no.:</label>
            <input type="tel" id="telephone" v-model="volunteerInfo.basicInfo.volunteerInfo.telephone" required>
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="volunteerInfo.basicInfo.volunteerInfo.email" required>
          </div>
  
          <!-- Informace o hostitelské organizaci -->
          <h2>Host Organisation Information</h2>
          <div>
            <label for="hoName">Name of HO:</label>
            <input type="text" id="hoName" v-model="volunteerInfo.basicInfo.hoInfo.hoName" required>
          </div>
          <div>
            <label for="hoAddress">Address of HO:</label>
            <input type="text" id="hoAddress" v-model="volunteerInfo.basicInfo.hoInfo.hoAddress" required>
          </div>
          <div>
            <label for="projectNo">No. of project:</label>
            <input type="text" id="projectNo" v-model="volunteerInfo.basicInfo.hoInfo.projectNo" required>
          </div>
          <div>
            <label for="projectName">Name of project:</label>
            <input type="text" id="projectName" v-model="volunteerInfo.basicInfo.hoInfo.projectName" required>
          </div>
          <div>
            <label for="hoContactPerson">Contact person:</label>
            <input type="text" id="hoContactPerson" v-model="volunteerInfo.basicInfo.hoInfo.hoContactPerson" required>
          </div>
          <div>
            <label for="hoTelephone">Telephone no.:</label>
            <input type="tel" id="hoTelephone" v-model="volunteerInfo.basicInfo.hoInfo.hoTelephone" required>
          </div>
          <div>
            <label for="hoEmail">Email:</label>
            <input type="email" id="hoEmail" v-model="volunteerInfo.basicInfo.hoInfo.hoEmail" required>
          </div>
          <div>
            <label for="hoWeb">Web:</label>
            <input type="text" id="hoWeb" v-model="volunteerInfo.basicInfo.hoInfo.hoWeb" required>
          </div>
  
          <!-- Informace o odesílající organizaci -->
          <h2>Sending Organisation Information</h2>
          <div>
            <label for="soName">Name of SO:</label>
            <input type="text" id="soName" v-model="volunteerInfo.basicInfo.soInfo.soName" required>
          </div>
          <div>
            <label for="soAddress">Address of SO:</label>
            <input type="text" id="soAddress" v-model="volunteerInfo.basicInfo.soInfo.soAddress" required>
          </div>
          <div>
            <label for="soContactPerson">Contact person:</label>
            <input type="text" id="soContactPerson" v-model="volunteerInfo.basicInfo.soInfo.soContactPerson" required>
          </div>
          <div>
            <label for="soTelephone">Telephone no.:</label>
            <input type="tel" id="soTelephone" v-model="volunteerInfo.basicInfo.soInfo.soTelephone" required>
          </div>
          <div>
            <label for="soEmail">Email:</label>
            <input type="email" id="soEmail" v-model="volunteerInfo.basicInfo.soInfo.soEmail" required>
          </div>
          <div>
            <label for="soWeb">Web:</label>
            <input type="text" id="soWeb" v-model="volunteerInfo.basicInfo.soInfo.soWeb" required>
          </div>
  
          <button type="submit">Submit</button>
        </form>
      </div>
      <div v-else>
        <h2>Thank you for your submission!</h2>
      </div>
    </div>
  </template>
  

<style>
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

.v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }

</style>

