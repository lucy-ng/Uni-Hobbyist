import React from "react";
import BookEventScreenInfo from "@/components/(info)/BookEventScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function BookEventScreen() {
  return (
    <>
      <View style={styles.container}>
        <BookEventScreenInfo path="app/(screens)/BookEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
