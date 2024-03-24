import DashboardScreenInfo from "@/components/(info)/DashboardScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function DashboardScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Dashboard</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <DashboardScreenInfo path="app/(tabs)/DashboardScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
