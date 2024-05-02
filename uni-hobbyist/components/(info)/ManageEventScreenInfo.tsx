import { SetStateAction, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, TextInput, View } from "../Themed";
import { useState } from "react";
import { Tag, db, deleteEventInfo } from "@/app/database";
import { useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import { Platform, SafeAreaView } from "react-native";
import {
  emptyValueToast,
  errorToast,
  invalidBookedTicketsToast,
  invalidDateToast,
  invalidMaxTicketsToast,
  updateEventSuccessToast,
} from "../Toast";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../Button";
import { AntDesign } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import { homeAction } from "@/app/actions";
import Modal from "react-native-modal";

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

export default function ManageEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [bookedTickets, setBookedTickets] = useState("");
  const [tags, setTags] = useState<Array<Tag>>(tagsList ?? []);
  const [deleteModal, setDeleteModal] = useState(false);

  const dateToday = new Date();
  const params = useLocalSearchParams();

  useEffect(() => {
    // fetch event information from selecting an event
    setTitle(String(params.title));
    setDateTime(new Date(String(params.date_time)));
    setDate(new Date(String(params.date_time)));
    setLocation(String(params.location));
    setDescription(String(params.description));
    setMaxTickets(String(params.max_tickets));
    setBookedTickets(String(params.booked_tickets));

    let fetchedTags: string[] = (params.tags as string[]) ?? [];
    let newTags = tagsList;

    newTags.forEach((tag) => {
      if (fetchedTags.includes(tag.name)) {
        tag.type = "solid";
      } else {
        tag.type = "outline";
      }
    });

    setTags(newTags);
  }, []);

  const validateForm = () => {
    const positiveNumberRegex = new RegExp(/^[1-9][0-9]*$/);
    const selectedDate = Platform.OS == "ios" ? dateTime : date;

    if (
      title === "" ||
      selectedDate == null ||
      location === "" ||
      description === "" ||
      maxTickets === "" ||
      bookedTickets === ""
    ) {
      emptyValueToast();
    } else if (selectedDate <= dateToday) {
      invalidDateToast();
    } else if (
      Number(maxTickets) == 0 ||
      !positiveNumberRegex.test(maxTickets)
    ) {
      invalidMaxTicketsToast();
    } else if (!positiveNumberRegex.test(bookedTickets)) {
      invalidBookedTicketsToast();
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

    // update event information
    set(ref(db, "events/" + params.id), {
      booked_tickets: bookedTickets,
      date_time: String(selectedDate),
      date_time_updated: String(new Date()),
      location: location,
      max_tickets: Number(maxTickets),
      title: title,
      description: description,
      tags: selectedTags ?? [],
    })
      .then(() => {
        homeAction();
        updateEventSuccessToast();
      })
      .catch((error) => {
        errorToast();
      });
  };

  const deleteEvent = () => {
    deleteEventInfo(String(params.id));
    setDeleteModal(false);
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
        {/*
        React Native Community, 2022. react-native-modal. [Online]
        Available at: https://github.com/react-native-modal/react-native-modal
        [Accessed 12 April 2024].
        */}
        <Modal isVisible={deleteModal} hasBackdrop={true} backdropOpacity={0.8}>
          <View
            style={styles.modalInfoView}
            darkColor="#CAC4CE"
            lightColor="#CAC4CE"
          >
            <AntDesign
              name="closecircle"
              size={24}
              color="#8D86C9"
              onPress={() => setDeleteModal(false)}
              style={styles.closeIcon}
            />
            <Text style={styles.altText} lightColor="black" darkColor="black">
              Are you sure that you want to delete this event?
            </Text>
            <Button title="Delete" onPress={deleteEvent} />
          </View>
        </Modal>
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
            Number of Booked Tickets
          </Text>
          <TextInput
            style={styles.input}
            value={bookedTickets}
            onChangeText={setBookedTickets}
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
          <Button title="Update" onPress={validateForm} />
          <View
            style={styles.separator}
            lightColor="#F7ECE1"
            darkColor="#242038"
          />
          <Text style={styles.altText} lightColor="black" darkColor="white">
            Want to delete this event?
          </Text>
          <Button title="Delete" onPress={() => setDeleteModal(true)} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
