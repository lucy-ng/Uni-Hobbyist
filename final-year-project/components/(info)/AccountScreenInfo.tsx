import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, View } from "../Themed";
import { useEffect, useState } from "react";
import { CardButton } from "../Button";
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
      <View style={styles.bodyHeaderContainer}>
        <Card
          containerStyle={{
            minWidth: "80%",
            shadowColor: "grey",
            shadowRadius: 3,
            shadowOpacity: 0.5,
          }}
        >
          <Card.Title style={styles.cardTitle}>
            {firstName} {lastName}
          </Card.Title>
          <Text style={styles.text} darkColor="black" lightColor="black">
            {university}
          </Text>
          <Text style={styles.text} darkColor="black" lightColor="black">
            {emailValue}
          </Text>
          <Card.Divider style={{ marginVertical: 30 }} />
          <CardButton
            title="Manage Account"
            onPress={() =>
              manageAccountAction(accountId, emailValue, university)
            }
          ></CardButton>
          <CardButton title="Logout" onPress={logoutFunction}></CardButton>
        </Card>
      </View>
    </>
  );
}
