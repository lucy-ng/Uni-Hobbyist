import React from "react";
import { View} from "../Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";

export default function HostEventScreenInfo({ path }: { path: string }) {

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
