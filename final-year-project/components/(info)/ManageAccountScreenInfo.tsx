import React, { useState } from "react";
import { Text, View, TextInput, Modal } from "../Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { auth, db } from "@/app/database";
import "react-native-get-random-values";

/*
Ant Group and Ant Design Community, 2024. 
Icon details - "closecircle" from AntDesign [Online] 
Available at: https://icons.expo.fyi/Index/AntDesign/closecircle
[Accessed 24 March 2024]. 
*/

import { AntDesign } from "@expo/vector-icons";
import Button from "../Button";
import {
  emailErrorToast,
  emptyValueToast,
  passwordLengthErrorToast,
  passwordLowerErrorToast,
  passwordNonAlphanumericErrorToast,
  passwordNumberErrorToast,
  passwordUpperErrorToast,
  registerErrorToast,
  registerSuccessToast,
} from "../Toast";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function ManageAccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationModal, setAuthenticationModal] = useState(false);

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

  const handleSubmit = () => {};

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Modal
            visible={authenticationModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView}>
              <View
                style={styles.modalInfoView}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                <AntDesign
                  name="closecircle"
                  size={24}
                  color="purple"
                  onPress={() => setAuthenticationModal(false)}
                  style={styles.closeIcon}
                />
                <Text
                  style={styles.text}
                  darkColor="rgba(0,0,0,0.8)"
                  lightColor="rgba(255,255,255,0.8)"
                >
                  Please verify your account with the link sent to your email.
                </Text>
              </View>
            </View>
          </Modal>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            First Name
          </Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />

          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Password
          </Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Button title="Update" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
