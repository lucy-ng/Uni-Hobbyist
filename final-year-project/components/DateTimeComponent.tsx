import { useState } from "react";
import { SafeAreaView } from "react-native";
import Button from "./Button";
import { Text } from "./Themed";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

/*
React Native Community, 2024. react-native-datetimepicker. [Online] 
Available at: https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#getting-started
[Accessed 28 March 2024].
*/

export const DateTimeComponent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Date" />
      <Button onPress={showTimepicker} title="Time" />
      {show && (
        <DateTimePicker
          value={date}
          mode={mode as any}
          is24Hour={true}
          onChange={e => onChange(e, date)}
        />
      )}
      <Text>Selected: {date.toLocaleString()}</Text>
    </SafeAreaView>
  );
};
