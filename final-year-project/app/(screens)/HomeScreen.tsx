import HomeScreenInfo from "@/components/(info)/HomeScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Uni Hobbyist</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <HomeScreenInfo path="app/(screens)/HomeScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
