import React from "react";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";
import BookingsScreenInfo from "@/components/(info)/BookingsScreenInfo";

export default function BookingsScreen() {
  return (
    <>
      <View style={styles.container}>
        <BookingsScreenInfo path="app/(screens)/BookingsScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
