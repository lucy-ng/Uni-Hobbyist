import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useEffect, useState } from "react";
import Button from "../Button";
import { auth, updateUser } from "@/app/database";
import { deleteUser } from "firebase/auth";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast } from "../Toast";

export default function AccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const id = auth.currentUser ? auth.currentUser.uid : "";

    get(child(dbRef, `accounts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUniversity(data.university);
          setEmail(data.email);
        } else {
          errorToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

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
