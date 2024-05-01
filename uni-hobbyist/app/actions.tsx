/*
650 Industries, Inc., 2024. 
Navigate between pages. [Online] 
Available at: https://docs.expo.dev/router/navigating-pages/
[Accessed 22 April 2024]. 
*/
import { router } from "expo-router";
import { Event } from "./database";

export const homeAction = () => {
  router.replace("/(tabs)/HomeScreen");
};

export const logoutAction = () => {
  router.replace("/(screens)/LoginScreen");
};

export const loginScreenAction = () => {
  router.replace("/(screens)/LoginScreen");
};

export const bookingsAction = (accountId: string) => {
  router.push({
    pathname: "/(screens)/BookingsScreen",
    params: { accountId: accountId },
  });
};

export const eventsAction = () => {
  router.push("/(screens)/EventsScreen");
};

export const createEventAction = () => {
  router.push("/(screens)/CreateEventScreen");
};

export const manageEventAction = (event: Event) => {
  router.push({
    pathname: "/(screens)/ManageEventScreen",
    params: {
      id: event.id,
      booked_tickets: event.booked_tickets,
      date_time: event.date_time,
      description: event.description || "",
      location: event.location,
      max_tickets: event.max_tickets,
      title: event.title,
      tags: event.tags ?? [],
    },
  });
};

export const manageAccountAction = (
  accountId: string,
  email: string,
  university: string
) => {
  router.push({
    pathname: "/(screens)/ManageAccountScreen",
    params: { accountId: accountId, email: email, university: university },
  });
};

export const eventInfoAction = (eventId: string) => {
  router.push({
    pathname: "/(screens)/BookEventScreen",
    params: { eventId: eventId },
  });
};
