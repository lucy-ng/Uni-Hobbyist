import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Modal, Text, View } from "../Themed";
import { Card } from "@rneui/base";
import { dbRef, deleteBooking, Booking } from "@/app/database";
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

  useEffect(() => {
    let bookingsList: Booking[] = [];

    get(child(dbRef, `bookings`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let i = 0; i < Object.keys(data).length; i++) {
            let id = data[Object.keys(data)[i]].account_id;
            if (id == String(params.accountId)) {
              let eventId = data[Object.keys(data)[i]].event_id;
              let dateBooked = data[Object.keys(data)[i]].date_booked;
              let timeBooked = data[Object.keys(data)[i]].time_booked;
              let bookingId = Object.keys(data)[i];

              if (dateBooked != "" && timeBooked != "") {
                get(child(dbRef, `events/${eventId}`))
                  .then((snapshot) => {
                    if (snapshot.exists()) {
                      const data = snapshot.val();
                      bookingsList.push(data as Booking);
                      bookingsList[i].booking_id = bookingId;
                      bookingsList[i].event_id = eventId;
                      setBookings(bookingsList);
                    }
                    else {
                      noBookingsResultsToast()
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    errorToast();
                  });
              }
            }
          }
        } else {
          noBookingsResultsToast();
        }
        
        if (!bookingsList.length) {
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
    setDeleteModal(true);
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            <Modal
              visible={deleteModal}
              animationType="slide"
              transparent={true}
            >
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
