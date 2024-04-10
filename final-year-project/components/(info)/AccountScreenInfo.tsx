import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useEffect, useState } from "react";
import Button from "../Button";
import { auth, dbRef } from "@/app/database";
import { signOut } from "firebase/auth";
import { get, child } from "firebase/database";
import { errorToast } from "../Toast";
import { logout } from "@/app/authenticationSlice";
import { Card } from "@rneui/base";
import { logoutAction, manageAccountAction } from "@/app/actions";
import { useAppDispatch } from "@/app/hooks";
 
import { getAuth } from "@firebase/auth";

export default function AccountScreenInfo({ path }: { path: string }) {
  const [accountId, setAccountId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [emailValue, setEmail] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : "";
    setAccountId(userId);

    get(child(dbRef, `accounts/${userId}`))
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

  /*
  Google LLC, 2024. Authenticate with Firebase using Password-Based Accounts using Javascript. [Online] 
  Available at: https://firebase.google.com/docs/auth/web/password-auth
  [Accessed 27 March 2024].
  */

  const logoutFunction = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logout());
        logoutAction();
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
            <Button
              title="Manage Account"
              onPress={() => manageAccountAction(accountId, emailValue, university)}
            ></Button>
            <Card.Divider />
            <Button title="Logout" onPress={logoutFunction}></Button>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
