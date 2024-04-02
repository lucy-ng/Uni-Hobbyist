import { initializeApp, getApps, getApp } from "firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { v4 as uuid } from "uuid";
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
import {
  createEventSuccessToast,
  deleteEventSuccessToast,
  errorToast,
} from "@/components/Toast";

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
  date_time: string;
  location: string;
  description?: string;
  tags?: string[];
  time_updated: string;
  date_updated: string;
  max_tickets: number;
  booked_tickets: number;
};

export type Booking = {
  id: string;
  account_id: string;
  time_booked: string;
  date_booked: string;
  event_id: string;
};

const firebaseConfig = {
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL ?? "",
  appId: process.env.EXPO_PUBLIC_ANDROID_APP_ID ?? "",
  apiKey: process.env.EXPO_PUBLIC_WEB_API_KEY ?? "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID ?? "",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getDatabase(app);
export const dbRef = ref(getDatabase());

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
    date_time: event.date_time,
    location: event.location,
    description: event.description || "",
    tags: event.tags || [],
    time_updated: event.time_updated,
    date_updated: event.date_updated,
    max_tickets: event.max_tickets,
    booked_tickets: event.booked_tickets,
  }).catch((error: any) => {
    console.error(error);
    errorToast();
  });

  set(ref(db, "bookings/" + uuid()), {
    account_id: accountId,
    event_id: event.id,
    date_booked: "",
    time_booked: "",
  })
    .then(() => {
      createEventSuccessToast();
    })
    .catch((error: any) => {
      console.error(error);
      errorToast();
    });
};

export const fetchEvents = () => {
  let eventsList: Event[] = [];

  get(child(dbRef, `events`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        for (let i = 0; i < Object.keys(data).length; i++) {
          let id = [Object.keys(data)[i]][0];
          eventsList.push(data[Object.keys(data)[i]] as Event);
          eventsList[i].id = id;
        }
        return eventsList;
      } else {
        return eventsList;
      }
    })
    .catch((error) => {
      console.error(error);
      errorToast();
      return eventsList;
    });
  return eventsList;
};

export const fetchBookings = (accountId: string) => {
  let bookingsList: Event[] = [];

  get(child(dbRef, `bookings`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let i = 0; i < Object.keys(data).length; i++) {
          let id = data[Object.keys(data)[i]].account_id;
          if (id == accountId) {
            let eventId = data[Object.keys(data)[i]].event_id;

            get(child(dbRef, `events/${eventId}`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val();
                  bookingsList.push(data as Event)
                } else {
                  errorToast();
                }
              })
              .catch((error) => {
                console.error(error);
                errorToast();
              });
          }
        }
        return bookingsList;
      } else {
        return bookingsList;
      }
    })
    .catch((error) => {
      console.error(error);
      errorToast();
      return bookingsList;
    });
  return bookingsList;
};

export const deleteEventInfo = (eventId: string) => {
  get(child(dbRef, `bookings`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        for (let i = 0; i < Object.keys(data).length; i++) {
          let id = data[Object.keys(data)[i]].event_id;
          if (id == eventId) {
            remove(ref(db, "bookings/" + Object.keys(data)[i]))
              .then(() => {
                remove(ref(db, "events/" + eventId))
                  .then(() => {
                    deleteEventSuccessToast();
                  })
                  .catch((error) => {
                    errorToast();
                  });
              })
              .catch((error) => {
                errorToast();
              });
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
      errorToast();
    });
};

export const updateAccountInfo = () => {};
export const deleteAccountInfo = () => {};

export const bookEvent = () => {};
