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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screens)/RegisterScreen"
            options={{ headerShown: false }}
          />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}
    </>
  );
}
