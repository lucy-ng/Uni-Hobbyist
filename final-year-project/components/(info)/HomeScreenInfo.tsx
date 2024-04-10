import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { child, get } from "firebase/database";
import { errorToast, noSearchResultsToast } from "../Toast";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { type Event, dbRef, auth, Tag } from "@/app/database";
import { eventInfoAction } from "@/app/actions";
import { Chip, SearchBar } from "@rneui/themed";

/*
React Native Elements Community, 2024. SearchBar. [Online]
Available at: https://reactnativeelements.com/docs/components/searchbar
[Accessed 29 March 2024].
*/

let tagsList: Tag[] = [
  { name: "Media & Entertainment", type: "outline" },
  { name: "Sport", type: "outline" },
  { name: "Music", type: "outline" },
  { name: "Special Interest", type: "outline" },
  { name: "Academic", type: "outline" },
  { name: "Language & Culture", type: "outline" },
  { name: "Adventure", type: "outline" },
  { name: "Art", type: "outline" },
];

export default function HomeScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [tags, setTags] = useState<Array<Tag>>(tagsList);
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : "";

    let eventsList: Event[] = [];
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

    get(child(dbRef, `events`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let id = [Object.keys(data)[i]][0];
            const searchedEvent = data[Object.keys(data)[i]] as Event;

            let newEvent: Event = {
              booked_tickets: searchedEvent.booked_tickets,
              date_time: searchedEvent.date_time,
              date_time_updated: searchedEvent.date_time_updated,
              id: id,
              location: searchedEvent.location,
              max_tickets: searchedEvent.max_tickets,
              tags: searchedEvent.tags,
              title: searchedEvent.title,
              description: searchedEvent.description,
            };

            tags.forEach((tag) => {
              if (
                searchedEvent.tags.includes(tag.name) &&
                tag.type == "solid" &&
                !eventsList.includes(searchedEvent) &&
                !hostedEvents.includes(id)
              ) {
                eventsList.push(newEvent);
              }
            });
          }
          setEvents(
            eventsList.filter(
              (event, index) => eventsList.indexOf(event) == index
            )
          );
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, [tags]);

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
                    date_time_updated: event.date_time_updated,
                    location: event.location,
                    max_tickets: event.max_tickets,
                    description: event.description,
                    tags: event.tags,
                  };

                  if (searchValue == "" && !hostedEvents.includes(eventId)) {
                    eventsList.push(eventData);
                  } else if (
                    (title
                      .toLowerCase()
                      .trim()
                      .replace(/\s/g, "")
                      .includes(
                        searchValue.toLowerCase().trim().replace(/\s/g, "")
                      ) ||
                      searchValue
                        .toLowerCase()
                        .trim()
                        .replace(/\s/g, "")
                        .includes(
                          title.toLowerCase().trim().replace(/\s/g, "")
                        ) ||
                      searchValue.toLowerCase().trim().replace(/\s/g, "") ==
                        title.toLowerCase().trim().replace(/\s/g, "")) &&
                    !hostedEvents.includes(eventId)
                  ) {
                    eventsList.push(eventData);
                  }
                }
                setEvents(
                  eventsList.filter(
                    (event, index) => eventsList.indexOf(event) == index
                  )
                );
              }

              if (!eventsList.length) {
                noSearchResultsToast();
              }
            })
            .catch((error) => {
              console.error(error);
              errorToast();
            });
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  };

  const modifyTag = (tag: Tag, index: number) => {
    if (tag.type == "outline") {
      setTags([...tagsList]);
      tagsList[index].type = "solid";
    } else {
      setTags([...tagsList]);
      tagsList[index].type = "outline";
    }
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
              cancelIcon={true}
              showCancel={true}
            />
          </View>
          <ScrollView style={styles.searchTagsList} horizontal={true}>
            {tagsList.map((tag, index) => (
              <Chip
                key={tag.name}
                title={tag.name}
                type={tag.type}
                onPress={() => modifyTag(tag, index)}
              />
            ))}
          </ScrollView>
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
