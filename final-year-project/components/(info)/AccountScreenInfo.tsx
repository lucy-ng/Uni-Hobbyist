import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useState } from "react";
import Button from "../Button";
import { updateUser } from "@/app/database";
import { deleteUser } from "firebase/auth";

export default function AccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {firstName} {lastName}
          </Text>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {university}
          </Text>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {emailValue}
          </Text>
          <Button title="Update" onPress={updateUser} />
          <Button title="Delete" onPress={deleteUser} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
