import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useStore } from 'vuex';

const store = useStore();
//const hasBasicInfo = store.state.auth.userDetails.userData.hasBasicInfo;

const createNewRecord = async (userId, data) => {
    console.log('Create new record ' + userId + data.value);
    try {
      const hasBasicInfo = true
      //hasBasicInfo = true;
      const recordsCollection = collection(db, 'records');
      const newRecord = { userId, data, hasBasicInfo };
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
            return { id: doc.id, ...doc.data(), hasbasicInfo: doc.data().hasBasicInfo };
        });
        console.log('Záznamy byly úspěšně načteny z databáze.');
        console.log(recordsList);
        return recordsList;
    } catch (error) {
        console.error('Chyba při načítání záznamů:', error);
    }
};

export { createNewRecord, getRecords };
