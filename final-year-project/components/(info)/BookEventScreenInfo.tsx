import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useEffect, useState } from "react";
import { bookEvent, dbRef } from "@/app/database";
import Button from "../Button";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast } from "../Toast";
import { useLocalSearchParams } from "expo-router";

export default function BookEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
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
          <Text
            style={styles.title}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {title}
          </Text>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
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
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Location: {location}
          </Text>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Description: {description}
          </Text>
          <Button title="Book" onPress={bookEvent} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
