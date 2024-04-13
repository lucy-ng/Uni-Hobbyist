import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: {
          backgroundColor: "#8D86C9",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {
      /*
      Pictogrammers, 2024. 
      Icon details - "home" from MaterialCommunityIcons. [Online] 
      Available at: https://icons.expo.fyi/Index/MaterialCommunityIcons/home
      [Accessed 13 April 2024]. 
      */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color="#9067C6" />
          ),
        }}
      />
      {/*
      Pictogrammers, 2024. 
      Icon details - "account" from MaterialCommunityIcons. [Online] 
      Available at: https://icons.expo.fyi/Index/MaterialCommunityIcons/account
      [Accessed 24 March 2024]. 
      */}
      <Tabs.Screen
        name="AccountScreen"
        options={{
          title: "Account",
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color="#9067C6" />
          ),
        }}
      />
      {/*
      Pictogrammers, 2024. 
      Icon details - "view-dashboard" from MaterialCommunityIcons. [Online] 
      Available at: https://icons.expo.fyi/Index/MaterialCommunityIcons/view-dashboard
      [Accessed 13 April 2024]. 
      */}
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          title: "Dashboard",
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color="#9067C6"
            />
          ),
        }}
      />
    </Tabs>
  );
}
