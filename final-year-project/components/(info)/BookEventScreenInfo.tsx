import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text } from "../Themed";
import { useEffect, useState } from "react";
import { bookEvent } from "@/app/database";
import Button from "../Button";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast } from "../Toast";
import { useLocalSearchParams } from "expo-router";

export default function BookEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const params = useLocalSearchParams();
    get(child(dbRef, `events/${params.eventId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTitle(data.title);
          setDate(data.date);
          setTime(data.time);
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
            Date: {date}
          </Text>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Time: {time}
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
