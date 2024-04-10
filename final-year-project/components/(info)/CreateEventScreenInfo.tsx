import { useState } from "react";
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

/*
React Native Community, 2024. react-native-datetimepicker. [Online] 
Available at: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#getting-started
[Accessed 28 March 2024].
*/
import RNDateTimePicker from "@react-native-community/datetimepicker";

/*
React Native Elements Community, 2024. Chip. [Online]
Available at: https://reactnativeelements.com/docs/components/chip
[Accessed 9 April 2024].
*/

import { Chip } from "@rneui/themed";

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

export default function CreateEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [tags, setTags] = useState<Array<Tag>>(tagsList);
  const dateToday = new Date();

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
    let selectedTags: string[] = [];
    tags.forEach((tag) => {
      if (tag.type == "solid") {
        selectedTags.push(tag.name);
      }
    });

    const event: Event = {
      id: uuid(),
      booked_tickets: 0,
      date_time: String(dateTime),
      date_time_updated: String(new Date()),
      location: location,
      max_tickets: Number(maxTickets),
      title: title,
      description: description,
      tags: selectedTags,
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
            multiline={true}
            style={styles.descriptionInput}
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
          <Text
            style={styles.text}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Tags
          </Text>
          <View style={styles.tagsList}>
            {tagsList.map((tag, index) => (
              <Chip
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
