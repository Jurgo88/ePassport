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
  if (expandedUser.value && expandedUser.value.id === userId) {
    expandedUser.value = null;
  } else {
    expandedUser.value = users.value.find((user) => user.id === userId);
  }
};

const loadUsers = async () => {
  users.value = await getRecords();
  console.log("co tu ma byt ? " + users.value[1].data.name);
  console.log("idtu ma byt ? " + users.value[1].id);
};

onMounted(() => {
  loadUsers();
});


console.log('Admin page');
</script>
<template>
    <div class="container mx-auto">
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
            <tr v-for="(user, index) in users" :key="index" @click="toggleInfo(index)">
              <td>{{ user.data.name}}</td>
              <td>{{ user.data.surname }}</td>
              <td>{{ user.sex }}</td>
              <td>{{ user.nationality }}</td>
              <td>{{ user.start }}</td>
              <td>{{ user.end }}</td>
              <td>{{ user.registrationDate }}</td>
            </tr>
            <tr v-if="expandedUser" :key="expandedUser.id">
              <td colspan="7">
                <div class="expanded-info">
                  <p><strong>Name:</strong> {{ expandedUser.name }}</p>
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