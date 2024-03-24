import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
export default function DashboardScreenInfo({ path }: { path: string }) {

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
