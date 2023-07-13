import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useStore } from 'vuex';
import { volunteerDataModel } from './volunteerDataModel';
import { ref } from 'vue';

const store = useStore();
//const hasBasicInfo = store.state.auth.userDetails.userData.hasBasicInfo;

const volunteerData = ref(volunteerDataModel);


const createNewRecord = async (userId, data) => {
    console.log('Create new record ' + userId + data.basicInfo);
    try {
      const hasBasicInfo = true
      const basicInfo = data.basicInfo;
      //hasBasicInfo = true;
      const recordsCollection = collection(db, 'records');
      const newRecord = { userId, basicInfo, hasBasicInfo };
      await addDoc(recordsCollection, newRecord);
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


  const loadVolunteerDataByID = async (id) => {
    try {
      const recordsCollection = collection(db, 'records');
      const recordsSnapshot = await getDocs(recordsCollection);
      
      const volunteerInfo = recordsSnapshot.docs
        .filter((doc) => doc.data().userId === id)
        .map((doc) => {
          return {
            userId: doc.data().userId,
            ...doc.data(),
            hasBasicInfo: doc.data().hasBasicInfo,
          };
        });

      if (volunteerInfo.length === 0) {
        console.warn('Záznam nebyl nalezen. + Data budou načtena z modelu. + ' + volunteerData.value.basicInfo);
        volunteerData.value.userId = id;
        return volunteerData.value;
      }
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


export { createNewRecord, getRecords, loadVolunteerDataByID, updateRecord };
