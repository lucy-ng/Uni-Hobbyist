import React, { useEffect, useState } from "react";
import { Button } from "react-native";

import { Text, View, TextInput } from "./Themed";
import { styles } from "./Styles";
import { database } from "@/app/database";
import { ref, onValue } from "firebase/database";

export default function LoginScreenInfo({ path }: { path: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {};

  const loginUser = () => {
    const db = database;
    const userRef = ref(db, "users/" + email.replace(/\./g, ","));
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

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
        value={email}
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
      <Button title="Login" onPress={loginUser} />
    </View>
  );
}
