import { router } from "expo-router";

export const homeAction = () => {
  router.replace("/(tabs)/HomeScreen");
}

export const logoutAction = () => {
  router.replace("/(screens)/LoginScreen");
}

export const dashboardAction = () => {
  router.replace("/(tabs)/DashboardScreen");
};

export const eventsAction = () => {
  router.push("/(screens)/EventsScreen");
};

export const createEventAction = () => {
  router.push("/(screens)/CreateEventScreen");
};

export const manageEventAction = () => {
  router.push("/(screens)/ManageEventScreen");
};

export const manageAccountAction = (
  accountId: string,
  email: string,
  university: string,
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
