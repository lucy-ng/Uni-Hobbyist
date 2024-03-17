import AccountScreenInfo from "@/components/(info)/AccountScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function AccountScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Account</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <AccountScreenInfo path="app/(screens)/AccountScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
