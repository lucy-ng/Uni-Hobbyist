import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { bookEvent, createEventInfo } from "@/app/database";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { logout } from "@/app/authenticationSlice";
import { router } from "expo-router";

export default function HomeScreenInfo({ path }: { path: string }) {
  const dispatch = useDispatch()

  const logoutAction = () => {
    dispatch(logout())
    router.replace("/(screens)/LoginScreen")
  }

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Button title="Book" onPress={bookEvent} />
          <Button title="Host" onPress={createEventInfo} />
          <Button title="Logout" onPress={logoutAction} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
