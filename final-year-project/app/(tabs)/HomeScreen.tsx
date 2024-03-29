import HomeScreenInfo from "@/components/(info)/HomeScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <HomeScreenInfo path="app/(tabs)/HomeScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
