import { ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { child, get } from "firebase/database";
import { errorToast, noSearchResultsToast } from "../Toast";
import { View, Pressable, Text, TextInput } from "../Themed";
import { Card } from "@rneui/base";
import { type Event, dbRef, Tag, getAuth } from "@/app/database";
import { eventInfoAction } from "@/app/actions";
import { Chip } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

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
  const [tags, setTags] = useState<Array<Tag>>(tagsList ?? []);
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : "";
  const dateToday = new Date();

  useEffect(() => {
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
              tags: searchedEvent.tags ?? [],
              title: searchedEvent.title,
              description: searchedEvent.description,
            };

            // fetch bookings on and after today's date
            tags.forEach((tag) => {
              if (
                searchedEvent.tags &&
                searchedEvent.tags.includes(tag.name) &&
                tag.type == "solid" &&
                !eventsList.includes(searchedEvent) &&
                !hostedEvents.includes(id) &&
                new Date(newEvent.date_time) >= dateToday
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
                    tags: event.tags ?? [],
                  };

                  // fetch bookings on and after today's date
                  if (
                    searchValue == "" &&
                    !hostedEvents.includes(eventId) &&
                    new Date(event.date_time) >= dateToday
                  ) {
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
                    !hostedEvents.includes(eventId) &&
                    new Date(event.date_time) >= dateToday
                  ) {
                    eventsList.push(eventData);
                  }
                }
                setEvents(
                  eventsList
                    .filter(
                      (event, index) => eventsList.indexOf(event) == index
                    )
                    .sort((a, b) =>
                      new Date(a.date_time) > new Date(b.date_time) ? 1 : -1
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
      <View style={styles.bodyHeaderContainer}>
        <View
          style={styles.searchFilterBox}
          lightColor="white"
          darkColor="white"
        >
          <View style={styles.searchBox} lightColor="white" darkColor="white">
            <TextInput
              style={styles.searchBar}
              placeholder="Search for events..."
              onChangeText={setSearchValue}
              value={searchValue}
              onSubmitEditing={searchEvent}
              lightColor="black"
              darkColor="white"
              lightBorderColor="#CAC4CE"
              darkBorderColor="#CAC4CE"
            />
            <Pressable onPress={searchEvent}>
              <AntDesign
                name="search1"
                size={24}
                color="#8D86C9"
                backgroundColor="white"
              />
            </Pressable>
          </View>
          <ScrollView
            style={styles.searchTagsList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {/*
            React Native Elements Community, 2024. Chip. [Online]
            Available at: https://reactnativeelements.com/docs/components/chip
            [Accessed 12 April 2024].
            */}
            {tagsList.map((tag, index) => (
              <Chip
                style={{ backgroundColor: "#CAC4CE" }}
                key={tag.name}
                title={tag.name}
                type={tag.type}
                onPress={() => modifyTag(tag, index)}
              />
            ))}
          </ScrollView>
        </View>

        <ScrollView
          style={{ marginTop: 20, marginBottom: 100, maxHeight: "65%" }}
          showsVerticalScrollIndicator={false}
        >
          {events.map((event) => (
            <TouchableOpacity
              onPress={() => {
                eventInfoAction(event.id);
              }}
              key={event.id}
            >
              <Card
                key={event.id}
                containerStyle={{
                  shadowColor: "#CAC4CE",
                  shadowRadius: 3,
                  shadowOpacity: 0.5,
                  minWidth: "83%",
                  maxWidth: "93%",
                }}
              >
                <Card.Title style={styles.title}>{event.title}</Card.Title>
                <Card.Divider />
                <Text
                  style={styles.cardText}
                  lightColor="black"
                  darkColor="black"
                >
                  Date and Time:{" "}
                </Text>
                <Text style={styles.text} lightColor="black" darkColor="black">
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
                <Text>{"\n"}</Text>
                <Text
                  style={styles.cardText}
                  lightColor="black"
                  darkColor="black"
                >
                  Location:
                </Text>
                <Text style={styles.text} lightColor="black" darkColor="black">
                  {event.location}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
