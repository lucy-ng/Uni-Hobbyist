import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../Styles";
import { useEffect, useState } from "react";
import { Text } from "../Themed";
import { Card } from "@rneui/base";
import { fetchBookings, type Event, Booking, dbRef } from "@/app/database";
import { manageBookingAction, manageEventAction } from "@/app/actions";
import { ref, getDatabase, get, child } from "firebase/database";
import { errorToast, noBookingsResultsToast } from "../Toast";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function BookingsScreenInfo({ path }: { path: string }) {
  const params = useLocalSearchParams();
  const [bookings, setBookings] = useState<Event[]>(
    fetchBookings(String(params.accountId)) || []
  );

  useEffect(() => {
    let bookingsList: Event[] = [];

    get(child(dbRef, `bookings`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let i = 0; i < Object.keys(data).length; i++) {
            let id = data[Object.keys(data)[i]].account_id;
            if (id == String(params.accountId)) {
              let eventId = data[Object.keys(data)[i]].event_id;

              get(child(dbRef, `events/${eventId}`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    const data = snapshot.val();
                    bookingsList.push(data as Event);
                  } else {
                    noBookingsResultsToast();
                  }
                })
                .catch((error) => {
                  console.error(error);
                  noBookingsResultsToast();
                });
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
        noBookingsResultsToast();
      });
  }, []);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            {bookings.map((booking) => (
              <TouchableOpacity
                onPress={() => {
                  manageBookingAction(booking);
                }}
                key={booking.id}
              >
                <Card key={booking.id}>
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
                      String(
                        new Date(booking.date_time).getMonth() + 1
                      ).padStart(2, "0") +
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
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
