import { ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "../Themed";
import { Card } from "@rneui/base";
import { type Event, dbRef, getAuth } from "@/app/database";
import { manageEventAction } from "@/app/actions";
import { get, child } from "firebase/database";
import { errorToast, noEventsResultsToast } from "../Toast";
import { Icon } from "@rneui/themed";

export default function EventsScreenInfo({ path }: { path: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [dateTimeSortIcon, setDateTimeSortIcon] = useState(
    "clock-time-four-outline"
  );
  const [nameSortIcon, setNameSortIcon] = useState("sort-alphabetical-variant");

  const auth = getAuth();
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

            if (userId == accountId && dateBooked == "" && timeBooked == "") {
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
                    const event = data[Object.keys(data)[i]] as Event;
                    if (hostedEvents.includes(id)) {
                      const eventData: Event = {
                        id: id,
                        title: event.title,
                        booked_tickets: event.booked_tickets,
                        date_time: event.date_time,
                        date_time_updated: event.date_time_updated,
                        location: event.location,
                        max_tickets: event.max_tickets,
                        description: event.description,
                        tags: event.tags ?? [],
                      };
                      eventsList.push(eventData);
                    }
                  }
                  setEvents(
                    eventsList.filter(
                      (event, index) => eventsList.indexOf(event) == index
                    )
                  );
                } else {
                  noEventsResultsToast();
                }
              })
              .catch((error) => {
                console.error(error);
                errorToast();
              });
          }
        }
        if (!eventsList.length && !hostedEvents.length) {
          noEventsResultsToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const changeDateTimeSortIcon = () => {
    if (dateTimeSortIcon == "clock-time-four-outline") {
      setEvents(
        events
          .filter((event, index) => events.indexOf(event) == index)
          .sort((a, b) =>
            new Date(a.date_time) > new Date(b.date_time) ? 1 : -1
          )
      );
      setDateTimeSortIcon("sort-clock-ascending");
    } else if (dateTimeSortIcon == "sort-clock-ascending") {
      setEvents(
        events
          .filter((event, index) => events.indexOf(event) == index)
          .sort((a, b) =>
            new Date(a.date_time) > new Date(b.date_time) ? -1 : 1
          )
      );
      setDateTimeSortIcon("sort-clock-descending");
    } else if (dateTimeSortIcon == "sort-clock-descending") {
      setEvents(
        events.filter((event, index) => events.indexOf(event) == index)
      );
      setDateTimeSortIcon("clock-time-four-outline");
    }
  };

  const changeNameSortIcon = () => {
    if (nameSortIcon == "sort-alphabetical-variant") {
      setEvents(
        events
          .filter((event, index) => events.indexOf(event) == index)
          .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
      setNameSortIcon("sort-alphabetical-ascending-variant");
    } else if (nameSortIcon == "sort-alphabetical-ascending-variant") {
      setEvents(
        events
          .filter((event, index) => events.indexOf(event) == index)
          .sort((a, b) => (a.title > b.title ? -1 : 1))
      );
      setNameSortIcon("sort-alphabetical-descending-variant");
    } else if (nameSortIcon == "sort-alphabetical-descending-variant") {
      setEvents(
        events.filter((event, index) => events.indexOf(event) == index)
      );
      setNameSortIcon("sort-alphabetical-variant");
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 30 }}
      >
        <View style={styles.sortBox}>
          <Pressable onPress={() => changeDateTimeSortIcon()}>
            <Icon
              name={dateTimeSortIcon}
              type={"material-community"}
              color={"#8D86C9"}
            />
          </Pressable>
          <Pressable onPress={() => changeNameSortIcon()}>
            <Icon
              name={nameSortIcon}
              type={"material-community"}
              color={"#8D86C9"}
              style={styles.endSortIcon}
            />
          </Pressable>
        </View>
        <View style={styles.bodyHeaderContainer}>
          {events.map((event) => (
            <TouchableOpacity
              onPress={() => {
                manageEventAction(event);
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
                  maxWidth: "92%",
                  paddingBottom: 70,
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
                <Text style={styles.text} darkColor="black" lightColor="black">
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
                <Text style={styles.text} darkColor="black" lightColor="black">
                  {event.location}
                </Text>
                <Text>{"\n"}</Text>
                <Text
                  style={styles.cardText}
                  lightColor="black"
                  darkColor="black"
                >
                  Tickets Booked:{" "}
                </Text>
                {/*    
                anubhava, 2020. regex: remove leading zeros, but keep single zero. [Online] 
                Available at: https://stackoverflow.com/questions/60509557/regex-remove-leading-zeros-but-keep-single-zero
                [Accessed 14 April 2024].
                */}
                <Text style={styles.text} darkColor="black" lightColor="black">
                  {String(event.booked_tickets).replace(
                    /^(?:0+(?=[1-9])|0+(?=0$))/gm,
                    ""
                  )}{" "}
                  /{" "}
                  {String(event.max_tickets).replace(
                    /^(?:0+(?=[1-9])|0+(?=0$))/gm,
                    ""
                  )}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
