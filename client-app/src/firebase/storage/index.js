import { getStorage, ref } from "firebase/storage";
import { FirebaseApp } from '..';

const storage = getStorage(FirebaseApp);
const storageRef = ref(storage);

export const Storage = storage