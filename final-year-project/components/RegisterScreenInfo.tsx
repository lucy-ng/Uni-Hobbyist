import React, { useState } from "react";
import { Text, View, TextInput, Modal } from "./Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Styles";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { getCode, registerUser, saveCode } from "@/app/database";
import { AntDesign } from "@expo/vector-icons";
import Button from "./Button";
import {
  showEmailErrorToast,
  showEmptyValueToast,
  showErrorToast,
  showSuccessToast,
} from "./Toast";

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

  const validateForm = () => {
    /*
    prabushitha, 2018. How to do Email validation using Regular expression in Typescript [duplicate]. [Online] 
    Available at: https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript
    [Accessed 14 March 2024].
    */

    const emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (
      firstName === "" ||
      lastName === "" ||
      university === "" ||
      emailValue === "" ||
      password === ""
    ) {
      showEmptyValueToast();
    } else if (!emailValue.includes("ac.uk") || !emailReg.test(emailValue)) {
      showEmailErrorToast();
    } else {
      setAuthenticationModal(true);
      sendEmail()
    }
  };

  const sendEmail = () => {
    const codeValue = saveCode(emailValue);
    const to = emailValue;
    
  };

  const handleSubmit = () => {
    const returnedCode = getCode(emailValue);

    if (value == returnedCode) {
      setAuthenticationModal(false);
      registerUser(emailValue, firstName, lastName, university, password)
      showSuccessToast();
    } else {
      showErrorToast();
    }
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.registerContainer}>
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
                  Please input the code we have sent to your email.
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
                      darkColor="rgba(0,0,0,0.8)"
                      lightColor="rgba(255,255,255,0.8)"
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
                <Button title="Authenticate" onPress={handleSubmit} />
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
          <Button title="Register" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
