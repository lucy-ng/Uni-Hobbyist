import { createEventAction, eventsAction, bookingsAction } from "@/app/actions";
import { View } from "../Themed";
import { Card } from "@rneui/themed";
import { CardButton } from "../Button";
import { styles } from "../Styles";
import { auth } from "@/app/database";

export default function DashboardScreenInfo({ path }: { path: string }) {
  const userId = auth.currentUser ? auth.currentUser.uid : "";

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
          <Card.Title style={styles.cardTitle}>Book</Card.Title>
          <Card.Divider style={{ marginVertical: 10 }} />
          <CardButton
            title={"Manage Bookings"}
            onPress={() => bookingsAction(userId)}
          ></CardButton>
        </Card>
        <Card
          containerStyle={{
            minWidth: "80%",
            shadowColor: "grey",
            shadowRadius: 3,
            shadowOpacity: 0.5,
          }}
        >
          <Card.Title style={styles.cardTitle}>Host</Card.Title>
          <Card.Divider style={{ marginVertical: 10 }} />
          <CardButton
            title={"Create Event"}
            onPress={createEventAction}
          ></CardButton>
          <CardButton
            title={"Manage Events"}
            onPress={eventsAction}
          ></CardButton>
        </Card>
      </View>
    </>
  );
}
