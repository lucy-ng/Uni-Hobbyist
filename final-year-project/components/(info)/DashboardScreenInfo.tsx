import {
  dashboardAction,
  createEventAction,
  manageEventAction,
} from "@/app/actions";
import { SafeAreaView, View } from "react-native";
import { Card } from "@rneui/themed";
import Button from "../Button";
import { styles } from "../Styles";

export default function DashboardScreenInfo({ path }: { path: string }) {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <Card>
            <Card.Title>Book</Card.Title>
            <Card.Divider />
            <Button
              title={"Manage Bookings"}
              onPress={dashboardAction}
            ></Button>
          </Card>
          <Card>
            <Card.Title>Host</Card.Title>
            <Card.Divider />
            <Button title={"Create Event"} onPress={createEventAction}></Button>
            <Button
              title={"Manage Events"}
              onPress={manageEventAction}
            ></Button>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
