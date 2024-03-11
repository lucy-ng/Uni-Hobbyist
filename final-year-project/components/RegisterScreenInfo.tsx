import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-native";
import { Text, View, TextInput } from "./Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Styles";
import Toast from "react-native-toast-message";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import email from "react-native-email";
import { getCode, saveCode } from "@/app/database";

export default function RegisterScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationModal, setAuthenticationModal] = React.useState(false);
  const [value, setValue] = useState("");
  const refObj = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, university, emailValue, password]);

  const validateForm = () => {};

  const sendEmail = () => {
    const codeValue = saveCode(emailValue);
    const to = emailValue;
    email(to, {
      subject: "Uni Hobbyist Verification",
      body:
        "Hi there! Your verification code is " +
        codeValue +
        ". Please enter this code in the app.",
      checkCanOpen: false,
    }).catch(console.error);

    setAuthenticationModal(true);
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully registered!",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "Please try again.",
    });
  };


  const handleSubmit = () => {
    const returnedCode = getCode(emailValue);

    if (value == returnedCode) {
      setAuthenticationModal(false);
      showSuccessToast();
    }
    else {
      showErrorToast();
    }
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.registerContainer}>
          <Modal visible={authenticationModal}>
            <View style={styles.authenticationContainer}>
              <Text
                style={styles.text}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                Please input the code sent to your email.
              </Text>
              <CodeField
                ref={refObj}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <Button title="Authenticate" onPress={handleSubmit} />
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
            University
          </Text>
          <TextInput
            style={styles.input}
            value={university}
            onChangeText={setUniversity}
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
            Email
          </Text>
          <TextInput
            style={styles.input}
            value={emailValue}
            onChangeText={setEmail}
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
          <Button title="Register" onPress={sendEmail} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
