import {
  createEventAction,
  eventsAction,
  bookingsAction,
} from "@/app/actions";
import { SafeAreaView, View } from "react-native";
import { Card } from "@rneui/themed";
import Button from "../Button";
import { styles } from "../Styles";
import { auth } from "@/app/database";

export default function DashboardScreenInfo({ path }: { path: string }) {
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Card>
            <Card.Title>Book</Card.Title>
            <Card.Divider />
            <Button
              title={"Manage Bookings"}
              onPress={() => bookingsAction(userId)}
            ></Button>
          </Card>
          <Card>
            <Card.Title>Host</Card.Title>
            <Card.Divider />
            <Button title={"Create Event"} onPress={createEventAction}></Button>
            <Button
              title={"Manage Events"}
              onPress={eventsAction}
            ></Button>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
