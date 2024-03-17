import { View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, TextInput } from "../Themed";
import { useState } from "react";
import { updateEventInfo } from "@/app/database";

export default function UpdateEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Title
          </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Date
          </Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Time
          </Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Location
          </Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {description}
          </Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Button title="Update" onPress={updateEventInfo} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
