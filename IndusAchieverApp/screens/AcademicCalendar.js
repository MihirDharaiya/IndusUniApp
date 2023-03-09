import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1 }}>
    {/* <Calendar
      onDayPress={onDayPress}
      markedDates={{ [selectedDate]: { selected: true } }}
    /> */}
    <Text>Calendars</Text>
  </View>
);
}
const styles = StyleSheet.create({

});

export default AcademicCalendar