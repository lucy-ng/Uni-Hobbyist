import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  ActionCodeSettings,
} from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL ?? "",
  appId: process.env.EXPO_PUBLIC_APP_ID ?? "",
  apiKey: process.env.EXPO_PUBLIC_API_KEY ?? "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
export const auth =
  getAuth.length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth();

/* 
Invertase Limited, 2024. auth [Online] 
Available at: https://rnfirebase.io/reference/auth
[Accessed 15 March 2024].
*/
/*
Google LLC, 2024. Authenticate with Firebase Using Email Link in JavaScript. [Online] 
Available at: https://firebase.google.com/docs/auth/web/email-link-auth
[Accessed 15 March 2024].
*/
/*
kidroca, 2020. How to setup sendSignInLinkToEmail() from Firebase in react-native? [Online] 
Available at: https://stackoverflow.com/questions/61564203/how-to-setup-sendsigninlinktoemail-from-firebase-in-react-native
[Accessed 15 March 2024].
*/

export const sendSignInLink = async (emailValue: string) => {
  const actionCodeSettings: ActionCodeSettings = {
    url:
      "https://final-year-project-b45b9.firebaseapp.com/?email=" +
      firebase.auth().currentUser?.email,
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.anonymous.finalyearproject",
    },
    android: {
      packageName: "com.anonymous.finalyearproject",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "unihobbyist.page.link",
  };

  await AsyncStorage.setItem("emailForSignIn", emailValue);

  await firebase.auth().sendSignInLinkToEmail(emailValue, actionCodeSettings);
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

export const loginUser = (emailValue: string) => {
  const userRef = ref(db, "users/" + emailValue.replace(/\./g, ","));
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};
