import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { bookEvent, createEventInfo } from "@/app/database";
import Button from "../Button";


export default function HomeScreenInfo({ path }: { path: string }) {
 
  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Button title="Book" onPress={bookEvent} />
          <Button title="Host" onPress={createEventInfo} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
