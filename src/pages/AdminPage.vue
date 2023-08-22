<template>
  <v-container>
    <div class="mx-auto">
      <div class="w-full">
        <h1>Admin Page</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Sex</th>
              <th>Nationality</th>
              <th>Start</th>
              <th>End</th>
              <th>Date of Registration</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(user, index) in users" :key="index">
              <tr @click="toggleInfo(index)" class="text-center">
                <td >{{ user.basicInfo.volunteerInfo.name }}</td>
                <td>{{ user.basicInfo.volunteerInfo.surname }}</td>
                <td>{{ user.basicInfo.volunteerInfo.sex }}</td>
                <td>{{ user.basicInfo.volunteerInfo.nationality }}</td>
                <td>{{ user.basicInfo.volunteerInfo.start }}</td>
                <td>{{ user.basicInfo.volunteerInfo.end }}</td>
                <td>{{ user.basicInfo.volunteerInfo.registrationDate }}</td>
              </tr>
              <tr v-if="expandedIndex === index" :key="'expanded-' + user.userId">
                <td colspan="7">
                  <div class="expanded-info">
                    <div class="expanded-column">
                      <b>Volunteer info</b>
                      <p>Name of project: {{ user.basicInfo.hoInfo.projectName }}</p>
                      <p>Num. of project: {{ user.basicInfo.hoInfo.projectNo }}</p>
                      <p>Mail: {{ user.basicInfo.volunteerInfo.email }}</p>
                      <p>Telephone: {{ user.basicInfo.volunteerInfo.telephone }}</p>
                      <p>Place of birth: {{ user.basicInfo.volunteerInfo.placeOfBirth }}</p>
                      <p>Date of birth: {{ user.basicInfo.volunteerInfo.dateOfBirth }}</p>
                      <b>Address of the volunteer</b>
                      <p> {{ user.basicInfo.volunteerInfo.address }}</p>
                    </div>
                    <div class="expanded-column">
                      <b>Host Organization info</b>
                      <p>Name of HO: {{ user.basicInfo.hoInfo.hoName }}</p>
                      <p>Address of HO: {{ user.basicInfo.hoInfo.hoAddress }}</p>
                      <p>Web: {{ user.basicInfo.hoInfo.hoWeb }}</p>
                      <p>Telephone: {{ user.basicInfo.hoInfo.hoTelephone }}</p>
                      <p>Email: {{ user.basicInfo.hoInfo.hoEmail }}</p>
                      <p>Contact person: {{ user.basicInfo.hoInfo.hoContactPerson }}</p>
                    </div>
                    <div class="expanded-column">
                      <b>Sending Organization information</b>
                      <p>Name of SO: {{ user.basicInfo.soInfo.soName }}</p>
                      <p>Address of SO: {{ user.basicInfo.soInfo.soAddress }}</p>
                      <p>Web: {{ user.basicInfo.soInfo.soWeb }}</p>
                      <p>Telephone: {{ user.basicInfo.soInfo.soTelephone }}</p>
                      <p>Email: {{ user.basicInfo.soInfo.soEmail }}</p>
                      <p>Contact person: {{ user.basicInfo.soInfo.soContactPerson }}</p>
                    </div>
                    <br>
                    <div class="expanded-buttons">
                      <v-btn @click="showPredepartureHandle(user)" class="expandedButton" color="primary">Show Predeparture</v-btn>
                      <v-btn @click="showOnProjectHandle()" class="expandedButton" color="primary">Show On Project</v-btn>
                      <v-btn @click="showAfterProjectHandle()" class="expandedButton" color="primary">Show Evaulation</v-btn>
                    </div>


<!-- 

                    Volunteer info
Host Organization info
Sending Organization information
Name of project: Horalky 2023
Name of HO: KERIC
Name of SO: ADICE
Num. of project: NK239093480
Address of HO
Address of SO
Mail: john.doe@mail.com
Street : Nábrežie 1351
Street : Street 34
Telephone: +421 908 913 995
City : Čadca
City : Paris
Place of birth: Cadca, Slovensko
Postal code: 02201
Postal code: 02201
Date of birth: 12.12.1999
Country: Slovensko
Country: France
Address of the volunteer
Contact person: Name Surname
Contact person: Name Surname
Street : Nábrežie 1351
Telehone of CP: 9283457329847
Telehone of CP: 9283457329847
City : Čadca
Email of CP: blob@blob.sk
Email of CP: Name@adice.fr
Postal code: 02201
Web: 
Web: 
Country: Slovensko
Export volunteer data to .csv
Edit 
Delete
Export form data to .pdf


                    <p><strong>Name:</strong> {{ user.basicInfo.volunteerInfo.name }}</p>
                    <p><strong>Surname:</strong> {{ user.basicInfo.volunteerInfo.surname }}</p>
                    <p><strong>Sex:</strong> {{ user.basicInfo.volunteerInfo.sex }}</p>
                    <p><strong>Nationality:</strong> {{ user.basicInfo.volunteerInfo.nationality }}</p>
                    <p><strong>Start:</strong> {{ user.basicInfo.volunteerInfo.start }}</p>
                    <p><strong>End:</strong> {{ user.basicInfo.volunteerInfo.end }}</p>
                    <p><strong>Date of Registration:</strong> {{ user.basicInfo.volunteerInfo.registrationDate }}</p> -->
                    <!-- Ďalšie informácie a tlačidlá pre tohto používateľa -->
                    <!-- <p><strong>Additional Info:</strong> ...</p>
                    <v-btn @click="showPredepartureHandle(user)" class="">Show Predeparture</v-btn>
                    <button @click="showOnProjectHandle()">Show On Project</button>
                    <button @click="showAfterProjectHandle()">Button 3</button> -->
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <v-dialog  v-model="showModal" scrollable style="overflow: auto;">
        <v-card>
          <v-card-title>
            <span class="headline"><v-btn class="my-button" color="primary">EXPORT</v-btn></span>
          </v-card-title>
          <v-card-text>
            <showPredeparture :volunteerData="volunteerData" v-if="showPredepartureComponent"/>
            <showOnProject :volunteerData="volunteerData" v-if="showOnProjectComponent"/>
            <showAfterProject :volunteerData="volunteerData" v-if="showAfterProjectComponent"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showModal = false">Close</v-btn>
          </v-card-actions>
        </v-card>
         <!-- <template v-dialog:activator="{ on }">
          <v-btn color="primary" dark >Show Predeparture</v-btn>
        </template> -->
        <!-- <showPredeparture :volunteerData="volunteerData" v-if="showPredepartureComponent"/> -->
      </v-dialog>
    </div>
  </v-container>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { getRecords } from '/services/database.js';
import showPredeparture from '../components/adminPage/showPredeparture.vue';
import showOnProject from '../components/adminPage/showOnProject.vue';
import showAfterProject from '../components/adminPage/showAfterProject.vue';

const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
});

const users = ref([]);
const expandedIndex = ref(null);
const volunteerData = ref([]);
const showPredepartureComponent = ref(false);
const showOnProjectComponent = ref(false);
const showAfterProjectComponent = ref(false);
const showModal = ref(false);

const toggleInfo = (index) => {
  console.log('toggleInfo: ' + index)
  expandedIndex.value = expandedIndex.value === index ? null : index;
  volunteerData.value = users.value[index];
};

const loadUsers = async () => {
  users.value = await getRecords();
  console.log("Loaded users: " + users.value.length);
};

// const showModal = () => {
//   console.log('showModal');
//   return true;
// };

const resetComponentStates = () => {
  showPredepartureComponent.value = false;
  showOnProjectComponent.value = false;
  showAfterProjectComponent.value = false;
  showModal.value = false;
};

const showPredepartureHandle = () => {
  // Tu môžete umiestniť funkcionalitu pre tlačidlá
  console.log('showPredeparture');
  console.log('showPredeparture: ' + volunteerData.value.basicInfo.volunteerInfo.name);
  showPredepartureComponent.value = true;
  showOnProjectComponent.value = false;
  showAfterProjectComponent.value = false;
  showModal.value = true;

};
const showOnProjectHandle = () => {
  console.log('showOnProject');
  showOnProjectComponent.value = true;
  showPredepartureComponent.value = false;
  showAfterProjectComponent.value = false;
  showModal.value = true;
};

const showAfterProjectHandle = () => {
  console.log('showAfterProject');
  showAfterProjectComponent.value = true;
  showPredepartureComponent.value = false;
  showOnProjectComponent.value = false;
  showModal.value = true;
};

onMounted(() => {
  loadUsers();
});

console.log('Admin page');
</script>

<style >
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

.expanded-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.expanded-column {
  flex-basis: calc(33.33% - 10px);
}
.expanded-buttons {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* .expanded-buttons > * {
  margin-bottom: 10px;
} */
.expandedButton {
  flex: 1;
  padding: 1rem
}
</style>
