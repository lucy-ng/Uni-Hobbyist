import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useEffect, useState } from "react";
import Button from "../Button";
import { auth } from "@/app/database";
import { signOut } from "firebase/auth";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast } from "../Toast";
import { logout } from "@/app/authenticationSlice";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { Card } from "@rneui/base";
import { manageAccountAction } from "@/app/actions";

export default function AccountScreenInfo({ path }: { path: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const id = auth.currentUser ? auth.currentUser.uid : "";

    get(child(dbRef, `accounts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUniversity(data.university);
          setEmail(data.email);
        } else {
          errorToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const dispatch = useDispatch();

  /*
  Google LLC, 2024. Authenticate with Firebase using Password-Based Accounts using Javascript. [Online] 
  Available at: https://firebase.google.com/docs/auth/web/password-auth
  [Accessed 27 March 2024].
  */

  const logoutAction = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        router.replace("/(screens)/LoginScreen");
      })
      .catch((error: any) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Title style={styles.title}>
              {firstName} {lastName}
            </Card.Title>
            <Card.Divider />
            <Text
              style={styles.text}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              {university}
            </Text>
            <Text
              style={styles.text}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              {emailValue}
            </Text>
          </Card>
          <Card>
            <Button title="Manage Account" onPress={manageAccountAction}></Button>
            <Card.Divider />
            <Button title="Logout" onPress={logoutAction}></Button>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
