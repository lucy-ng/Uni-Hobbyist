import SearchScreenInfo from "@/components/(info)/SearchScreenInfo";
import { styles } from "@/components/Styles";
import { Text, View } from "@/components/Themed";

import Toast from "react-native-toast-message";

export default function SearchScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <SearchScreenInfo path="app/(screens)/SearchScreen.tsx" />
      </View>
      <Toast />
    </>
  );
}
