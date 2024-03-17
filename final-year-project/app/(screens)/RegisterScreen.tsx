import { Text, View } from "@/components/Themed";
import RegisterScreenInfo from "@/components/(info)/RegisterScreenInfo";
import { styles } from "@/components/Styles";

/*
Almidan, H., 2022. Quick start. [Online] 
Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
[Accessed 14 March 2024]. 
*/
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  return (
    <>
      <View style={styles.registerScreenContainer}>
        <Text style={styles.title}>Register</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <RegisterScreenInfo path="app/(screens)/RegisterScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
