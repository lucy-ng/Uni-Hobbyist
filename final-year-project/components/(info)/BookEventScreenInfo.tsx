import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, View } from "../Themed";
import { useEffect, useState } from "react";
import { bookEvent, dbRef } from "@/app/database";
import Button from "../Button";
import { get, child } from "firebase/database";
import { errorToast } from "../Toast";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@rneui/base";

export default function BookEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bookedTickets, setBookedTickets] = useState(0);
  const [maxTickets, setMaxTickets] = useState(0);

  const params = useLocalSearchParams();

  useEffect(() => {
    get(child(dbRef, `events/${params.eventId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTitle(data.title);
          setDateTime(new Date(data.date_time));
          setLocation(data.location);
          setDescription(data.description);
          setBookedTickets(data.booked_tickets);
          setMaxTickets(data.max_tickets);
        } else {
          errorToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Card key={String(params.event_id)}>
            <Card.Title style={styles.title}>{title}</Card.Title>
            <Card.Divider />
            <Text
              style={styles.text}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              Date and Time:{" "}
              {String(new Date(dateTime).getDate()).padStart(2, "0") +
                "/" +
                String(new Date(dateTime).getMonth() + 1).padStart(2, "0") +
                "/" +
                new Date(dateTime).getFullYear() +
                " " +
                String(new Date(dateTime).getHours()) +
                ":" +
                String(new Date(dateTime).getMinutes()).padStart(2, "0")}
            </Text>
            <Text
              style={styles.text}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              Location: {location}
            </Text>
            <Text
              style={styles.text}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              Description: {description}
            </Text>
          </Card>

          {bookedTickets != maxTickets ? (
            <Button title="Book" onPress={() => bookEvent(String(params.eventId))} />
          ) : (
            <Text style={styles.title}>SOLD OUT</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
