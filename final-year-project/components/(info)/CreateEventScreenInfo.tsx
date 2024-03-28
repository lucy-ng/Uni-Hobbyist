import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import { styles } from "../Styles";
import { Text, TextInput } from "../Themed";
import Button from "../Button";
import { Event, auth, createEventInfo } from "@/app/database";
import "react-native-get-random-values";
import { emptyValueToast } from "../Toast";
import { DateTimeComponent } from "../DateTimeComponent";

export default function CreateEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [maxTickets, setMaxTickets] = useState("");

  const validateForm = () => {
    if (
      title === "" ||
      date == null ||
      time == null ||
      location === "" ||
      description === ""
    ) {
      emptyValueToast();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    /*
    Meddows, Samuel; mohshbool, 2019. How do I get the current date in JavaScript?. [Online] 
    Available at: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    [Accessed 27 March 2024].
    */
    const dateToday = new Date();
    const dd = String(dateToday.getDate()).padStart(2, "0");
    const mm = String(dateToday.getMonth() + 1).padStart(2, "0");
    const yyyy = dateToday.getFullYear();

    const hours = dateToday.getHours();
    const minutes = dateToday.getMinutes();

    const id = auth.currentUser ? auth.currentUser.uid : "";

    const event: Event = {
      id: id,
      bookedTickets: 0,
      date: date.toDateString(),
      dateCreated: dd + "/" + mm + "/" + yyyy,
      location: location,
      maxTickets: Number(maxTickets),
      time: time.toString(),
      timeCreated: hours + ":" + minutes,
      title: title,
      description: description,
      tags: tags,
    };
    // createEventInfo(, event)
  };

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
          <DateTimeComponent />
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
            Description
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
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Maximum Number of Tickets
          </Text>
          <TextInput
            style={styles.input}
            value={maxTickets}
            onChangeText={setMaxTickets}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
          />
          <Button title="Create" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
