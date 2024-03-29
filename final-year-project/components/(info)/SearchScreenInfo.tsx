import { View, Button, SafeAreaView } from "react-native";
import { styles } from "../Styles";
import { TextInput } from "../Themed";
import { useEffect, useState } from "react";
import { ref, getDatabase, child, get } from "firebase/database";
import { errorToast } from "../Toast";
import { Text } from "../Themed";
import { Card } from "@rneui/base";

export default function SearchScreenInfo({ path }: { path: string }) {
  const [searchValue, setSearchValue] = useState("");

  type EventProps = {
    title: string;
    date: string;
    time: string;
    location: string;
  };
  let events: EventProps[] = [];

  useEffect(() => {
    searchEvent()
  }, []);

  const searchEvent = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `events`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            let title = data[Object.keys(data)[i]].title;
            if (title.includes(searchValue)) {
              events.push(data[Object.keys(data)[i]]);
            }
          }
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
          {events.map((event: EventProps) => {
            return (
              <Card>
                <Card.Title></Card.Title>
                <Card.Divider />
                <Text
                  style={styles.text}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)"
                >
                  Title: {event.title}
                </Text>
                <Text
                  style={styles.text}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)"
                >
                  Date: {event.date}
                </Text>
                <Text
                  style={styles.text}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)"
                >
                  Time: {event.time}
                </Text>
                <Text
                  style={styles.text}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)"
                >
                  Location: {event.location}
                </Text>
              </Card>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
}
