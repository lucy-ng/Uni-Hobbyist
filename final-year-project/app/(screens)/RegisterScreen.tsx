import { Text, View } from "@/components/Themed";
import RegisterScreenInfo from "@/components/(info)/RegisterScreenInfo";
import { styles } from "@/components/Styles";

/*
Ant Group and Ant Design Community, 2024. 
Icon details - "back" from AntDesign. [Online] 
Available at: https://icons.expo.fyi/Index/AntDesign/back
[Accessed 24 March 2024]. 
*/

import { AntDesign } from "@expo/vector-icons";

/*
Almidan, H., 2022. Quick start. [Online] 
Available at: https://github.com/calintamas/react-native-toast-message/blob/HEAD/docs/quick-start.md
[Accessed 14 March 2024]. 
*/
import Toast from "react-native-toast-message";
import { Link } from "expo-router";

export default function RegisterScreen() {
  return (
    <>
      <View style={styles.registerScreenContainer}>
        <View style={styles.titleIconBox}>
          <Link href="/LoginScreen" asChild>
            <AntDesign
              name="back"
              size={24}
              color="purple"
              style={styles.backIcon}
            />
          </Link>
          <Text style={styles.inlineTitle}>Register</Text>
        </View>
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
