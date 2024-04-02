import React from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useState } from "react";
import { child, get } from "firebase/database";
import { errorToast, noSearchResultsToast } from "../Toast";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { fetchEvents, type Event, dbRef, auth } from "@/app/database";
import { eventInfoAction } from "@/app/actions";
import { SearchBar } from "@rneui/themed";

/*
React Native Elements Community, 2024. SearchBar. [Online]
Available at: https://reactnativeelements.com/docs/components/searchbar
[Accessed 29 March 2024].
*/

export default function HomeScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<Event[]>(fetchEvents() || []);
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  const searchEvent = () => {
    const eventsList: Event[] = [];
    const hostedEvents: String[] = [];

    get(child(dbRef, "bookings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let i = 0; i < Object.keys(data).length; i++) {
            const accountId = data[Object.keys(data)[i]].account_id;
            const eventId = data[Object.keys(data)[i]].event_id;
            if (userId == accountId) {
              hostedEvents.push(eventId);
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });

    get(child(dbRef, "events"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            const event = data[Object.keys(data)[i]];
            const title = event.title;
            const eventId = String(Object.keys(data)[i]);

            const eventData: Event = {
              id: eventId,
              title: event.title,
              booked_tickets: event.booked_tickets,
              date_time: event.date_time,
              date_updated: event.date_updated,
              location: event.location,
              max_tickets: event.max_tickets,
              time_updated: event.time_updated,
              description: event.description,
            };

            if (searchValue == "" && !hostedEvents.includes(eventId)) {
              eventsList.push(eventData);
            } else if (
              (title.includes(searchValue) ||
                searchValue.includes(title) ||
                searchValue == title) &&
              !hostedEvents.includes(eventId)
            ) {
              eventsList.push(eventData);
            }
          }

          if (eventsList.length === 0) {
            noSearchResultsToast();
          }

          setEvents(eventsList);
        } else {
          noSearchResultsToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.searchBarBox}>
            <SearchBar
              placeholder="Search for events..."
              onChangeText={setSearchValue}
              value={searchValue}
              onSubmitEditing={searchEvent}
            />
          </View>
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
