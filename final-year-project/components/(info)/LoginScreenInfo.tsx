import { useState } from "react";
import { Text, View, TextInput, Pressable } from "../Themed";
import { styles } from "../Styles";
import Button from "../Button";
import { Link } from "expo-router";
import {
  emailErrorToast,
  emptyValueToast,
  loginErrorToast,
  loginSuccessToast,
} from "../Toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/app/authenticationSlice";
import { homeAction } from "@/app/actions";
import { getAuth } from "@firebase/auth";

export default function LoginScreenInfo({ path }: { path: string }) {
  const [emailValue, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  /*
  Google LLC, 2024. Authenticate with Firebase using Password-Based Accounts using Javascript. [Online] 
  Available at: https://firebase.google.com/docs/auth/web/password-auth
  [Accessed 27 March 2024].
  */

  const handleSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailValue, password)
      .then((userCredential) => {
        dispatch(login());
        homeAction();
        loginSuccessToast();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        loginErrorToast();
      });
  };

  const validateForm = () => {
    /*
    prabushitha, 2018. How to do Email validation using Regular expression in Typescript [duplicate]. [Online] 
    Available at: https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript
    [Accessed 14 March 2024].
    */

    const emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (emailValue === "" || password === "") {
      emptyValueToast();
    } else if (!emailValue.includes("ac.uk") || !emailReg.test(emailValue)) {
      emailErrorToast();
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
  650 Industries, Inc., 2024. Navigate between pages. [Online] 
  Available at: https://docs.expo.dev/router/navigating-pages/
  [Accessed 24 March 2024].
  */

  return (
    <View>
      <Text
        style={styles.inputText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={emailValue}
        onChangeText={setEmail}
        keyboardType={"email-address"}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
        lightBorderColor="rgba(0,0,0,0.8)"
        darkBorderColor="rgba(255,255,255,0.8)"
      />
      <Text
        style={styles.inputText}
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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text
        style={styles.altText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Don't have an account?
      </Text>
      <Link href="/RegisterScreen" asChild>
        <Pressable
          style={styles.button}
          lightColor="darkgrey"
          darkColor="rgba(255,255,255,0.8)"
        >
          <Text
            style={styles.buttonText}
            darkColor="darkgrey"
            lightColor="rgba(255,255,255,0.8)"
          >
            Register
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
