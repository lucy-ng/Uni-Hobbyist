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
import "react-native-get-random-values";
import RNDateTimePicker from "@react-native-community/datetimepicker";
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
            {
              /*
              React Native Community, 2024. react-native-datetimepicker. [Online] 
              Available at: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#getting-started
              [Accessed 28 March 2024].
              */
            }
            <RNDateTimePicker
              mode={"datetime"}
              value={dateTime}
              onChange={(dateTime) =>
                setDateTime(new Date(dateTime.nativeEvent.timestamp))
              }
            />
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
            {
              /*
              React Native Elements Community, 2024. Chip. [Online]
              Available at: https://reactnativeelements.com/docs/components/chip
              [Accessed 9 April 2024].
              */
            }
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
