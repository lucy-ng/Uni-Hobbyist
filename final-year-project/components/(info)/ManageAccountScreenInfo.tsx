import { useEffect, useState } from "react";
import { Text, View, TextInput } from "../Themed";
import { styles } from "../Styles";
import Button from "../Button";
import {
  accountDetailsErrorToast,
  emptyValueToast,
  errorToast,
  updateAccountSuccessToast,
} from "../Toast";
import { child, get, ref, set } from "firebase/database";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { auth, db, dbRef } from "@/app/database";
import { goBackAction } from "@/app/actions";

export default function ManageAccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const params = useLocalSearchParams();
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    get(child(dbRef, `accounts/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.first_name);
          setLastName(data.last_name);
        } else {
          accountDetailsErrorToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const validateForm = () => {
    if (firstName === "" || lastName === "") {
      emptyValueToast();
    } else {
      handleSubmit();
    }
  };

  /*
  Google LLC, 2024. Read and Write Data on the Web. [Online] 
  Available at: https://firebase.google.com/docs/database/web/read-and-write
  [Accessed 14 March 2024].
  */

  const handleSubmit = () => {
    set(ref(db, "accounts/" + params.accountId), {
      first_name: firstName,
      last_name: lastName,
      email: params.email,
      university: params.university,
    })
      .then(() => {
        goBackAction();
        updateAccountSuccessToast();
      })
      .catch((error) => {
        errorToast();
      });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.bodyContainer}>
          <Text style={styles.text} lightColor="black" darkColor="white">
            First Name
          </Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.text} lightColor="black" darkColor="white">
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Button title="Update" onPress={validateForm} />
        </View>
      </SafeAreaView>
    </>
  );
}
