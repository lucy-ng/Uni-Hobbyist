import { Stack } from "expo-router";
import { RootState } from "./store";
import { useAppSelector } from "./hooks";

export default function RootNavigation() {
  /*
  Dan Abramov and the Redux documentation authors, 2024. 
  Redux Toolkit Quick Start [Online] 
  Available at: https://redux-toolkit.js.org/tutorials/quick-start
  [Accessed 24 March 2024]. 
  */
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.counter.isLoggedIn
  );

  return (
    <>
      {!isLoggedIn ? (
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "purple",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(screens)/LoginScreen"
            options={{ headerShown: false, title: "Login" }}
          />
          <Stack.Screen
            name="(screens)/RegisterScreen"
            options={{ headerShown: true, title: "Register" }}
          />
        </Stack>
      ) : (
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "purple",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen
            name="(screens)/BookEventScreen"
            options={{ headerShown: true, title: "Book Event" }}
          />
          <Stack.Screen
            name="(screens)/CreateEventScreen"
            options={{ headerShown: true, title: "Create Event" }}
          />
          <Stack.Screen
            name="(screens)/ManageEventScreen"
            options={{ headerShown: true, title: "Manage Event" }}
          />
          <Stack.Screen
            name="(screens)/ManageAccountScreen"
            options={{ headerShown: true, title: "Manage Account" }}
          />
          <Stack.Screen
            name="(screens)/EventsScreen"
            options={{ headerShown: true, title: "Events" }}
          />
          <Stack.Screen
            name="(screens)/BookingsScreen"
            options={{ headerShown: true, title: "Bookings" }}
          />
        </Stack>
      )}
    </>
  );
}
