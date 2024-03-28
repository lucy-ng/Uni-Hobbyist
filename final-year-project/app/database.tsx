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
import { errorToast } from "@/components/Toast";

export type Account = {
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

const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getDatabase(app);
export const auth =
  getAuth.length == 0
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

export function fetchUserDetails(): Account {
  const dbRef = ref(getDatabase());
  const id = auth.currentUser ? auth.currentUser.uid : "";

  get(child(dbRef, `accounts/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const data = snapshot.val();
        const account: Account = {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          university: data.university,
        };
        return account;
      } else {
        errorToast();
        return {} as Account;
      }
    })
    .catch((error) => {
      console.error(error);
      errorToast();
      return {} as Account;
    });
  return {} as Account;
}

export const updateUser = (account: Account) => {};

export const createEventInfo = (account: Account, event: Event) => {
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
  });

  set(ref(db, "bookings/" + account), {
    eventId: event.id,
    dateBooked: "",
    timeBooked: "",
  });
};

export const updateEventInfo = () => {};
export const deleteEventInfo = () => {};

export const bookEvent = (event: Event, account: Account) => {};

export const updateEvent = () => {};
export const deleteEvent = () => {};

export const searchEvent = (filters: string[], searchValue: string) => {
  const eventsRef = ref(db, "posts");
  onValue(eventsRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};
