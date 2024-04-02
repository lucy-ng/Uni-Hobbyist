import React from "react";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";
import ManageBookingScreenInfo from "@/components/(info)/ManageBookingScreenInfo";

export default function ManageBookingScreen() {
  return (
    <>
      <View style={styles.container}>
        <ManageBookingScreenInfo path="app/(screens)/ManageBookingScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
