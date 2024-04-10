import CreateEventScreenInfo from "@/components/(info)/CreateEventScreenInfo";
import { styles } from "@/components/Styles";
import { View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function CreateEventScreen() {
  return (
    <>
      <View style={styles.container}>
        <CreateEventScreenInfo path="app/(screens)/CreateEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
