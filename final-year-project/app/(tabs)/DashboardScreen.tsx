import React from "react";
import DashboardScreenInfo from "@/components/(info)/DashboardScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function DashboardScreen() {
  return (
    <>
      <View style={styles.container}>
        <DashboardScreenInfo path="app/(tabs)/DashboardScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
