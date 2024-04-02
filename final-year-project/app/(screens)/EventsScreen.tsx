import React from "react";
import EventsScreenInfo from "@/components/(info)/EventsScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function EventsScreen() {
  return (
    <>
      <View style={styles.container}>
        <EventsScreenInfo path="app/(screens)/EventsScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
