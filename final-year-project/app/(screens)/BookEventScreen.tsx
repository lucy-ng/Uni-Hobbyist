import BookEventScreenInfo from "@/components/(info)/BookEventScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function BookEventScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Book Event</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <BookEventScreenInfo path="app/(screens)/BookEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
