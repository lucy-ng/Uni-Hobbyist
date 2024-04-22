import { useState } from "react";
import { Text, View, TextInput } from "../Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { db, dbRef, getAuth } from "@/app/database";
import Button from "../Button";
import {
  emailErrorToast,
  emailSameToast,
  emptyValueToast,
  passwordLengthErrorToast,
  passwordLowerErrorToast,
  passwordNonAlphanumericErrorToast,
  passwordNumberErrorToast,
  passwordUpperErrorToast,
  registerErrorToast,
  registerSuccessToast,
} from "../Toast";
import { child, get, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { loginScreenAction } from "@/app/actions";

export default function RegisterScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  /*
  Google LLC, 2024. Read and Write Data on the Web. [Online] 
  Available at: https://firebase.google.com/docs/database/web/read-and-write
  [Accessed 14 March 2024].

  Google LLC, 2024. Authenticate with Firebase using Password-Based Accounts using Javascript. [Online] 
  Available at: https://firebase.google.com/docs/auth/web/password-auth
  [Accessed 27 March 2024].
  */

  const handleSubmit = () => {
    get(child(dbRef, `accounts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let email = data[Object.keys(data)[i]].email;
            if (email == emailValue) {
              emailSameToast();
            } else {
              createUserWithEmailAndPassword(auth, emailValue, password)
                .then((userCredential) => {
                  set(ref(db, "accounts/" + userCredential.user.uid), {
                    first_name: firstName,
                    last_name: lastName,
                    email: emailValue,
                    university: university,
                  });
                  loginScreenAction();
                  registerSuccessToast();
                })
                .catch((error: any) => {
                  console.log(error.code, error.message);
                });
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
        registerErrorToast();
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

    /*
    Kiers, Bart, 2022. RegEx to make sure that the string contains at least one lower case char, upper case char, digit and symbol. [Online] 
    Available at: https://stackoverflow.com/questions/1559751/regex-to-make-sure-that-the-string-contains-at-least-one-lower-case-char-upper
    [Accessed 27 March 2024].
    */
    const passwordDigitReg = new RegExp(/(?=.*\d)/);
    const passwordUpperReg = new RegExp(/(?=.*[A-Z])/);
    const passwordLowerReg = new RegExp(/(?=.*[a-z])/);
    const passwordNonAlphanumericReg = new RegExp(/[-+_!@#$%^&*.,?]/);

    if (
      firstName === "" ||
      lastName === "" ||
      university === "" ||
      emailValue === "" ||
      password === ""
    ) {
      emptyValueToast();
    } else if (!emailValue.includes("ac.uk") || !emailReg.test(emailValue)) {
      emailErrorToast();
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

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <Text style={styles.inputText} lightColor="black" darkColor="white">
            First Name
          </Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.inputText} lightColor="black" darkColor="white">
            Last Name
          </Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.inputText} lightColor="black" darkColor="white">
            University
          </Text>
          <TextInput
            style={styles.input}
            value={university}
            onChangeText={setUniversity}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.inputText} lightColor="black" darkColor="white">
            University Email
          </Text>
          <TextInput
            keyboardType={"email-address"}
            style={styles.input}
            value={emailValue}
            onChangeText={setEmail}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.inputText} lightColor="black" darkColor="white">
            Password
          </Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Button title="Register" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
