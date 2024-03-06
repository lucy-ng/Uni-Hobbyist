import React from "react";
import { Button } from "react-native";

import { Text, View, TextInput } from "./Themed";
import { styles } from "./Styles";

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
      <TextInput 
        style={styles.input}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
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
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      />
      <Button
        title="Login"
      />
    </View>
  );
}
