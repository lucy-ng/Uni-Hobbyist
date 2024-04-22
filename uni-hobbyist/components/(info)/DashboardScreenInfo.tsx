import { createEventAction, eventsAction, bookingsAction } from "@/app/actions";
import { View } from "../Themed";
import { Card } from "@rneui/themed";
import Button from "../Button";
import { styles } from "../Styles";
import { getAuth } from "@/app/database";

export default function DashboardScreenInfo({ path }: { path: string }) {
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  return (
    <>
      <View style={styles.bodyHeaderContainer}>
        <Card
          containerStyle={{
            minWidth: "80%",
            shadowColor: "#CAC4CE",
            shadowRadius: 3,
            shadowOpacity: 0.5,
          }}
        >
          <Card.Title style={styles.cardTitle}>Book</Card.Title>
          <Card.Divider style={{ marginVertical: 10 }} />
          <Button
            title={"Manage Bookings"}
            onPress={() => bookingsAction(userId)}
          ></Button>
        </Card>
        <Card
          containerStyle={{
            minWidth: "80%",
            shadowColor: "#CAC4CE",
            shadowRadius: 3,
            shadowOpacity: 0.5,
          }}
        >
          <Card.Title style={styles.cardTitle}>Host</Card.Title>
          <Card.Divider style={{ marginVertical: 10 }} />
          <Button title={"Create Event"} onPress={createEventAction}></Button>
          <Button title={"Manage Events"} onPress={eventsAction}></Button>
        </Card>
      </View>
    </>
  );
}
