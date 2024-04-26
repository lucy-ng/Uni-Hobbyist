import { ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "../Themed";
import { Card } from "@rneui/base";
import { dbRef, deleteBooking, Booking, getAuth } from "@/app/database";
import { get, child } from "firebase/database";
import { errorToast, noBookingsResultsToast } from "../Toast";
import { AntDesign } from "@expo/vector-icons";
import Button from "../Button";
import Modal from "react-native-modal";
import { Icon } from "@rneui/themed";

export default function BookingsScreenInfo({ path }: { path: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [eventId, setEventId] = useState("");
  const [dateTimeSortIcon, setDateTimeSortIcon] = useState(
    "clock-time-four-outline"
  );
  const [nameSortIcon, setNameSortIcon] = useState("sort-alphabetical-variant");

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    const bookingsList: Booking[] = [];

    get(child(dbRef, "bookings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let i = 0; i < Object.keys(data).length; i++) {
            const accountId = data[Object.keys(data)[i]].account_id;
            const fetchedBookingId = Object.keys(data)[i];
            const eventId = data[Object.keys(data)[i]].event_id;
            const dateBooked = data[Object.keys(data)[i]].date_booked;
            const timeBooked = data[Object.keys(data)[i]].time_booked;

            if (userId == accountId && dateBooked != "" && timeBooked != "") {
              get(child(dbRef, `events`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const data = snapshot.val();

                    for (let i = 0; i < Object.keys(data).length; i++) {
                      let id = [Object.keys(data)[i]][0];
                      const searchedBooking = data[
                        Object.keys(data)[i]
                      ] as Booking;
                      if (eventId == id) {
                        const booking: Booking = {
                          booked_tickets: searchedBooking.booked_tickets,
                          event_id: id,
                          title: searchedBooking.title,
                          date_time: searchedBooking.date_time,
                          location: searchedBooking.location,
                          date_time_updated: searchedBooking.date_time_updated,
                          max_tickets: searchedBooking.max_tickets,
                          booking_id: fetchedBookingId,
                          description: searchedBooking.description,
                        };
                        bookingsList.push(booking);
                      }
                    }
                    setBookings(
                      bookingsList.filter(
                        (booking, index) =>
                          bookingsList.indexOf(booking) == index
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
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, []);

  const handleSubmit = (bookingIdValue: string, eventIdValue: string) => {
    setBookingId(bookingIdValue);
    setEventId(eventIdValue);
    setDeleteModal(true);
  };

  const changeDateTimeSortIcon = () => {
    if (dateTimeSortIcon == "clock-time-four-outline") {
      setBookings(
        bookings
          .filter((booking, index) => bookings.indexOf(booking) == index)
          .sort((a, b) =>
            new Date(a.date_time) > new Date(b.date_time) ? 1 : -1
          )
      );
      setDateTimeSortIcon("sort-clock-ascending");
    } else if (dateTimeSortIcon == "sort-clock-ascending") {
      setBookings(
        bookings
          .filter((booking, index) => bookings.indexOf(booking) == index)
          .sort((a, b) =>
            new Date(a.date_time) > new Date(b.date_time) ? -1 : 1
          )
      );
      setDateTimeSortIcon("sort-clock-descending");
    } else if (dateTimeSortIcon == "sort-clock-descending") {
      setBookings(
        bookings.filter((booking, index) => bookings.indexOf(booking) == index)
      );
      setDateTimeSortIcon("clock-time-four-outline");
    }
  };

  const changeNameSortIcon = () => {
    if (nameSortIcon == "sort-alphabetical-variant") {
      setBookings(
        bookings
          .filter((booking, index) => bookings.indexOf(booking) == index)
          .sort((a, b) => (a.title > b.title ? 1 : -1))
      );
      setNameSortIcon("sort-alphabetical-ascending-variant");
    } else if (nameSortIcon == "sort-alphabetical-ascending-variant") {
      setBookings(
        bookings
          .filter((booking, index) => bookings.indexOf(booking) == index)
          .sort((a, b) => (a.title > b.title ? -1 : 1))
      );
      setNameSortIcon("sort-alphabetical-descending-variant");
    } else if (nameSortIcon == "sort-alphabetical-descending-variant") {
      setBookings(
        bookings.filter((booking, index) => bookings.indexOf(booking) == index)
      );
      setNameSortIcon("sort-alphabetical-variant");
    }
  };

  return (
    <>
      <View style={styles.bodyContainer}>
        {/*
        React Native Community, 2022. react-native-modal. [Online]
        Available at: https://github.com/react-native-modal/react-native-modal
        [Accessed 12 April 2024].
        */}
        <Modal isVisible={deleteModal} hasBackdrop={true} backdropOpacity={0.8}>
          <View
            darkColor="#CAC4CE"
            lightColor="#CAC4CE"
            style={styles.modalInfoView}
          >
            <AntDesign
              name="closecircle"
              size={24}
              color="#8D86C9"
              onPress={() => setDeleteModal(false)}
              style={styles.closeIcon}
            />
            <Text style={styles.altText} lightColor="black" darkColor="black">
              Are you sure that you want to delete this booking?
            </Text>
            <Button
              title="Delete"
              onPress={() => deleteBooking(bookingId, eventId)}
            />
          </View>
        </Modal>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 30 }}
        >
          <View style={styles.sortBox}>
            <Pressable onPress={() => changeDateTimeSortIcon()}>
              <Icon
                name={dateTimeSortIcon}
                type={"material-community"}
                color={"#8D86C9"}
              />
            </Pressable>
            <Pressable onPress={() => changeNameSortIcon()}>
              <Icon
                name={nameSortIcon}
                type={"material-community"}
                color={"#8D86C9"}
                style={styles.endSortIcon}
              />
            </Pressable>
          </View>

          {bookings.map((booking) => (
            <Card
              key={booking.event_id}
              containerStyle={{
                shadowColor: "#CAC4CE",
                shadowRadius: 3,
                shadowOpacity: 0.5,
                minWidth: "83%",
                maxWidth: "92%",
                paddingBottom: 70,
              }}
            >
              <Card.Title style={styles.title}>{booking.title}</Card.Title>
              <Card.Divider />
              <Text
                style={styles.cardText}
                lightColor="black"
                darkColor="black"
              >
                Date and Time:{" "}
              </Text>
              <Text style={styles.text} darkColor="black" lightColor="black">
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
              <Text>{"\n"}</Text>
              <Text
                style={styles.cardText}
                lightColor="black"
                darkColor="black"
              >
                Location:
              </Text>
              <Text style={styles.text} darkColor="black" lightColor="black">
                {booking.location}
              </Text>
              <Text>{"\n"}</Text>
              <Text
                style={styles.cardText}
                darkColor="black"
                lightColor="black"
              >
                Description:
              </Text>
              <Text style={styles.text} darkColor="black" lightColor="black">
                {booking.description}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  handleSubmit(booking.booking_id, booking.event_id)
                }
              >
                <AntDesign name="delete" size={24} color="#8D86C9" />
              </TouchableOpacity>
            </Card>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
