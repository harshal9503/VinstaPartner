import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../theme/colors';
import { getFontFamily, getFontWeight } from '../utils/fontHelper';

const { width } = Dimensions.get('window');

const StoreHours = ({ navigation }: any) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [closedDates, setClosedDates] = useState<string[]>([]);

  const onDateChange = (_: any, date?: Date) => {
    setShowCalendar(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const addDate = () => {
    if (!selectedDate) return;
    const formatted = selectedDate.toDateString();
    if (!closedDates.includes(formatted)) {
      setClosedDates(prev => [...prev, formatted]);
    }
    setSelectedDate(null);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Set Store Hours</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Section */}
        <Text style={styles.sectionTitle}>Set Store Hours</Text>
        <Text style={styles.sectionDesc}>
          Please submit the following details to complete your restaurant hours
        </Text>

        {/* Opening time */}
        <Text style={styles.label}>Opening time</Text>
        <TextInput
          style={styles.input}
          placeholder="8.00 a.m."
          placeholderTextColor={COLORS.placeholder}
        />

        {/* Closing time */}
        <Text style={styles.label}>Closing time</Text>
        <TextInput
          style={styles.input}
          placeholder="12.00 p.m."
          placeholderTextColor={COLORS.placeholder}
        />

        {/* Break hours */}
        <Text style={styles.label}>Break hours (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="1 hr (2-3 p.m.)"
          placeholderTextColor={COLORS.placeholder}
        />

        {/* Special holiday */}
        <Text style={styles.label}>Special holiday hours</Text>
        <TextInput
          style={styles.input}
          placeholder="Sunday opening time 12 a.m."
          placeholderTextColor={COLORS.placeholder}
        />

        {/* Closed days */}
        <Text style={styles.label}>Days when the store is closed</Text>
        <View style={styles.calendarBox}>
          <View style={styles.dateList}>
            {closedDates.map(date => (
              <Text key={date} style={styles.dateItem}>
                {date}
              </Text>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            style={styles.calendarBtn}
          >
            <Image
              source={require('../assets/calendar.png')}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        {selectedDate && (
          <TouchableOpacity style={styles.addBtn} onPress={addDate}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Next */}
      <TouchableOpacity
        style={styles.nextButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('SelectDeliveryZones')}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

      {/* Calendar */}
      {showCalendar && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
          accentColor={COLORS.primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 10 : 30,

    paddingBottom: 140,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  headerTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },

  /* Section */
  sectionTitle: {
    fontSize: 22,
    color: COLORS.primary,
    fontFamily: getFontFamily('Bold'),
    marginBottom: 6,
  },

  sectionDesc: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 18,
    fontFamily: getFontFamily('Medium'),
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 15,
    color: COLORS.text,
  },

  /* Calendar */
  calendarBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  dateList: {
    flex: 1,
  },

  dateItem: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
  },

  calendarBtn: {
    marginLeft: 12,
  },

  calendarIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.primary,
  },

  addBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },

  addText: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: getFontFamily('Medium'),
  },

  /* Next */
  nextButton: {
    position: 'absolute',
    bottom: 24,
    left: width * 0.06,
    right: width * 0.06,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  nextText: {
    fontSize: 18,
    color: COLORS.secondary,
    fontFamily: getFontFamily('Bold'),
    fontWeight: getFontWeight('Bold'),
  },
});

export default StoreHours;
