import { useEffect, useState } from "react";
import { Text, View, TextInput } from "../Themed";
import { styles } from "../Styles";
import Button from "../Button";
import {
  accountDetailsErrorToast,
  emptyValueToast,
  errorToast,
  passwordLengthErrorToast,
  passwordLowerErrorToast,
  passwordNonAlphanumericErrorToast,
  passwordNumberErrorToast,
  passwordSameToast,
  passwordUpperErrorToast,
  updateAccountSuccessToast,
} from "../Toast";
import { child, get, ref, set } from "firebase/database";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { updatePassword } from "firebase/auth";
import { auth, db, dbRef } from "@/app/database";
import { accountAction } from "@/app/actions";

export default function ManageAccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
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
    /*
    Kiers, Bart, 2022. RegEx to make sure that the string contains at least one lower case char, upper case char, digit and symbol. [Online] 
    Available at: https://stackoverflow.com/questions/1559751/regex-to-make-sure-that-the-string-contains-at-least-one-lower-case-char-upper
    [Accessed 27 March 2024].
    */
    const passwordDigitReg = new RegExp(/(?=.*\d)/);
    const passwordUpperReg = new RegExp(/(?=.*[A-Z])/);
    const passwordLowerReg = new RegExp(/(?=.*[a-z])/);
    const passwordNonAlphanumericReg = new RegExp(/[-+_!@#$%^&*.,?]/);

    if (firstName === "" || lastName === "" || password === "") {
      emptyValueToast();
    } else if (password.length < 6) {
      passwordLengthErrorToast();
    } else if (!passwordDigitReg.test(password)) {
      passwordNumberErrorToast();
    } else if (!passwordLowerReg.test(password)) {
      passwordLowerErrorToast();
    } else if (!passwordUpperReg.test(password)) {
      passwordUpperErrorToast();
    } else if (!passwordNonAlphanumericReg.test(password)) {
      passwordNonAlphanumericErrorToast();
    } else {
      handleSubmit();
    }
  };

  /*
  Google LLC, 2024. Read and Write Data on the Web. [Online] 
  Available at: https://firebase.google.com/docs/database/web/read-and-write
  [Accessed 14 March 2024].
  */
  /*
  Google LLC, 2024. Authenticate with Firebase using Password-Based Accounts using Javascript. [Online] 
  Available at: https://firebase.google.com/docs/auth/web/password-auth
  [Accessed 27 March 2024].
  */

  const handleSubmit = () => {
    set(ref(db, "accounts/" + params.accountId), {
      first_name: firstName,
      last_name: lastName,
      email: params.email,
      university: params.university,
    })
      .then(() => {
        if (auth.currentUser) {
          updatePassword(auth.currentUser, password)
            .then(() => {
              accountAction();
              updateAccountSuccessToast();
            })
            .catch((error: any) => {
              console.log(error.code, error.message);
              errorToast();
            });
        }
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

          <Text style={styles.text} lightColor="black" darkColor="white">
            Password
          </Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
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
