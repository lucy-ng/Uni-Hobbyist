import { router } from "expo-router";

export const searchAction = () => {
  router.push("/(screens)/SearchScreen");
};

export const hostEventAction = () => {
  router.push("/(screens)/HostEventScreen");
};
