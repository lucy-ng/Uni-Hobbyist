import { initializeApp, getApps, getApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
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
import { createEventSucessToast, errorToast } from "@/components/Toast";

export type Account = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  tags?: string[];
  timeCreated: string;
  dateCreated: string;
  maxTickets: number;
  bookedTickets: number;
};

export type Booking = {
  accountId: string;
  timeBooked: string;
  dateBooked: string;
  eventId: string;
};

const firebaseConfig = {
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL ?? "",
  appId: process.env.EXPO_PUBLIC_ANDROID_APP_ID ?? "",
  apiKey: process.env.EXPO_PUBLIC_WEB_API_KEY ?? "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);

export const auth = !getAuth.length
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

// export const sendEmail = (emailValue: string) => {
//   sendSignInLinkToEmail(auth, emailValue, actionCodeSettings)
//     .then(() => {
//       // sessionStorage.setItem("emailForSignIn", emailValue);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });
// };

// export const verifyEmail = async (emailValue: string) => {
//   const emailLink = (await Linking.getInitialURL()) ?? "";
//   if (isSignInWithEmailLink(auth, emailLink)) {
//     signInWithEmailLink(auth, emailValue, emailLink)
//       .then(() => {
//         // sessionStorage.setItem("emailForSignIn", emailValue);
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//   }
// };

/*
Google LLC, 2024. Read and Write Data on the Web. [Online] 
Available at: https://firebase.google.com/docs/database/web/read-and-write
[Accessed 14 March 2024].
*/

export const createEventInfo = (accountId: string, event: Event) => {
  set(ref(db, "events/" + event.id), {
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    description: event.description || "",
    tags: event.tags || [],
    timeCreated: event.timeCreated,
    dateCreated: event.dateCreated,
    maxTickets: event.maxTickets,
    bookedTickets: event.bookedTickets,
  }).catch((error: any) => {
    console.error(error);
    errorToast();
  });

  set(ref(db, "bookings/" + accountId), {
    eventId: event.id,
    dateBooked: "",
    timeBooked: "",
  })
    .then(() => {
      createEventSucessToast();
    })
    .catch((error: any) => {
      console.error(error);
      errorToast();
    });
};

export const updateEventInfo = () => {};
export const deleteEventInfo = () => {};

export const updateAccountInfo = () => {};
export const deleteAccountInfo = () => {};

export const bookEvent = () => {};
