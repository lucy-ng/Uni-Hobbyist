import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "./Themed";

export default function LoginScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.loginContainer}>
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
        title="Login"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
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
