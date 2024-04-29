import CalendarScreenInfo from "@/components/(info)/CalendarScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function CalendarScreen() {
  return (
    <>
      <View style={styles.container}>
        <CalendarScreenInfo path="app/(tabs)/CalendarScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
