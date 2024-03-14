import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
} from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL ?? "",
  appId: process.env.EXPO_PUBLIC_APP_ID ?? "",
  apiKey: process.env.EXPO_PUBLIC_API_KEY ?? "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const auth =
  getAuth.length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth();

/*
Google LLC, 2024. Authenticate with Firebase Using Email Link in JavaScript. [Online] 
Available at: https://firebase.google.com/docs/auth/web/email-link-auth
[Accessed 14 March 2024].
 */

export const sendEmail = (emailValue: string) => {
  const credential = EmailAuthProvider.credentialWithLink(
    emailValue,
    window.location.href
  );

  if (auth.currentUser) {
    linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {})
    .catch((error) => {});
  }
};

export const saveCode = (emailValue: string) => {
  const codeValue = String(Math.floor(1000 + Math.random() * 9000));

  set(ref(db, "verifications/" + emailValue.replace(/\./g, ",")), {
    email: emailValue,
    code: codeValue,
  });

  return codeValue;
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
  return "";
};

export const loginUser = (emailValue: string) => {
  const userRef = ref(db, "users/" + emailValue.replace(/\./g, ","));
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};
