import { getAuth } from 'firebase/auth';
import { updateRecord } from '/services/database.js';
import { ref } from 'vue';

const sendData = async (volunteerData) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;
  

  console.log('Sending data to database:', volunteerData);

  try {
    await updateRecord(email, volunteerData);
    console.log('Data was successfully sent to the database.');
  } catch (error) {
    console.error('Error while sending data to the database:', error);
  }
};

export default sendData;
