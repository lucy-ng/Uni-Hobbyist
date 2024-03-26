import { Text, View } from "@/components/Themed";
import { styles } from "@/components/Styles";
/*
Almidan, H., 2022. Quick start. [Online] 
Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
[Accessed 14 March 2024]. 
*/
import Toast from "react-native-toast-message";
import React from "react";
import HostEventScreenInfo from "@/components/(info)/HostEventScreenInfo";

export default function HostEventScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Host Event</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <HostEventScreenInfo path="app/(screens)/HostScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
