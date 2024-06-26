import { SetStateAction, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, TextInput, View } from "../Themed";
import Button from "../Button";
import { Event, Tag, createEventInfo } from "@/app/database";
import {
  emptyValueToast,
  invalidDateToast,
  invalidMaxTicketsToast,
} from "../Toast";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Chip } from "@rneui/themed";
import { Platform, SafeAreaView } from "react-native";

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

type modeType = "date" | "time";

export default function CreateEventScreenInfo({ path }: { path: string }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [tags, setTags] = useState<Array<Tag>>(tagsList ?? []);
  const dateToday = new Date();

  const validateForm = () => {
    const positiveNumberRegex = new RegExp(/^[1-9][0-9]*$/);
    const selectedDate = Platform.OS == "ios" ? dateTime : date;
    if (
      title === "" ||
      selectedDate == null ||
      location === "" ||
      description === "" ||
      maxTickets === ""
    ) {
      emptyValueToast();
    } else if (selectedDate <= dateToday) {
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
    let selectedTags: string[] = [];
    if (tags.length > 0) {
      tags.forEach((tag) => {
        if (tag.type == "solid") {
          selectedTags.push(tag.name);
        }
      });
    }

    const selectedDate = Platform.OS == "ios" ? dateTime : date;

    const event: Event = {
      id: uuid(),
      booked_tickets: 0,
      date_time: String(selectedDate),
      date_time_updated: String(new Date()),
      location: location,
      max_tickets: Number(maxTickets),
      title: title,
      description: description,
      tags: selectedTags ?? [],
    };
    createEventInfo(event);
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

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.keyboardContainer}>
          <Text style={styles.text} lightColor="black" darkColor="white">
            Title
          </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <View style={styles.dateTimeBox}>
            <Text style={styles.text} lightColor="black" darkColor="white">
              Date and Time
            </Text>
            {Platform.OS == "ios" ? (
              <RNDateTimePicker
                mode={"datetime"}
                value={dateTime}
                onChange={(dateTime) =>
                  setDateTime(new Date(dateTime.nativeEvent.timestamp))
                }
              />
            ) : (
              <>
                {/*
                React Native Community, 2024. react-native-datetimepicker. [Online] 
                Available at: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#getting-started
                [Accessed 28 March 2024].
                */}
                <SafeAreaView>
                  <Button onPress={showDatePicker} title="Choose Date" />
                  <Button onPress={showTimePicker} title="Choose Time" />
                  <Text>
                    Selected:{" "}
                    {String(new Date(date).getDate()).padStart(2, "0") +
                      "/" +
                      String(new Date(date).getMonth() + 1).padStart(2, "0") +
                      "/" +
                      new Date(date).getFullYear() +
                      " " +
                      String(new Date(date).getHours()) +
                      ":" +
                      String(new Date(date).getMinutes()).padStart(2, "0")}
                  </Text>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode as modeType}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                </SafeAreaView>
              </>
            )}
          </View>
          <Text style={styles.text} lightColor="black" darkColor="white">
            Location
          </Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.text} lightColor="black" darkColor="white">
            Description
          </Text>
          <TextInput
            multiline={true}
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
          />
          <Text style={styles.text} lightColor="black" darkColor="white">
            Number of Tickets
          </Text>
          <TextInput
            style={styles.input}
            value={maxTickets}
            onChangeText={setMaxTickets}
            lightColor="black"
            darkColor="white"
            lightBorderColor="#CAC4CE"
            darkBorderColor="#CAC4CE"
            keyboardType="numeric"
          />
          <Text style={styles.text} lightColor="black" darkColor="white">
            Tags
          </Text>
          <View style={styles.tagsList}>
            {/*
              React Native Elements Community, 2024. Chip. [Online]
              Available at: https://reactnativeelements.com/docs/components/chip
              [Accessed 9 April 2024].
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
          </View>
          <Button title="Create" onPress={validateForm} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
