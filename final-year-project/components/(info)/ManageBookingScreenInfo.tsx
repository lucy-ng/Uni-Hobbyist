import React, { useEffect } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, TextInput } from "../Themed";
import { useState } from "react";
import { db, deleteEventInfo, Event } from "@/app/database";
import { useLocalSearchParams } from "expo-router";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { emptyValueToast, errorToast, invalidDateToast, updateEventSuccessToast } from "../Toast";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "../Button";

export default function ManageBookingScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");

  const dateToday = new Date();
  const params = useLocalSearchParams();

  useEffect(() => {
    setTitle(String(params.title));
    setDateTime(new Date(String(params.date_time)));
    setLocation(String(params.location));
    setDescription(String(params.location));
    setMaxTickets(String(params.max_tickets));
  }, []);

  const validateForm = () => {
    if (
      title === "" ||
      dateTime == null ||
      location === "" ||
      description === ""
    ) {
      emptyValueToast();
    } else if (dateTime <= dateToday) {
      invalidDateToast();
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

    set(ref(db, "events/" + params.id), {
      booked_tickets: params.booked_tickets,
      date_time: String(dateTime),
      date_updated: dd + "/" + mm + "/" + yyyy,
      location: location,
      max_tickets: Number(maxTickets),
      time_updated: hours + ":" + minutes,
      title: title,
      description: description,
      tags: params.tags,
    })
      .then(() => {
        updateEventSuccessToast()
      })
      .catch((error) => {
        errorToast();
      });
  };

  const deleteEvent = () => {
    deleteEventInfo(String(params.id));
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
          <Button title="Update" onPress={validateForm} />
          <Button title="Delete" onPress={deleteEvent} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
