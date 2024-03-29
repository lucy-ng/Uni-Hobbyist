import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { type Event } from "@/app/database";
import { eventInfoAction } from "@/app/actions";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast } from "../Toast";

export default function EventsScreenInfo({ path }: { path: string }) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const eventsList: Event[] = []

    const dbRef = ref(getDatabase());
    get(child(dbRef, `events`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let id = [Object.keys(data)[i]][0];
            eventsList.push(data[Object.keys(data)[i]] as Event);
            eventsList[i].id = id;
          }
          setEvents(eventsList)
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
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            {events.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  eventInfoAction(event.id);
                }}
                key={event.id}
              >
                <Card key={event.id}>
                  <Card.Title style={styles.title}>{event.title}</Card.Title>
                  <Card.Divider />
                  <Text
                    style={styles.text}
                    darkColor="rgba(0,0,0,0.8)"
                    lightColor="rgba(255,255,255,0.8)"
                  >
                    Date: {event.date}
                  </Text>
                  <Text
                    style={styles.text}
                    darkColor="rgba(0,0,0,0.8)"
                    lightColor="rgba(255,255,255,0.8)"
                  >
                    Time: {event.time}
                  </Text>
                  <Text
                    style={styles.text}
                    darkColor="rgba(0,0,0,0.8)"
                    lightColor="rgba(255,255,255,0.8)"
                  >
                    Location: {event.location}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
