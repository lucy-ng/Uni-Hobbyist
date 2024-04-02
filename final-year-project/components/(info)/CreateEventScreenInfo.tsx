import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import { styles } from "../Styles";
import { Text, TextInput } from "../Themed";
import Button from "../Button";
import { Event, auth, createEventInfo } from "@/app/database";
import {
  emptyValueToast,
  invalidDateToast,
  invalidMaxTicketsToast,
} from "../Toast";
import { v4 as uuid } from "uuid";

/*
React Native Community, 2024. react-native-datetimepicker. [Online] 
Available at: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#getting-started
[Accessed 28 March 2024].
*/
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function CreateEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const dateToday = new Date();

  let tags: string[] = [];

  const validateForm = () => {
    const positiveNumberRegex = new RegExp(/^[1-9][0-9]*$/);

    if (
      title === "" ||
      dateTime == null ||
      location === "" ||
      description === "" ||
      maxTickets === ""
    ) {
      emptyValueToast();
    } else if (dateTime <= dateToday) {
      invalidDateToast();
    } else if (
      Number(maxTickets) == 0 ||
      !positiveNumberRegex.test(maxTickets)
    ) {
      invalidMaxTicketsToast();
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
    const dd = String(dateToday.getDate()).padStart(2, "0");
    const mm = String(dateToday.getMonth() + 1).padStart(2, "0");
    const yyyy = dateToday.getFullYear();

    const hours = String(dateToday.getHours());
    const minutes = String(dateToday.getMinutes()).padStart(2, "0");

    const id = auth.currentUser ? auth.currentUser.uid : "";

    const event: Event = {
      id: uuid(),
      booked_tickets: 0,
      date_time: String(dateTime),
      date_updated: dd + "/" + mm + "/" + yyyy,
      location: location,
      max_tickets: Number(maxTickets),
      time_updated: hours + ":" + minutes,
      title: title,
      description: description,
      tags: tags,
    };
    createEventInfo(id, event);
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
          <View style={styles.dateTimeBox}>
            <Text
              style={styles.text}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              Date and Time
            </Text>
            <RNDateTimePicker
              mode={"datetime"}
              value={dateTime}
              onChange={(dateTime) =>
                setDateTime(new Date(dateTime.nativeEvent.timestamp))
              }
            />
          </View>
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
            Number of Tickets
          </Text>
          <TextInput
            style={styles.input}
            value={maxTickets}
            onChangeText={setMaxTickets}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            lightBorderColor="rgba(0,0,0,0.8)"
            darkBorderColor="rgba(255,255,255,0.8)"
            keyboardType="numeric"
          />
          <Button title="Create" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
