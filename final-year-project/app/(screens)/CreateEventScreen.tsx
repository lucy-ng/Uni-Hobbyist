import CreateEventScreenInfo from "@/components/(info)/CreateEventScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function CreateEventScreen() {
  return (
    <>
      <View style={styles.container}>
        <CreateEventScreenInfo path="app/(tabs)/CreateEventScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
