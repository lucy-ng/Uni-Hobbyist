import EventScreenInfo from "@/components/(info)/EventScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function EventScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Event</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EventScreenInfo path="app/(screens)/EventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
