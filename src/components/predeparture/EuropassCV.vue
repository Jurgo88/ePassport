<script setup>
// import { ref, onMounted  } from 'vue';
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { storage, firebaseAuth } from '../../../firebase/config';

const volunteerData = ref(props.volunteerData);

let selectedFile = null;
const user = firebaseAuth.currentUser;
const userEmail = user.email;

const props = defineProps({
  volunteerData: {
    type: Object,
    required: true,
  },
});

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
    console.log('uploadSelectedFile');
  if (selectedFile) {
    uploadFile(selectedFile);
  }
}

</script>
<template>
    <v-container class="mobile-first-container">
            <h1>Europass CV</h1>
        <br>
        <br>
        <p class="subheading">The objectives of this sheet are to :</p>
        <br>
        <p>
            <ul>
                <li>Give you detailed instructions for using the Europass curriculum vitae Help you enhance your career path</li>
                <li>Help and accompany you in defining your project </li>
                <li>Allow you to list your skills and experience </li>
                <li>Help you enhance your career path</li>
            </ul>
        </p>
        <br>  
        <p class="subheading">Instruction and practical details</p>
        <br>
        <p>
            <ul>
                <li>Use the online interface or download the Word format of the Europass CV</li>
                <li>Write the CV in English and complete it with as many details as possible</li>
                <li>Send it by e-mail to your project manager, along with the cover letter and the language test.</li>
            </ul>
        </p>
        <br>
        <p class="subheading">HOW TO WRITE YOUR EUROPASS CURRICULUM VITAE?</p>
        <br>
        <p>
            Go to the website: <a href="https://europass.cedefop.europa.eu/editors/en/cv/compose">https://europass.cedefop.europa.eu/</a>
        </p>
        <br>
        <p>
            <ul>
                <li>(a) use the interface proposed in the language of your choice on the Europass website 
                    <a href="http://europass.cedefop.europa.eu" key="">( europass.cedefop.europa.eu )</a>. Then you can save your CV in the directory of your choice </li>
                <li>(b) or download the template (in Word or Open Document format) in the language of your choice from the same site and save it on your computer's hard drive; you can then complete the various sections of the right-hand column by entering your personal data and deleting unnecessary fields.</li>
           </ul>
        </p>
        To help you, Consult the examples of CVs on the site:
        <br>
        <a href="http://europass.cedefop.europa.eu/en/documents/curriculum-vitae/examples">http://europass.cedefop.europa.eu/en/documents/curriculum-vitae/examples</a> 
        <br>
        <p class="subheading">Watch the video tutorial on:</p>
        <br>
        <a href="https://www.youtube.com/watch?v=qC1Re9OmhTA">youtube.com/watch?v=qC1Re9OmhTA </a> 
        <br>
        <br>
        <p class="subheading">Important:</p>
        <br>

        do not modify the text in the left column; respect the layout of the template, as well as the font used.
        <br>
        <br>
        <h3>TIPS for a cover letter (included with your CV):</h3>
        <br>
        <ul>
            <li>Present yourself (briefly, the objective is not to put your CV in your letter) </li>
            <li>Explain why the organization/company is interesting for you. Write one paragraph about how your competences will be useful for the organisation
        </li>
        </ul>

        <br>
        <br>
        <div align="center">
            <v-btn 
            color="primary"
            @click="uploadSelectedFile"
            >
                Upload your Europass CV
            </v-btn>
            <input type="file" @change="handleFileChange" />
        </div>


    </v-container>
</template>

<style>
.subheading {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0;
    color: #0c2f6b;
    text-transform: uppercase;
}
ul {
    list-style-type: disc;
    margin: 0 20px;
    padding: 0;
}
a{
    color: #0c2f6b;
    text-decoration: underline;
}
</style>