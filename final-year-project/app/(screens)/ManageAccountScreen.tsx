import ManageAccountScreenInfo from "@/components/(info)/ManageAccountScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function ManageAccountScreen() {
  return (
    <>
      <View style={styles.container}>
        <ManageAccountScreenInfo path="app/(screens)/ManageAccountScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
