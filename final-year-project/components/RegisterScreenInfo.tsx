import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "./Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreenInfo({ path }: { path: string }) {
  return (
    <>
    <KeyboardAwareScrollView>
  <View style={styles.registerContainer}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          First Name
        </Text>
        <TextInput style={styles.input} />
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Last Name
        </Text>
        <TextInput style={styles.input} />
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          University
        </Text>
        <TextInput style={styles.input} />
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Email
        </Text>
        <TextInput style={styles.input} />
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Password
        </Text>
        <TextInput style={styles.input} secureTextEntry={true} />
        <Button
          title="Register"
        />
      </View>
    </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    width: 200,
    color: "white",
    padding: 5,
    margin: 20,
  },
});
