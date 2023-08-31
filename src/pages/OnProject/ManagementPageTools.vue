<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userState = computed(() => store.state.auth.userDetails);
const uid = userState.value.userData.email;


</script>
<template>
  <v-container>
    <h1>Digital Tools for Daily Task Management:</h1>
    <br>

    <p>
      In a virtual or hybrid mobility, communication is key and will favour all project participants. Creating an Activity Log can be better valorised when it is directly shared with those in charge of your professional and pedagogical support. To simplify your work organisation and keep a high operativity, a multitude of digital tools are available on the Internet. Below you can find a list of digital tools which enable you to create a task timetable, so that all the parties can keep in touch with your schedule and stay updated on the progress that has been made.
    </p>
    <br>
    <p>
      ● Google Calendar
    </p>
    <p>
      <a href="https://workspace.google.com/intl/en/products/calendar/" target="_blank" >Google Calendar</a> allows you to create and modify a virtual calendar that you can access from any place and/or mobile device with internet access. This organisational tool enables the user to easily manage appointments, have a clear overview, setup meetings and recurrences and share appointments.
    </p>
    <br>
    <p>
      ● Google Tasks
    </p>
    <p>
      <a href="https://workspace.google.com/intl/en/products/calendar/" target="_blank" >Google Tasks</a> is another tool already integrated in Google Calendar, but also used within the desktop & Gmail or the Google Tasks app. This tool gives the opportunity to integrate emails in the to-do-list and also to arrange the order of the user’s tasks regarding their priorities and check off completed ones.
    </p>
    <br>
    <p>
      ● Google Drive
    </p>
    <p>
      <a href="https://www.google.com/intl/en-GB/drive/" target="_blank" >Google Drive</a> is the internet data storage service provided by Google, allowing its users to create folders to store and upload files of any type. This tool is user-friendly for students, researchers, administrative staff, etc. It allows them to create documents in different formats, work online on the same file from any device simply by accessing the cloud through their email.
    </p>
    <br>
    <p>
      ● Trello
    </p>
    <p>
      <a href="https://trello.com/" target="_blank" >Trello</a> is another application used for managing tasks. It allows group work to be organized in a collaborative way by means of virtual boards made up of lists of tasks in the form of columns. Trello lists all the tasks that make up a mobility and places them in three columns according to their status:
    </p>
    <br>
    <ul>
      <li>1st column: To do</li>
      <li>2nd column: Doing</li>
      <li>3rd column: Done</li>
    </ul>
    <br>
    <p>
      ● Notion
    </p>
    <p>
      <a href="https://www.notion.so/" target="_blank" >Notion</a> is another convenient tool that allows to set up a system of organisation and help to organize life and work better, by bringing together different project management tools.
    </p>
    <p>
      You can use Notion to keep track of things you do in your work. For example, here are some ways you can use Notion:
    </p>
    <br>
    <ul>
      <li>Track goals.</li>
      <li>Create design systems.</li>
      <li>Create a weekly agenda.</li>
      <li>Track and manage content.</li>
      <li>Manage complex projects.</li>
    </ul>
    <br>
    <p>
      ● Basecamp and Freedcamp
    </p>
    <p>
      <a href="https://basecamp.com/" target="_blank" >Basecamp</a> and <a href="https://freedcamp.com/" target="_blank" >Freedcamp</a> are both project management tools that provide a productive work environment and foster communication within 2 or more participants. These two project management softwares help organise teams to plan projects, manage resources, adjust schedules, and improve team collaboration.
    </p>
    <br>
    <p>
      Similarly to Basecamp, <a href="https://freedcamp.com/" target="_blank" >Freedcamp</a> provides a centralised system for project management filled with innovative and intuitive tools and features. It streamlines team communication, task management, and time management to make businesses more efficient in their day-to-day operations. Freedcamp could offer the Hosting organisation and Sending Organisation an easy solution to stay in touch with the VET participant’s activities.
    </p>
    <br>
    <p>
      ● Planner Microsoft
    </p>
    <p>
      <a href="https://www.microsoft.com/en-us/microsoft-365/business/task-management-software" target="_blank" >Microsoft Planner</a> is a team-work oriented tool that can be used in a variety of ways to keep a constant communication between sending, hosting and the VET mobility participant. Planner Microsoft includes team management, file sharing, and organisation.
    </p>
    <br>
    <br>
    <hr>
    <br>
    <router-link :to="{
                path: '/project' 
            }" >
      <v-btn block color="secondary" class="my-button">BACK</v-btn>
    </router-link>

  </v-container>
</template>