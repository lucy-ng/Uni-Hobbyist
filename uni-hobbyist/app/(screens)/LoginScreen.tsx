import { Text, View } from "@/components/Themed";
import LoginScreenInfo from "@/components/(info)/LoginScreenInfo";
import { styles } from "@/components/Styles";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Uni Hobbyist</Text>
        <View
          style={styles.separator}
          lightColor="#242038"
          darkColor="#F7ECE1"
        />
        <LoginScreenInfo path="app/(screens)/LoginScreen.tsx" />
      </View>
      {/*
      Almidan, H., 2022. Quick start. [Online] 
      Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
      [Accessed 14 March 2024]. 
      */}
      <Toast />
    </>
  );
}
