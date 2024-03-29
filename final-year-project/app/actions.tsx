import { router } from "expo-router";

export const dashboardAction = () => {
  router.push("/(tabs)/DashboardScreen");
};

export const createEventAction = () => {
  router.push("/(screens)/CreateEventScreen");
};

export const manageEventAction = () => {
  router.push("/(screens)/ManageEventScreen");
};

export const manageAccountAction = () => {
  router.push("/(screens)/ManageAccountScreen");
};

export const eventInfoAction = (eventId: string) => {
  router.push({ pathname: "/(screens)/BookEventScreen", params: { eventId: eventId } });
}