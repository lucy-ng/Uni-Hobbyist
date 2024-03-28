import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function RootNavigation() {
  /*
  Dan Abramov and the Redux documentation authors, 2024. 
  Redux Toolkit Quick Start [Online] 
  Available at: https://redux-toolkit.js.org/tutorials/quick-start
  [Accessed 24 March 2024]. 
  */
  const isLoggedIn = useSelector(
    (state: RootState) => state.counter.isLoggedIn
  );

  return (
    <>
      {!isLoggedIn ? (
        <Stack>
          <Stack.Screen
            name="(screens)/LoginScreen"
            options={{ headerShown: true, title: "Login" }}
          />
          <Stack.Screen
            name="(screens)/RegisterScreen"
            options={{ headerShown: true, title: "Register"  }}
          />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
          <Stack.Screen
            name="(screens)/SearchScreen"
            options={{ headerShown: true, title: "Search" }}
          />
          <Stack.Screen
            name="(screens)/EventScreen"
            options={{ headerShown: true, title: "Event" }}
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
            name="(screens)/UpdateEventScreen"
            options={{ headerShown: true, title: "Update Event" }}
          />
        </Stack>
      )}
    </>
  );
}
