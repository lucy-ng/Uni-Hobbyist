import React, { useEffect, useState } from "react";
import { Button } from "react-native";

import { Text, View, TextInput } from "./Themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ref, set } from "firebase/database";
import { database } from "@/app/database";
import { styles } from "./Styles";

export default function RegisterScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, university, email, password]);

  const validateForm = () => {
    
  };

  const registerUser = () => {

    const db = database;
    set(ref(db, "users/" + email.replace(/\./g, ',')), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      university: university,
      password: password,
    });
  };

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
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            lightColor="rgba(255,255,255,0.8)"
            darkColor="rgba(0,0,0,0.8)"
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
            lightColor="rgba(255,255,255,0.8)"
            darkColor="rgba(0,0,0,0.8)"
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
            lightColor="rgba(255,255,255,0.8)"
            darkColor="rgba(0,0,0,0.8)"
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
            value={email}
            onChangeText={setEmail}
            lightColor="rgba(255,255,255,0.8)"
            darkColor="rgba(0,0,0,0.8)"
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
            lightColor="rgba(255,255,255,0.8)"
            darkColor="rgba(0,0,0,0.8)"
          />
          <Button title="Register" onPress={registerUser} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
