import { View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { TextInput } from "../Themed";
import { useState } from "react";
import { searchEvent } from "@/app/database";

export default function SearchScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={setSearchValue}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Button title="Search" onPress={searchEvent} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
