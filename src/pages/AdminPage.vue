<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  userState: {
    type: Object,
    required: true,
  },
});

const users = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    sex: 'Male',
    nationality: 'American',
    start: '2023-01-01',
    end: '2023-12-31',
    registrationDate: '2023-05-01',
  },
  {
    id: 2,
    name: 'Jane',
    surname: 'Doe',
    sex: 'Female',
    nationality: 'British',
    start: '2023-02-01',
    end: '2023-11-30',
    registrationDate: '2023-05-02',
  },
  {
    id: 3,
    name: 'Bob',
    surname: 'Smith',
    sex: 'Male',
    nationality: 'Canadian',
    start: '2023-03-01',
    end: '2023-10-31',
    registrationDate: '2023-05-03',
  },
];

const expandedUser = ref(null);

const toggleInfo = (userId) => {
  if (expandedUser.value && expandedUser.value.id === userId) {
    expandedUser.value = null;
  } else {
    expandedUser.value = users.find((user) => user.id === userId);
  }
};

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
            <tr v-for="user in users" :key="user.id" @click="toggleInfo(user.id)">
              <td>{{ user.name }}</td>
              <td>{{ user.surname }}</td>
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