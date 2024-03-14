import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://final-year-project-b45b9-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const saveCode = (emailValue: string) => {
  const codeValue = String(Math.floor(1000 + Math.random() * 9000));

  set(ref(db, "verifications/" + emailValue.replace(/\./g, ",")), {
    email: emailValue,
    code: codeValue,
  });

  return codeValue
};

/*
Google LLC, 2024. Read and Write Data on the Web. [Online] 
Available at: https://firebase.google.com/docs/database/web/read-and-write
[Accessed 14 March 2024].
*/
export const registerUser = (
  emailValue: string,
  firstName: string,
  lastName: string,
  university: string,
  password: string
) => {
  set(ref(db, "users/" + emailValue.replace(/\./g, ",")), {
    first_name: firstName,
    last_name: lastName,
    email: emailValue,
    university: university,
    password: password,
  });
};

export const getCode = (emailValue: string) => {
  const verificationRef = ref(
    db,
    "verifications/" + emailValue.replace(/\./g, ",")
  );
  onValue(verificationRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return String(data);
  });
  return ""
};

export const loginUser = (emailValue: string) => {
  const userRef = ref(db, "users/" + emailValue.replace(/\./g, ","));
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};