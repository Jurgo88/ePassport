<template>
  <v-container>
    <div class="mx-auto">
      <div class="w-full">
        <h1>Admin Page</h1>
        <br>
        <div class="export-btn" >
          <v-btn @click="exportToCSV2()" color="primary" >Export to CSV</v-btn>
        </div>
        <br>
        <br>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Sex</th>
              <th>Nationality</th>
              <th>Start</th>
              <th>End</th>
              <!-- <th>Date of Registration</th> -->
            </tr>
          </thead>
          <tbody>
            <template v-for="(user, index) in users" :key="index" >
              <tr @click="toggleInfo(index)" class="text-center">
                <td>
                  <!-- Add a checkbox input with a v-model -->
                  <input type="checkbox" v-model="user.selected" @click.stop /><span> - </span>
                  <v-btn @click.stop="deleteUserHandle(user)" color="error" >Delete</v-btn>
                </td>
                <td >{{ user.basicInfo.volunteerInfo.name }}</td>
                <td>{{ user.basicInfo.volunteerInfo.surname }}</td>
                <td>{{ user.basicInfo.volunteerInfo.sex }}</td>
                <td>{{ user.basicInfo.volunteerInfo.nationality }}</td>
                <td>{{ user.basicInfo.volunteerInfo.start }}</td>
                <td>{{ user.basicInfo.volunteerInfo.end }}</td>
                <!-- <td>{{ user.basicInfo.volunteerInfo.registrationDate }}</td> -->
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
                    <br>
                    <hr>

                    <br>
                    <div class="expanded-buttons">
                      <v-btn @click="showPredepartureHandle(user)" class="expandedButton" color="primary">Show Predeparture</v-btn>
                      <v-btn @click="showOnProjectHandle()" class="expandedButton" color="primary">Show On Project</v-btn>
                      <v-btn @click="showAfterProjectHandle()" class="expandedButton" color="primary">Show Evaulation</v-btn>
                      <v-btn v-if="hasCV" @click="downloadCV()" class="expandedButton" color="primary" >Open CV</v-btn>
                      <!-- <v-btn @click="exportToPDF()" class="expandedButton" color="primary">Export to PDF</v-btn> -->
                      <!-- <v-btn @click="exportToCSV()" class="expandedButton" color="primary">Export to CSV</v-btn> -->
                    </div>


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
            <span class="headline">
              <v-btn class="my-button" color="primary" @click="exportToPDF" >EXPORT to PDF</v-btn>
              <!-- <v-btn class="my-button" color="primary" @click="exportToCSV" >EXPORT to CSV</v-btn> -->
            </span>
          </v-card-title>
          <v-card-text id="export-element">
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
import html2pdf from 'html2pdf.js';
import Papa from 'papaparse';
import showPredeparture from '../components/adminPage/showPredeparture.vue';
import showOnProject from '../components/adminPage/showOnProject.vue';
import showAfterProject from '../components/adminPage/showAfterProject.vue';
import { questions } from '../../services/questions.js';
import { deleteUser } from 'firebase/auth';
import { ref as storageRef, getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as dbRef, remove } from 'firebase/database';
import { db, storage } from '../../firebase/config';


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
const hasCV = ref(false);

const toggleInfo = (index) => {
  console.log('toggleInfo: ' + index)
  console.log(volunteerData.value);
  console.log('volunteerData.value: ' + volunteerData.value);

  expandedIndex.value = expandedIndex.value === index ? null : index;
  volunteerData.value = users.value[index];
  console.log('volunteerData.value: ' + volunteerData.value);
  console.log('volunteerData.value.basicInfo.volunteerInfo.name: ' + volunteerData.value.basicInfo.volunteerInfo.name);
  if(volunteerData.value.beforeProject.europassCV)
  {
    hasCV.value = true;
  }
  else{
    hasCV.value = false;
  }
  console.log('hasCV: ' + hasCV.value);
};

const loadUsers = async () => {
  users.value = await getRecords();
  console.log("Loaded users: " + users.value.length);
};




const deleteUserHandle = async (user) => {
  console.log('deleteUser: ' + user.id);
  const currentUser = props.userState.userData.uid;
  console.log('user: ' + currentUser);
  if (confirm('Are you sure you want to delete this user?') == true) {
    await deleteUserRecords(user.id);
    loadUsers();
  }
  else{
    console.log('cancel');
  }
};

const deleteUserRecords = async (userId) => {
  console.log('deleteUserRecords: ' + userId);
  const thisDbRef = ref(db, 'records/' + userId);
  try {
    await remove(thisDbRef);
    console.log(thisDbRef);
    console.log('Data byla úspěšně smazána z Realtime Database.');
  } catch (error) {
    console.error('Chyba při mazání dat z Realtime Database:', error);
  }
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

const exportToPDF = () => {
  console.log('showPredepartureComponent.value '+ showPredepartureComponent.value );
  console.log('showOnProjectComponent.value '+ showOnProjectComponent.value );
  console.log('showAfterProjectComponent.value '+ showAfterProjectComponent.value );
  let filename = 'volunteer.pdf';

  if(showPredepartureComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_predeparture.pdf';
  }
  if(showOnProjectComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_onProject.pdf';
  }
  if(showAfterProjectComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_evaulation.pdf';
  }
  console.log('filename: ' + filename);
  html2pdf(document.getElementById('export-element'),{
    margin: 10,
    filename: filename,
  });      
};


// function assignAnswersToQuestions(questions, answers) {
//   for (const key in questions) {
//     if (typeof questions[key] === 'object' && typeof answers[key] === 'object') {
//       assignAnswersToQuestions(questions[key], answers[key]);
//     } else if (answers[key] !== undefined) {
//       questions[key] = answers[key];
//     }
//   }
// }


function mergeQuestionsAndAnswers(questions, answers) {
    var mergedData = {};
    
    for (var key in questions) {
        if (typeof questions[key] === 'object') {
            mergedData[key] = mergeQuestionsAndAnswers(questions[key], answers[key]);
        } else {
            mergedData[key] = {
                question: questions[key],
                answer: answers[key]
            };
        }
    }
    
    return mergedData;
}

//
//console.log(JSON.stringify(mergedObj, null, 4));

// const exportToCSV2 = () =>{ 
//   if (confirm('Are you sure you want to export to CSV?') == true) {
//     console.log('ok');
//     const selectedUsers = this.users.filter(user => user.selected);
//     console.log('Selected Users:', selectedUsers);
//   }
//   else{
//     console.log('cancel');
//   }
// }

const exportToCSV2 = () => {
  // Získání vybraných uživatelů
  const selectedUsers = users.value.filter(user => user.selected);

  if (selectedUsers.length === 0) {
    alert('No volunteer selected.');
    return;
  }

  // Příprava dat pro CSV
  const csvData = [];
  const headers = ['Name', 'Surname', 'Sex', 'Nationality', 'Start', 'End', 'Project', 'Number of project', 'Mail', 'Telephone', 'Place of birth', 'Date of birth', 'Address', 'Name of HO', 'Address of HO', 'Web', 'Telephone', 'Email', 'Contact person', 'Name of SO', 'Address of SO', 'Web', 'Telephone', 'Email', 'Contact person'];

  // Přidání záhlaví CSV
  csvData.push(headers);

  // Přidání údajů vybraných uživatelů
  selectedUsers.forEach(user => {
    const userData = [
      user.basicInfo.volunteerInfo.name,
      user.basicInfo.volunteerInfo.surname,
      user.basicInfo.volunteerInfo.sex,
      user.basicInfo.volunteerInfo.nationality,
      user.basicInfo.volunteerInfo.start,
      user.basicInfo.volunteerInfo.end,
      user.basicInfo.hoInfo.projectName,
      user.basicInfo.hoInfo.projectNo,
      user.basicInfo.volunteerInfo.email,
      user.basicInfo.volunteerInfo.telephone,
      user.basicInfo.volunteerInfo.placeOfBirth,
      user.basicInfo.volunteerInfo.dateOfBirth,
      user.basicInfo.volunteerInfo.address,
      user.basicInfo.hoInfo.hoName,
      user.basicInfo.hoInfo.hoAddress,
      user.basicInfo.hoInfo.hoWeb,
      user.basicInfo.hoInfo.hoTelephone,
      user.basicInfo.hoInfo.hoEmail,
      user.basicInfo.hoInfo.hoContactPerson,
      user.basicInfo.soInfo.soName,
      user.basicInfo.soInfo.soAddress,
      user.basicInfo.soInfo.soWeb,
      user.basicInfo.soInfo.soTelephone,
      user.basicInfo.soInfo.soEmail,
      user.basicInfo.soInfo.soContactPerson,
    ];

    csvData.push(userData);
  });

  // Převedení na CSV řetězec
  const csvString = Papa.unparse(csvData);

  // Otevřít CSV v novém okně nebo uložit na serveru
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'selected_users.csv';
  a.click();

  window.URL.revokeObjectURL(url);
};

const exportToCSV = () =>{
  console.log('exportToCSV');
  let filename = 'volunteer.csv';
  let answers = volunteerData.value;
  var mergedObj = mergeQuestionsAndAnswers(questions, answers);

  const mergedJSON = JSON.stringify(mergedObj, null, 4);
  const csvData = Papa.parse(mergedJSON);

  if(showPredepartureComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_predeparture.csv';
  }
  else if(showOnProjectComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_onProject.csv';
  }
  else if(showAfterProjectComponent.value){
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_evaulation.csv';
  }
  else{
    filename = volunteerData.value.basicInfo.volunteerInfo.surname + '.csv';
  }
  console.log('filename: ' + filename); 
};

const downloadCV = () =>{
  console.log("Download CV");
  let filename = volunteerData.value.basicInfo.volunteerInfo.surname + '_CV.pdf';


  const thisIsStorageRef = storageRef(storage, volunteerData.value.beforeProject.europassCV);
  getDownloadURL(thisIsStorageRef)
    .then((url) => {
      console.log('downloadCV' + url);
      window.open(url, '_blank');
    })
    .catch((error) => {
      console.error('Chyba pri sťahovaní súboru:', error);
    });

}

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
<style src="../css/checkbox.css"></style>
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
  padding: 2em 0 !important;
}
/* .expanded-buttons > * {
  margin-bottom: 10px;
} */
.expandedButton {
  flex: 1;
  margin-right: 5px;
}
</style>
