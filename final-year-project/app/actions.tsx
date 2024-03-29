import { router } from "expo-router";

export const searchAction = () => {
  router.push("/(screens)/SearchScreen");
};

export const dashboardAction = () => {
  router.push("/(tabs)/DashboardScreen");
};

export const createEventAction = () => {
  router.push("/(screens)/CreateEventScreen");
};

export const updateEventAction = () => {
  router.push("/(screens)/UpdateEventScreen");
};

export const eventInfoAction = (eventId: string) => {
  router.push({ pathname: "/(screens)/BookEventScreen", params: { eventId: eventId } });
}