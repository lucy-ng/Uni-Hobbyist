import { initializeApp, getApps, getApp } from "firebase/app";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  bookEventErrorToast,
  bookEventSuccessToast,
  createEventSuccessToast,
  deleteBookingErrorToast,
  deleteBookingSuccessToast,
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
  date_time_updated: string;
  max_tickets: number;
  booked_tickets: number;
  tags: string[];
};

export type Booking = {
  event_id: string;
  title: string;
  date_time: string;
  location: string;
  description?: string;
  date_time_updated: string;
  max_tickets: number;
  booked_tickets: number;
  booking_id: string;
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

export const createEventInfo = (event: Event) => {
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  set(ref(db, "events/" + event.id), {
    title: event.title,
    date_time: event.date_time,
    location: event.location,
    description: event.description || "",
    date_time_updated: event.date_time_updated,
    max_tickets: event.max_tickets,
    booked_tickets: event.booked_tickets,
    tags: event.tags,
  }).catch((error: any) => {
    console.error(error);
    errorToast();
  });

  set(ref(db, "bookings/" + uuid()), {
    account_id: userId,
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
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  let eventsList: Event[] = [];
  const hostedEvents: String[] = [];

  get(child(dbRef, "bookings"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let i = 0; i < Object.keys(data).length; i++) {
          const accountId = data[Object.keys(data)[i]].account_id;
          const eventId = data[Object.keys(data)[i]].event_id;
          if (userId == accountId) {
            hostedEvents.push(eventId);
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
      errorToast();
    });

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
                  bookingsList.push(data as Event);
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

export const bookEvent = (eventId: string) => {
  const userId = auth.currentUser ? auth.currentUser.uid : "";
  const dateToday = new Date();

  /*
  Meddows, Samuel; mohshbool, 2019. How do I get the current date in JavaScript?. [Online] 
  Available at: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  [Accessed 27 March 2024].
  */
  const dd = String(dateToday.getDate()).padStart(2, "0");
  const mm = String(dateToday.getMonth() + 1).padStart(2, "0");
  const yyyy = dateToday.getFullYear();

  const hours = String(dateToday.getHours());
  const minutes = String(dateToday.getMinutes()).padStart(2, "0");

  set(ref(db, "bookings/" + uuid()), {
    account_id: userId,
    event_id: eventId,
    date_booked: dd + "/" + mm + "/" + yyyy,
    time_booked: hours + ":" + minutes,
  })
    .then(() => {
      get(child(dbRef, `events/${eventId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const event = snapshot.val();
            set(ref(db, `events/${eventId}`), {
              title: event.title,
              booked_tickets: event.booked_tickets + 1,
              date_time: event.date_time,
              date_time_updated: event.date_time_updated,
              description: event.description,
              location: event.location,
              max_tickets: event.max_tickets,
              tags: event.tags,
            })
              .then(() => {
                bookEventSuccessToast();
              })
              .catch((error: any) => {
                console.error(error);
                bookEventErrorToast();
              });
          } else {
            errorToast();
          }
        })
        .catch((error) => {
          console.error(error);
          errorToast();
        });
    })
    .catch((error: any) => {
      console.error(error);
      bookEventErrorToast();
    });
};

export const deleteBooking = (bookingId: string, eventId: string) => {
  remove(ref(db, "bookings/" + bookingId))
    .then(() => {
      get(child(dbRef, `events/${eventId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const event = snapshot.val();
            set(ref(db, `events/${eventId}`), {
              title: event.title,
              booked_tickets: event.booked_tickets - 1,
              date_time: event.date_time,
              date_time_updated: event.date_time_updated,
              description: event.description,
              location: event.location,
              max_tickets: event.max_tickets,
              tags: event.tags
            })
              .then(() => {
                deleteBookingSuccessToast();
              })
              .catch((error: any) => {
                console.error(error);
                deleteBookingErrorToast();
              });
          } else {
            deleteBookingErrorToast();
          }
        })
        .catch((error) => {
          console.error(error);
          errorToast();
        });
    })
    .catch((error) => {
      errorToast();
    });
};
