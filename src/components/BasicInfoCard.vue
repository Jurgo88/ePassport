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
            nationality: '',
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

const isHidden = ref(false);
const isHiddenDate = ref(false);

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
  // tu by som mal spravit validaciu 

//   console.log('Pod sem pls ------ submitForm + volunteerInfo ' + volunteerInfo.value);
//   console.log(volunteerData.value)

  const updatedVolunteerData = {
      ...volunteerData.value,
      ...volunteerInfo.value,
      hasBasicInfo: true,
      userId: userMail.value,
    };
    console.log('updatedVolunteerData: ', updatedVolunteerData);

    volunteerData.value = updatedVolunteerData;

  try {
    await createNewRecord(userMail.value, volunteerData.value);
    //store.state.auth.userDetails.userData.hasBasicInfo = true;

    

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

const onDateSelected = (e) => {
//   console.log('onDateSelected + e ' + e);
//   console.log(e.target.value);
  volunteerInfo.value.basicInfo.volunteerInfo.start = e.target.value;
//   setTimeout(() => {
//     isHidden.value = true;
//   }, 3000);
};

const onDateOfBirthSelected = (e) => {
//   console.log('onDateOfBirthSelected + e ' + e);
//   console.log(e.target.value);
//   console.log(e.target.value.year);
  volunteerInfo.value.basicInfo.volunteerInfo.dateOfBirth = e.target.value;
//   isHiddenDate.value = true;
};

const onFocus = (e) => {
  console.log('onFocused + e ' + e);
  showPicker();
//   volunteerInfo.value.basicInfo.volunteerInfo.start = e.target.value;
};

const showPicker = () => {
    console.log('showPicker');
    isHidden.value = false; // Show the v-col
//     isHiddenDate.value = false; // Show the v-col
};

const datePickerFormat = 'YYYY-MM-DD';





</script>




<template>
    <v-container>
        <h2>Volunteer Details</h2>
        <div v-if="!props.volunteerData.hasBasicInfo">
            <v-app>
                <v-form lazy-validation @submit="submitForm" v-if="!props.volunteerData.hasBasicInfo">
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.name" label="Name of volunteer" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.surname" label="Surname of volunteer" hide-details  clearable required></v-text-field> 
                    </v-col>
                    <v-col cols="12"  :class="{ hideInput: isHidden, showInput: !isHidden }" >
                        <v-text-field 
                           
                            v-model="volunteerInfo.basicInfo.volunteerInfo.start" 
                            label="Start of mobility" 
                            hide-details 
                            readonly 
                            clearable 
                            required 
                            @click="showPicker()">
                        </v-text-field>
                        <v-date-picker v-model="picker"></v-date-picker>
                    </v-col>
                    <v-col cols="12" :class="{ hideInput: !isHidden, showInput: isHidden }">
                        <v-date-picker v-model="volunteerInfo.basicInfo.volunteerInfo.start" label="Start of mobility" format="YYYY-DD-MM" required></v-date-picker>
                        <input  type="date" class="myDatePicker" placeholder="Start of mobility" onfocus="(this.type='date')" v-model="volunteerInfo.basicInfo.volunteerInfo.start" @input="onDateSelected"  />
                    </v-col>
                    <v-col cols="12"  :class="{ hideInput: isHiddenDate, showInput: !isHiddenDate }" >
                        <v-text-field 
                           
                            v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" 
                            label="Date of birth" 
                            hide-details 
                            readonly 
                            clearable 
                            required 
                            @click="showPicker()">
                        </v-text-field>
                        <v-date-picker v-model="picker"></v-date-picker>
                    </v-col>
                    <v-col cols="12" :class="{ hideInput: !isHiddenDate, showInput: isHiddenDate }">
                        <v-date-picker v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" label="Date of birth" :format="datePickerFormat" required></v-date-picker>
                        <input type="date" class="myDatePicker" placeholder="Date of birth" onfocus="(this.type='date')" v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" @input="onDateOfBirthSelected" @focus="showPicker()" />
                    </v-col>
                    <!-- <v-col cols="12"  >
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.dateOfBirth" label="Date of birth" hide-details  clearable required></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.volunteerInfo.placeOfBirth" label="Place of birth" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="volunteerInfo.basicInfo.volunteerInfo.nationality" label="Nationality" hide-details   clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                        <v-select v-model="volunteerInfo.basicInfo.volunteerInfo.sex" label="Sex" :items="['male', 'female', 'others']" required></v-select>
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
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.projectNo" label="Project number" hide-details  clearable required></v-text-field>
                    </v-col> 
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.projectName" label="Hosting organisation project name" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoContactPerson" label="Hosting organisation contact person" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoTelephone" label="Hosting organisation telephone" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoEmail" label="Hosting organisation email" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.hoInfo.hoWeb" label="Hosting organisation website" hide-details  clearable required></v-text-field>
                    </v-col>


                    <h2>Sending Organisation Information</h2>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soName" label="Sending organisation name" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soAddress" label="Sending organisation address" hide-details   required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soContactPerson" label="Sending organisation contact person" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soTelephone" label="Sending organisation telephone" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soEmail" label="Sending organisation email" hide-details  clearable required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class="" v-model="volunteerInfo.basicInfo.soInfo.soWeb" label="Sending organisation website" hide-details  clearable required></v-text-field>
                    </v-col>

                    <v-btn color="primary" type="submit">Submit</v-btn>
                    


                    


                </v-form>
            </v-app>
        </div>


    </v-container>
    
  </template>
  

<style >
.myTextField {
  /* max-height: 22px; */
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
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
.showInput {
  display: none;
}





</style>

