import { View, SafeAreaView } from "react-native";
import { styles } from "../Styles";
import Button from "../Button";
import {
  createEventAction,
  dashboardAction,
  searchAction,
  updateEventAction,
} from "@/app/actions";
import { useDispatch } from "react-redux";
import { logout } from "@/app/authenticationSlice";
import { router } from "expo-router";
import { Card } from "@rneui/themed";
import { auth } from "@/app/database";
import { signOut } from "@firebase/auth";

export default function HomeScreenInfo({ path }: { path: string }) {

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Card>
            <Card.Title>Book</Card.Title>
            <Card.Divider />
            <Button title={"Search"} onPress={searchAction}></Button>
            <Button
              title={"Manage Bookings"}
              onPress={dashboardAction}
            ></Button>
          </Card>
          <Card>
            <Card.Title>Host</Card.Title>
            <Card.Divider />
            <Button title={"Create Event"} onPress={createEventAction}></Button>
            <Button title={"Manage Events"} onPress={updateEventAction}></Button>
          </Card>
          
        </View>
      </SafeAreaView>
    </>
  );
}
