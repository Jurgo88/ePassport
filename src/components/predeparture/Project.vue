<script setup>
import { getStorage, ref, uploadBytes, listAll } from 'firebase/storage';
import { storage, firebaseAuth } from '../../../firebase/config';


//const storage = getStorage(firebaseApp);
let selectedFile = null;
const user = firebaseAuth.currentUser;
const userEmail = user.email;

console.log('storage: ', storage);

async function loadFileNames() {
  try {
    const user = firebaseAuth.currentUser;
    if(!user) {
      console.error('Neprihlásený používateľ');
      return;
    }
    else{  
        const token = await user.getIdToken();      
        const storageRef = ref(storage);
        const files = await listAll(storageRef, { idToken: token });
        const fileNames = files.items.map((file) => file.name);
        console.log('Názvy súborov:', fileNames);
    }
  } catch (error) {
    console.error('Chyba pri načítaní súborov:', error);
  }
}

loadFileNames();

function handleFileChange(event) {
  selectedFile = event.target.files[0];
}

async function uploadFile(file) {
  const storageRef = ref(storage, userEmail +'/CV/'+ file.name);
  
  try {
    await uploadBytes(storageRef, file);
    console.log('Súbor bol úspešne nahraný na Firebase Storage.');
  } catch (error) {
    console.error('Chyba pri nahrávaní súboru:', error);
  }
}

function uploadSelectedFile() {
  if (selectedFile) {
    uploadFile(selectedFile);
  }
}
</script>
<template>
    <div>
      <h1>Upload File</h1>
      <input type="file" @change="handleFileChange" accept=".pdf,.doc,.docx">
      <button @click="uploadSelectedFile" >Upload</button>
    </div>
  </template>