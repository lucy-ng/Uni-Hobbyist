import EventScreenInfo from "@/components/(info)/EventScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function EventScreen() {
  return (
    <>
      <View style={styles.container}>
        <EventScreenInfo path="app/(screens)/EventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
