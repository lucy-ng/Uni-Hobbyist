import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Modal, Text, TextInput, View } from "../Themed";
import { useState } from "react";
import { Tag, db, deleteEventInfo } from "@/app/database";
import { useLocalSearchParams } from "expo-router";
import { ref, set } from "firebase/database";
import {
  emptyValueToast,
  errorToast,
  invalidDateToast,
  updateEventSuccessToast,
} from "../Toast";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Button from "../Button";
import { AntDesign } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import { dashboardAction } from "@/app/actions";

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

export default function ManageEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [tags, setTags] = useState<Array<Tag>>(tagsList);
  const [deleteModal, setDeleteModal] = useState(false);

  const dateToday = new Date();
  const params = useLocalSearchParams();

  useEffect(() => {
    setTitle(String(params.title));
    setDateTime(new Date(String(params.date_time)));
    setLocation(String(params.location));
    setDescription(String(params.description));
    setMaxTickets(String(params.max_tickets));

    let fetchedTags: string[] = params.tags as string[];
    let newTags = tagsList;

    newTags.forEach((tag) => {
      if (fetchedTags.includes(tag.name)) {
        tag.type = "solid";
      }
    });
    setTags(newTags);
  }, []);

  const validateForm = () => {
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

    set(ref(db, "events/" + params.id), {
      booked_tickets: params.booked_tickets,
      date_time: String(dateTime),
      date_time_updated: String(new Date()),
      location: location,
      max_tickets: Number(maxTickets),
      title: title,
      description: description,
      tags: selectedTags,
    })
      .then(() => {
        dashboardAction();
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

  return (
    <>
      <KeyboardAwareScrollView>
        <Modal visible={deleteModal} animationType="slide" transparent={true}>
          <View
            style={styles.modalView}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            <View
              style={styles.modalInfoView}
              darkColor="rgba(0,0,0,0.8)"
              lightColor="rgba(255,255,255,0.8)"
            >
              <AntDesign
                name="closecircle"
                size={24}
                color="purple"
                onPress={() => setDeleteModal(false)}
                style={styles.closeIcon}
              />
              <Text
                style={styles.text}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                Are you sure that you want to delete this event?
              </Text>
              <Button title="Delete" onPress={deleteEvent} />
            </View>
          </View>
        </Modal>
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
          <Button title="Update" onPress={validateForm} />
          <Button title="Delete" onPress={() => setDeleteModal(true)} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
