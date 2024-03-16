import React, { useEffect, useState } from "react";
import { Text, View, TextInput } from "./Themed";
import { styles } from "./Styles";
import { loginUser } from "@/app/firebase";
import Button from "./Button";

export default function LoginScreenInfo({ path }: { path: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {};

  /*
  Google LLC, 2024. Read and Write Data on the Web. [Online] 
  Available at: https://firebase.google.com/docs/database/web/read-and-write
  [Accessed 14 March 2024].
  */



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
