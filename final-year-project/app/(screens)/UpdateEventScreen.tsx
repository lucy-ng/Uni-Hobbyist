import UpdateEventScreenInfo from "@/components/(info)/UpdateEventScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function UpdateEventScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>UpdateEvent</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <UpdateEventScreenInfo path="app/(screens)/UpdateEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
