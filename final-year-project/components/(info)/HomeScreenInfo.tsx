import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useRef, useState } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import { errorToast, noSearchResultsToast } from "../Toast";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { Event, fetchEvents } from "@/app/database";
import { eventInfoAction } from "@/app/actions";
import { SearchBar } from "@rneui/themed";

/* 
React Native Elements Community, 2024. SearchBar. [Online] 
Available at: https://reactnativeelements.com/docs/components/searchbar
[Accessed 29 March 2024].
*/

export default function HomeScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<Array<Event>>(fetchEvents() || []);

  const searchEvent = () => {
    let eventsList: Event[] = [];

    const dbRef = ref(getDatabase());
    get(child(dbRef, `events`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let event = data[Object.keys(data)[i]];
            let title = event.title;
            let eventId = String(Object.keys(data)[i]);

            let eventData: Event = {
              id: eventId,
              title: event.title,
              bookedTickets: event.bookedTickets,
              date: event.date,
              dateCreated: event.dateCreated,
              location: event.location,
              maxTickets: event.maxTickets,
              time: event.time,
              timeCreated: event.timeCreated,
              description: event.description,
              tags: event.tags,
            };

            if (searchValue == "") {
              eventsList.push(eventData);
            } else if (
              title.includes(searchValue) ||
              searchValue.includes(title) ||
              searchValue == title
            ) {
              eventsList.push(eventData);
            }
          }

          if (eventsList.length == 0) {
            noSearchResultsToast();
          }

          setEvents(eventsList);
        } else {
          errorToast();
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
              <TouchableOpacity onPress={() => eventInfoAction(event.id)}>
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
