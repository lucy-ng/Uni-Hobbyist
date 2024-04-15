import ManageEventScreenInfo from "@/components/(info)/ManageEventScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function ManageEventScreen() {
  return (
    <>
      <View style={styles.container}>
        <ManageEventScreenInfo path="app/(screens)/ManageEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
