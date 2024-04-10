import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Modal, Text, View } from "../Themed";
import { Card } from "@rneui/base";
import { dbRef, deleteBooking, Booking, auth } from "@/app/database";
import { get, child } from "firebase/database";
import { errorToast, noBookingsResultsToast } from "../Toast";

import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Button from "../Button";

export default function BookingsScreenInfo({ path }: { path: string }) {
  const params = useLocalSearchParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [eventId, setEventId] = useState("");
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    const bookingsList: Booking[] = [];
    const bookedEvents: String[] = [];

    get(child(dbRef, "bookings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let bookingId = "";
          for (let i = 0; i < Object.keys(data).length; i++) {
            const accountId = data[Object.keys(data)[i]].account_id;
            bookingId = Object.keys(data)[i];
            const eventId = data[Object.keys(data)[i]].event_id;
            const dateBooked = data[Object.keys(data)[i]].date_booked;
            const timeBooked = data[Object.keys(data)[i]].time_booked;

            if (userId == accountId && dateBooked != "" && timeBooked != "") {
              bookedEvents.push(eventId);
            }
          }

          if (bookedEvents.length == 0) {
            noBookingsResultsToast();
          } else {
            get(child(dbRef, `events`))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val();

                  for (let i = 0; i < Object.keys(data).length; i++) {
                    let id = [Object.keys(data)[i]][0];
                    const searchedBooking = data[
                      Object.keys(data)[i]
                    ] as Booking;
                    if (bookedEvents.includes(id)) {
                      const booking: Booking = {
                        booked_tickets: searchedBooking.booked_tickets,
                        event_id: id,
                        title: searchedBooking.title,
                        date_time: searchedBooking.date_time,
                        location: searchedBooking.location,
                        date_time_updated: searchedBooking.date_time_updated,
                        max_tickets: searchedBooking.max_tickets,
                        booking_id: bookingId,
                      };
                      bookingsList.push(booking);
                    }
                  }
                  setBookings(
                    bookingsList.filter(
                      (booking, index) => bookingsList.indexOf(booking) == index
                    )
                  );
                } else {
                  noBookingsResultsToast();
                }
              })
              .catch((error) => {
                console.error(error);
                errorToast();
              });
          }
        }
        if (!bookingsList.length && !bookedEvents.length) {
          noBookingsResultsToast();
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const handleSubmit = (bookingId: string, eventId: string) => {
    setBookingId(bookingId);
    setEventId(eventId);
    console.log(bookingId);
    console.log(eventId);
    setDeleteModal(true);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
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
                  Are you sure that you want to delete this booking?
                </Text>
                <Button
                  title="Delete"
                  onPress={() => deleteBooking(bookingId, eventId)}
                />
              </View>
            </View>
          </Modal>
          <ScrollView>
            {bookings.map((booking) => (
              <Card key={booking.event_id}>
                <Card.Title style={styles.title}>{booking.title}</Card.Title>
                <Card.Divider />
                <Text
                  style={styles.text}
                  darkColor="rgba(0,0,0,0.8)"
                  lightColor="rgba(255,255,255,0.8)"
                >
                  Date and Time:{" "}
                  {String(new Date(booking.date_time).getDate()).padStart(
                    2,
                    "0"
                  ) +
                    "/" +
                    String(new Date(booking.date_time).getMonth() + 1).padStart(
                      2,
                      "0"
                    ) +
                    "/" +
                    new Date(booking.date_time).getFullYear() +
                    " " +
                    String(new Date(booking.date_time).getHours()) +
                    ":" +
                    String(new Date(booking.date_time).getMinutes()).padStart(
                      2,
                      "0"
                    )}
                </Text>
                <Text
                  style={styles.text}
                  darkColor="rgba(0,0,0,0.8)"
                  lightColor="rgba(255,255,255,0.8)"
                >
                  Location: {booking.location}
                </Text>
                <Text
                  style={styles.text}
                  darkColor="rgba(0,0,0,0.8)"
                  lightColor="rgba(255,255,255,0.8)"
                >
                  Description: {booking.description}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    handleSubmit(booking.booking_id, booking.event_id)
                  }
                >
                  <AntDesign name="delete" size={24} color="purple" />
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
