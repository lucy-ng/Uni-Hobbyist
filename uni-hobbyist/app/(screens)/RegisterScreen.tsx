import { View } from "@/components/Themed";
import RegisterScreenInfo from "@/components/(info)/RegisterScreenInfo";
import { styles } from "@/components/Styles";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  return (
    <>
      <View style={styles.container}>
        <RegisterScreenInfo path="app/(screens)/RegisterScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
