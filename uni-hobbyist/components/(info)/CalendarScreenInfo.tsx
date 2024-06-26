import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "../Themed";
import CalendarStrip from "react-native-calendar-strip";
import { errorToast } from "../Toast";
import { child, get } from "firebase/database";
import {
  getAuth,
  dbRef,
  type Event,
  Booking,
  deleteBooking,
} from "@/app/database";
import { manageEventAction } from "@/app/actions";
import { Card } from "@rneui/base";
import { ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Button from "../Button";

export default function CalendarScreenInfo({ path }: { path: string }) {
  const startYear = new Date(new Date().getFullYear(), 0, 1);
  const endYear = new Date(new Date().getFullYear(), 11, 31);
  const dateToday = new Date();

  const [dateValue, setDateValue] = useState(dateToday);
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [eventId, setEventId] = useState("");

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : "";

  useEffect(() => {
    const eventsList: Event[] = [];
    const bookingsList: Booking[] = [];
    const eventDates: Date[] = [];

    const selectedDateDay = String(dateValue.getDate()).padStart(2, "0");
    const selectedDateMonth = String(dateValue.getMonth() + 1).padStart(2, "0");
    const selectedDateYear = dateValue.getFullYear();
    const selectedDate =
      selectedDateDay + "/" + selectedDateMonth + "/" + selectedDateYear;

    get(child(dbRef, "bookings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let i = 0; i < Object.keys(data).length; i++) {
            const accountId = data[Object.keys(data)[i]].account_id;
            const fetchedBookingId = Object.keys(data)[i];
            const eventId = data[Object.keys(data)[i]].event_id;
            let dateBooked = data[Object.keys(data)[i]].date_booked;
            let timeBooked = data[Object.keys(data)[i]].time_booked;

            // fetch hosted events
            if (userId == accountId && dateBooked == "" && timeBooked == "") {
              get(child(dbRef, `events`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const data = snapshot.val();

                    for (let i = 0; i < Object.keys(data).length; i++) {
                      let id = [Object.keys(data)[i]][0];
                      const event = data[Object.keys(data)[i]] as Event;

                      const eventDay = String(
                        new Date(event.date_time).getDate()
                      ).padStart(2, "0");
                      const eventMonth = String(
                        new Date(event.date_time).getMonth() + 1
                      ).padStart(2, "0");
                      const eventYear = new Date(event.date_time).getFullYear();
                      const eventDate =
                        eventDay + "/" + eventMonth + "/" + eventYear;

                      if (eventId == id) {
                        eventDates.push(new Date(event.date_time));
                      }

                      if (eventId == id && selectedDate == eventDate) {
                        const eventData: Event = {
                          id: id,
                          title: event.title,
                          booked_tickets: event.booked_tickets,
                          date_time: event.date_time,
                          date_time_updated: event.date_time_updated,
                          location: event.location,
                          max_tickets: event.max_tickets,
                          description: event.description,
                          tags: event.tags ?? [],
                        };
                        eventsList.push(eventData);
                      }
                    }

                    setEvents(
                      eventsList.filter(
                        (event, index) => eventsList.indexOf(event) == index
                      )
                    );
                  }
                })
                .catch((error) => {
                  console.error(error);
                  errorToast();
                });
            } else if (
              userId == accountId &&
              dateBooked != "" &&
              timeBooked != ""
            ) {
              // fetch bookings
              get(child(dbRef, `events`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const data = snapshot.val();

                    for (let i = 0; i < Object.keys(data).length; i++) {
                      let id = [Object.keys(data)[i]][0];
                      const searchedBooking = data[
                        Object.keys(data)[i]
                      ] as Booking;

                      const bookingDay = String(
                        new Date(searchedBooking.date_time).getDate()
                      ).padStart(2, "0");
                      const bookingMonth = String(
                        new Date(searchedBooking.date_time).getMonth() + 1
                      ).padStart(2, "0");
                      const bookingYear = new Date(
                        searchedBooking.date_time
                      ).getFullYear();
                      const bookingDate =
                        bookingDay + "/" + bookingMonth + "/" + bookingYear;

                      if (eventId == id) {
                        eventDates.push(new Date(searchedBooking.date_time));
                      }

                      if (eventId == id && selectedDate == bookingDate) {
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
                  }
                })
                .catch((error) => {
                  console.error(error);
                  errorToast();
                });
            }
          }
          setDates(eventDates);
        }
      })
      .catch((error) => {
        console.error(error);
        errorToast();
      });
  }, [dateValue]);

  // set selected date
  const markedDatesArray: any[] = [
    {
      date: dateValue,
      dots: [
        {
          color: "#8D86C9",
          selectedColor: "#8D86C9",
        },
      ],
    },
  ];

  // set lines under dates with events
  dates.map((date, index) => {
    markedDatesArray.push({
      key: index,
      date: date,
      lines: [
        {
          color: "#9067C6",
          selectedColor: "#9067C6",
        },
      ],
    });
  });

  const selectedDateAction = (moment: moment.Moment) => {
    const selectedDate = moment.toDate();
    setDateValue(selectedDate);
  };

  const handleSubmit = (bookingIdValue: string, eventIdValue: string) => {
    setBookingId(bookingIdValue);
    setEventId(eventIdValue);
    setDeleteModal(true);
  };

  return (
    <>
      <View
        style={
          (styles.bodyHeaderContainer,
          { minHeight: "100%", minWidth: "100%", flex: 1 })
        }
      >
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
        {/*
        Begovic, Bogdan 2022. react-native-calendar-strip. [Online]
        Available at: https://github.com/BugiDev/react-native-calendar-strip
        [Accessed 28 April 2024].
        */}
        <CalendarStrip
          style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={"white"}
          startingDate={dateValue}
          markedDates={markedDatesArray}
          minDate={startYear}
          maxDate={endYear}
          onDateSelected={(moment) => selectedDateAction(moment)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 100, maxHeight: "85%" }}
        >
          <View style={styles.bodyHeaderContainer}>
            {bookings.map((booking) => (
              <Card
                key={booking.booking_id}
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
            {events.map((event) => (
              <Card
                key={event.id}
                containerStyle={{
                  shadowColor: "#CAC4CE",
                  shadowRadius: 3,
                  shadowOpacity: 0.5,
                  minWidth: "83%",
                  maxWidth: "92%",
                  paddingBottom: 70,
                }}
              >
                <Card.Title style={styles.title}>{event.title}</Card.Title>
                <Card.Divider />
                <Text
                  style={styles.cardText}
                  lightColor="black"
                  darkColor="black"
                >
                  Date and Time:{" "}
                </Text>
                <Text style={styles.text} darkColor="black" lightColor="black">
                  {String(new Date(event.date_time).getDate()).padStart(
                    2,
                    "0"
                  ) +
                    "/" +
                    String(new Date(event.date_time).getMonth() + 1).padStart(
                      2,
                      "0"
                    ) +
                    "/" +
                    new Date(event.date_time).getFullYear() +
                    " " +
                    String(new Date(event.date_time).getHours()) +
                    ":" +
                    String(new Date(event.date_time).getMinutes()).padStart(
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
                  {event.location}
                </Text>
                <Text>{"\n"}</Text>
                <Text
                  style={styles.cardText}
                  lightColor="black"
                  darkColor="black"
                >
                  Tickets Booked:{" "}
                </Text>
                {/*
                  anubhava, 2020. regex: remove leading zeros, but keep single zero. [Online]
                  Available at: https://stackoverflow.com/questions/60509557/regex-remove-leading-zeros-but-keep-single-zero
                  [Accessed 14 April 2024].
                  */}
                <Text style={styles.text} darkColor="black" lightColor="black">
                  {String(event.booked_tickets).replace(
                    /^(?:0+(?=[1-9])|0+(?=0$))/gm,
                    ""
                  )}{" "}
                  /{" "}
                  {String(event.max_tickets).replace(
                    /^(?:0+(?=[1-9])|0+(?=0$))/gm,
                    ""
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    manageEventAction(event);
                  }}
                  key={event.id}
                  style={styles.editButton}
                >
                  <AntDesign name="edit" size={24} color="#8D86C9" />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
