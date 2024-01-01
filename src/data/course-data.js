import firebaseInitialization from "../firebase/firebase.init";
import { get, getDatabase, onValue, ref } from "firebase/database";

async function getCourseData() {
  const database = getDatabase(firebaseInitialization());
  const query = ref(database, "Courses");

  try {
    const snapshot = await get(query);
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
}

export default getCourseData;