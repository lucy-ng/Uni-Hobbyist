import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { type Event, dbRef, auth } from "@/app/database";
import { manageEventAction } from "@/app/actions";
import { get, child } from "firebase/database";
import { errorToast, noEventsResultsToast } from "../Toast";
import React from "react";

export default function EventsScreenInfo({ path }: { path: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    const eventsList: Event[] = [];
    const hostedEvents: String[] = [];

    get(child(dbRef, "bookings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let i = 0; i < Object.keys(data).length; i++) {
            const accountId = data[Object.keys(data)[i]].account_id;
            const eventId = data[Object.keys(data)[i]].event_id;
            let dateBooked = data[Object.keys(data)[i]].date_booked;
            let timeBooked = data[Object.keys(data)[i]].time_booked;

            if (
              userId == accountId &&
              dateBooked == null &&
              timeBooked == null
            ) {
              hostedEvents.push(eventId);
            }
          }

          if (hostedEvents.length == 0) {
            noEventsResultsToast();
          } else {
            get(child(dbRef, `events`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val();

                  for (let i = 0; i < Object.keys(data).length; i++) {
                    let id = [Object.keys(data)[i]][0];
                    if (hostedEvents.includes(id)) {
                      eventsList.push(data[Object.keys(data)[i]] as Event);
                      eventsList[i].id = id;
                    }
                  }
                  setEvents(eventsList);
                } else {
                  noEventsResultsToast();
                }

                if (eventsList.length == 0) {
                  noEventsResultsToast();
                }
              })
              .catch((error) => {
                console.error(error);
                errorToast();
              });
          }
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
                  manageEventAction(event);
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
                    Date and Time:{" "}
                    {String(new Date(event.date_time).getDate()).padStart(
                      2,
                      "0"
                    ) +
                      "/" +
                      String(new Date(event.date_time).getMonth() + 1).padStart(
                        2,
                        "0"
                      ) +
                      "/" +
                      new Date(event.date_time).getFullYear() +
                      " " +
                      String(new Date(event.date_time).getHours()) +
                      ":" +
                      String(new Date(event.date_time).getMinutes()).padStart(
                        2,
                        "0"
                      )}
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
