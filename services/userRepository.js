import { createNewRecord } from '@service/database.js';

const userRepository = {
  async createRecord(userId, data) {
    await createNewRecord(userId, data);
  },
};

export default userRepository;
