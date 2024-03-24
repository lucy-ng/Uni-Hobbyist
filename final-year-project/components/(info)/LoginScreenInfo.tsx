import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "../Themed";
import { styles } from "../Styles";
import Button from "../Button";
import { Link, router } from "expo-router";
import { showEmptyValueToast, showSuccessToast } from "../Toast";
import { useDispatch } from "react-redux";
import { login } from "@/app/authenticationSlice";

export default function LoginScreenInfo({ path }: { path: string }) {
  const [emailValue, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const validateForm = () => {
    if (
      emailValue === "" ||
      password === ""
    ) {
      showEmptyValueToast();
    } else {
      handleSubmit()
    }
  };

  const handleSubmit = () => {
    showSuccessToast();
    dispatch(login())
    router.replace("/(tabs)/HomeScreen")
  };

  /*
  Google LLC, 2024. Read and Write Data on the Web. [Online] 
  Available at: https://firebase.google.com/docs/database/web/read-and-write
  [Accessed 14 March 2024].
  */

  /* 
  650 Industries, Inc., 2024. Navigate between pages. [Online] 
  Available at: https://docs.expo.dev/router/navigating-pages/
  [Accessed 24 March 2024].
  */

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={validateForm} />
      <View style={styles.noAccountContainer}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Don't have an account?
        </Text>
        <Link href="/RegisterScreen" asChild>
          <Pressable
            style={styles.button}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <Text
              style={styles.buttonText}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              Register
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
