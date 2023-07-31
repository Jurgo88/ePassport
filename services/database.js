import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useStore } from 'vuex';
import { volunteerDataModel } from './volunteerDataModel';
import { ref } from 'vue';

const store = useStore();
//const hasBasicInfo = store.state.auth.userDetails.userData.hasBasicInfo;

const volunteerData = ref(volunteerDataModel);


const createNewRecord = async (userId, data) => {
    console.log('Create new record ' + userId + data.value);
    try {
      //const hasBasicInfo = true
      //const basicInfo = data.basicInfo;
      //hasBasicInfo = true;
      const recordsCollection = collection(db, 'records');
      //const newRecord = { userId, data, hasBasicInfo };
      await addDoc(recordsCollection, data);
      console.log('Nový záznam byl úspěšně vytvořen v databázi.');
    } catch (error) {
      console.error('Chyba při vytváření nového záznamu:', error);
    }
  };

  const getRecords = async (userId) => {
    console.log('Get records ' + userId);
    try {
        const recordsCollection = collection(db, 'records');
        const recordsSnapshot = await getDocs(recordsCollection);
        const recordsList = recordsSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data(), hasbasicInfo: doc.data().hasbasicInfo };
        });
        console.debug('Záznamy byly úspěšně načteny z databáze.');
        console.log(recordsList);
        return recordsList;
    } catch (error) {
        console.error('Chyba při načítání záznamů:', error);
    }    
  };

  const updateRecord = async (userId, data) => {
    try {
      const recordsCollection = collection(db, 'records');
      const querySnapshot = await getDocs(recordsCollection);
      
      const recordDoc = querySnapshot.docs.find((doc) => doc.data().userId === userId);
      if (recordDoc) {
        const recordRef = doc(recordsCollection, recordDoc.id);
        await updateDoc(recordRef, data);
        console.debug('Záznam bol úspešne aktualizovaný v databáze.');
      } else {
        console.warn('Nenašiel sa žiadny záznam s userId:', userId);
      }
    } catch (error) {
      console.error('Chyba pri aktualizácii záznamu podľa userId:', error);
      throw error;
    }
  };

  const updateRecordByPath = async (path, data) => {
    //toto je zatial len test
    //chcem aby sa update robil podla path
    //toto je pravdepodobne nefunkcne
    try {
      const recordsCollection = collection(db, 'records');
      const querySnapshot = await getDocs(recordsCollection);

      const recordDoc = querySnapshot.docs.find((doc) => doc.data().path === path);
      if (recordDoc) {
        const recordRef = doc(recordsCollection, recordDoc.id);
        await updateDoc(recordRef, data);
        console.debug('Záznam bol úspešne aktualizovaný v databáze.');
      } else {
        console.warn('Nenašiel sa žiadny záznam s path:', path);
      }
    } catch (error) {
      console.error('Chyba pri aktualizácii záznamu podľa path:', error);
      throw error;
    }
  };


  // Loads a volunteer's data from the database based on the volunteer's ID
const loadVolunteerDataByID = async (id) => {
  try {
    // Load the records collection from the database
    const recordsCollection = collection(db, 'records');
    const recordsSnapshot = await getDocs(recordsCollection);
    
    // Get all the records for this volunteer
    const volunteerInfo = recordsSnapshot.docs
      .filter((doc) => doc.data().userId === id)
      .map((doc) => {
        return {
          userId: doc.data().userId,
          ...doc.data(),
        };
      });

    // If this volunteer has no records, load their info from the model
    if (volunteerInfo.length === 0) {
      console.warn('Záznam nebyl nalezen. + Data budou načtena z modelu. + ' + volunteerData.value);
      volunteerData.value.userId = id;
      return volunteerData.value;
    }
    // Otherwise, load their info from the database
    else {
      volunteerData.value = volunteerInfo[0];
      console.debug('Záznam byl nalezen.');
      console.log('Volunteer data value:', volunteerData.value);
      return volunteerData.value;
    }
    
    
    
  } catch (error) {
    console.error('Chyba při načítání záznamů:', error);
    throw error;
  }
};

const loadOnProjectDataByID = async (id) => {
  console.log('sem chcem ist');
  try {
    // Load the records collection from the database
    const recordsCollection = collection(db, 'records');
    const recordsSnapshot = await getDocs(recordsCollection);
    
    // Get all the records for this volunteer
    const volunteerInfo = recordsSnapshot.docs
      .filter((doc) => doc.data().userId === id)
      .map((doc) => {
        return {
          userId: doc.data().userId,
          ...doc.data(),
        };
      });

    if (volunteerInfo.length !== 0) {
      const volunteerData = volunteerInfo[0];
      if (volunteerData.onProject) {
        console.debug('Záznam onProject bol nájdený v databáze.');
        console.log('onProject data:', volunteerData.onProject);
        return volunteerData.onProject;
      } else {
        console.warn('Objekt onProject nebol nájdený v zázname.');
        return null;
      }
    } else {
      console.warn('Záznam nebol nájdený pre dané ID.');
      return null;
    }
  } catch (error) {
    console.error('Chyba pri načítaní onProject dát:', error);
    throw error;
  }
};


export { createNewRecord, getRecords, loadVolunteerDataByID, updateRecord, updateRecordByPath, loadOnProjectDataByID };
