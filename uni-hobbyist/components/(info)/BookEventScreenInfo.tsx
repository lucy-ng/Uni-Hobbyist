import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../Styles";
import { Text, View } from "../Themed";
import { useEffect, useState } from "react";
import { db, dbRef, getAuth } from "@/app/database";
import Button from "../Button";
import { get, child, ref, set } from "firebase/database";
import {
  bookEventErrorToast,
  bookEventSuccessToast,
  errorToast,
} from "../Toast";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@rneui/base";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { goBackAction } from "@/app/actions";
import { v4 as uuid } from "uuid";

export default function BookEventScreenInfo({ path }: { path: string }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [bookedTickets, setBookedTickets] = useState(0);
  const [maxTickets, setMaxTickets] = useState(0);
  const [bookModal, setBookModal] = useState(false);
  const auth = getAuth();
  const params = useLocalSearchParams();

  useEffect(() => {
    get(child(dbRef, `events/${params.eventId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTitle(data.title);
          setDateTime(new Date(data.date_time));
          setLocation(data.location);
          setDescription(data.description);
          setBookedTickets(data.booked_tickets);
          setMaxTickets(data.max_tickets);
        } else {
          errorToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const bookEvent = (eventId: string) => {
    const userId = auth.currentUser ? auth.currentUser.uid : "";
    const dateToday = new Date();

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

    set(ref(db, "bookings/" + uuid()), {
      account_id: userId,
      event_id: eventId,
      date_booked: dd + "/" + mm + "/" + yyyy,
      time_booked: hours + ":" + minutes,
    })
      .then(() => {
        get(child(dbRef, `events/${eventId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const event = snapshot.val();
              set(ref(db, `events/${eventId}`), {
                title: event.title,
                booked_tickets: event.booked_tickets + 1,
                date_time: event.date_time,
                date_time_updated: event.date_time_updated,
                description: event.description,
                location: event.location,
                max_tickets: event.max_tickets,
                tags: event.tags ?? [],
              })
                .then(() => {
                  setBookModal(false);
                  goBackAction();
                  bookEventSuccessToast();
                })
                .catch((error: any) => {
                  console.error(error);
                  bookEventErrorToast();
                });
            } else {
              errorToast();
            }
          })
          .catch((error) => {
            console.error(error);
            errorToast();
          });
      })
      .catch((error: any) => {
        console.error(error);
        bookEventErrorToast();
      });
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {/*
        React Native Community, 2022. react-native-modal. [Online]
        Available at: https://github.com/react-native-modal/react-native-modal
        [Accessed 12 April 2024].
        */}
        <Modal isVisible={bookModal} hasBackdrop={true} backdropOpacity={0.8}>
          <View
            style={styles.modalInfoView}
            darkColor="#CAC4CE"
            lightColor="#CAC4CE"
          >
            <AntDesign
              name="closecircle"
              size={24}
              color="#8D86C9"
              onPress={() => setBookModal(false)}
              style={styles.closeIcon}
            />
            <Text style={styles.altText} lightColor="black" darkColor="black">
              Are you sure that you want to book this event?
            </Text>
            <Button
              title="Book"
              onPress={() => bookEvent(String(params.eventId))}
            />
          </View>
        </Modal>
        <View style={styles.bodyHeaderContainer}>
          <Card
            key={String(params.event_id)}
            containerStyle={{
              minWidth: "85%",
              minHeight: "80%",
              shadowColor: "#CAC4CE",
              shadowRadius: 3,
              shadowOpacity: 0.5,
            }}
          >
            <Card.Title style={styles.title}>{title}</Card.Title>
            <Card.Divider />
            <Text style={styles.cardText} lightColor="black" darkColor="black">
              Date and Time:{" "}
            </Text>
            <Text style={styles.text} lightColor="black" darkColor="black">
              {String(new Date(dateTime).getDate()).padStart(2, "0") +
                "/" +
                String(new Date(dateTime).getMonth() + 1).padStart(2, "0") +
                "/" +
                new Date(dateTime).getFullYear() +
                " " +
                String(new Date(dateTime).getHours()) +
                ":" +
                String(new Date(dateTime).getMinutes()).padStart(2, "0")}
            </Text>
            <Text>{"\n"}</Text>
            <Text style={styles.cardText} lightColor="black" darkColor="black">
              Location:{" "}
            </Text>
            <Text style={styles.text} lightColor="black" darkColor="black">
              {location}
            </Text>
            <Text>{"\n"}</Text>
            <Text style={styles.cardText} lightColor="black" darkColor="black">
              Description:{" "}
            </Text>
            <Text style={styles.text} lightColor="black" darkColor="black">
              {description}
            </Text>
          </Card>

          {bookedTickets != maxTickets ? (
            <Button title="Book" onPress={() => setBookModal(true)} />
          ) : (
            <Text style={styles.title}>SOLD OUT</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
