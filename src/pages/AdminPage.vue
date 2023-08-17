<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { getRecords } from '/services/database.js';

const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
});

const users = ref([]);
const expandedUser = ref(null);

const toggleInfo = (userId) => {
  if (expandedUser.value && expandedUser.value.userId === userId) {
    expandedUser.value = null;
  } else {
    expandedUser.value = users.value.find((user) => user.userId === userId);
  }
};

const loadUsers = async () => {
  users.value = await getRecords();
  console.log("Load users : "+users.value.length)
  // console.log("co tu ma byt ? " + users.value[1].data.name);
  // console.log("idtu ma byt ? " + users.value[1].id);
};

onMounted(() => {
  loadUsers();
});


console.log('Admin page');
</script>
<template>
  <v-container>
    
    <div class="mx-auto">
      <div class="w-full text-center">
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
            <tr v-for="(user, index) in users" :key="index" @click="toggleInfo(user.userId)">
              <td>{{ user.basicInfo.volunteerInfo.name}}</td>
              <td>{{ user.basicInfo.volunteerInfo.surname }}</td>
              <td>{{ user.basicInfo.volunteerInfo.sex }}</td>
              <td>{{ user.basicInfo.volunteerInfo.nationality }}</td>
              <td>{{ user.basicInfo.volunteerInfo.start }}</td>
              <td>{{ user.basicInfo.volunteerInfo.end }}</td>
              <td>{{ user.basicInfo.volunteerInfo.registrationDate }}</td>
            </tr>
            <tr v-if="expandedUser" :key="expandedUser.userId">
              <td colspan="7">
                <div class="expanded-info">
                  <p><strong>Name:</strong> {{ expandedUser.basicInfo.volunteerInfo.name }}</p>
                  <p><strong>Surname:</strong> {{ expandedUser.surname }}</p>
                  <p><strong>Sex:</strong> {{ expandedUser.sex }}</p>
                  <p><strong>Nationality:</strong> {{ expandedUser.nationality }}</p>
                  <p><strong>Start:</strong> {{ expandedUser.start }}</p>
                  <p><strong>End:</strong> {{ expandedUser.end }}</p>
                  <p><strong>Date of Registration:</strong> {{ expandedUser.registrationDate }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-container>
  </template>

<style scoped>
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
  margin-top: 10px;
}
</style>