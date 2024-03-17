import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

const firebaseConfig = {
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL ?? "",
  appId: process.env.EXPO_PUBLIC_ANDROID_APP_ID ?? "",
  apiKey: process.env.EXPO_PUBLIC_WEB_API_KEY ?? "",
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

const actionCodeSettings = {
  url: process.env.EXPO_PUBLIC_ACTION_CODE_URL ?? "",
  handleCodeInApp: true,
  iOS: {
    bundleId: process.env.EXPO_PUBLIC_IOS_BUNDLE_ID ?? "",
  },
  android: {
    packageName: process.env.EXPO_PUBLIC_ANDROID_PACKAGE_NAME ?? "",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: process.env.EXPO_PUBLIC_DYNAMIC_LINK_DOMAIN ?? "",
};

/*
Google LLC, 2024. Authenticate with Firebase Using Email Link in Android. [Online] 
Available at: https://firebase.google.com/docs/auth/android/email-link-auth
[Accessed 16 March 2024].
*/

export const sendEmail = (emailValue: string) => {
  sendSignInLinkToEmail(auth, emailValue, actionCodeSettings)
    .then(() => {
      // sessionStorage.setItem("emailForSignIn", emailValue);
      console.log("sent verification email");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const verifyEmail = async (emailValue: string) => {
  const emailLink = (await Linking.getInitialURL()) ?? "";
  if (isSignInWithEmailLink(auth, emailLink)) {
    signInWithEmailLink(auth, emailValue, emailLink)
      .then(() => {
        // sessionStorage.setItem("emailForSignIn", emailValue);
        console.log("sent verification email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
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

export const updateUser = () => {};
export const createEventInfo = () => {};
export const updateEventInfo = () => {};
export const deleteEventInfo = () => {};
export const bookEvent = () => {};
export const updateEvent = () => {};
export const deleteEvent = () => {};
export const searchEvent = () => {};
