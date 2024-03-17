import SearchScreenInfo from "@/components/(info)/SearchScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function SearchScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Search</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <SearchScreenInfo path="app/(screens)/SearchScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
