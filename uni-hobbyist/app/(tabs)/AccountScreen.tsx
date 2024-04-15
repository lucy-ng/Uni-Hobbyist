import AccountScreenInfo from "@/components/(info)/AccountScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function AccountScreen() {
  return (
    <>
      <View style={styles.container}>
        <AccountScreenInfo path="app/(tabs)/AccountScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
