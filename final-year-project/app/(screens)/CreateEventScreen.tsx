import CreateEventScreenInfo from "@/components/(info)/CreateEventScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function CreateEventScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Create Event</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <CreateEventScreenInfo path="app/(tabs)/CreateEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
