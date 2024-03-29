import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { TextInput } from "../Themed";
import { useState } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import { errorToast, noSearchResultsToast } from "../Toast";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { Event } from "@/app/database";
import Button from "../Button";
import { eventInfoAction } from "@/app/actions";

export default function SearchScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");
  const [events, setEvents] = useState<Array<Event>>([]);

  const searchEvent = () => {
    let eventsList: Event[] = [];

    const dbRef = ref(getDatabase());
    get(child(dbRef, `events`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let title = data[Object.keys(data)[i]].title;
            let id = [Object.keys(data)[i]][0]

            if (searchValue == "" || !title.includes(searchValue)) {
              eventsList.push(data[Object.keys(data)[i]] as Event);
              eventsList[i].id = id
              noSearchResultsToast();
            } else if (title.includes(searchValue)) {
              eventsList.push(data[Object.keys(data)[i]] as Event);
              eventsList[i].id = id
            }
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
          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={setSearchValue}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Button title="Search" onPress={searchEvent} />
          <ScrollView>
            {events.map((event) => (
              <TouchableOpacity onPress={() => eventInfoAction(event.id)}>
                <Card>
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
