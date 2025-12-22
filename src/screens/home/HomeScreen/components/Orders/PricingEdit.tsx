import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../../theme/colors';
import { getFontFamily } from '../../../../../utils/fontHelper';

const { width, height } = Dimensions.get('window');

const PricingEdit = () => {
  const navigation = useNavigation();
  const [itemPrice, setItemPrice] = useState('Rs 450');
  const [displayPrice, setDisplayPrice] = useState('Rs 400');
  const [smallPrice, setSmallPrice] = useState('Rs 400');
  const [mediumPrice, setMediumPrice] = useState('Rs 400');
  const [largePrice, setLargePrice] = useState('Rs 400');
  const [halfPrice, setHalfPrice] = useState('Rs 400');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSavePress = () => {
    // Add your save logic here (API call, etc.)
    console.log('Saving prices:', {
      itemPrice,
      displayPrice,
      smallPrice,
      mediumPrice,
      largePrice,
      halfPrice,
    });
    navigation.navigate('PricingBrowse' as never);
  };

  const handleCancelPress = () => {
    navigation.navigate('PricingBrowse' as never);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit price</Text>
            <Text style={styles.subtitle}>You can edit pricing from here</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              isKeyboardVisible && styles.scrollContentKeyboardActive,
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* ITEM PRICE */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Item Price</Text>
              <TextInput
                style={styles.input}
                value={itemPrice}
                onChangeText={setItemPrice}
                placeholder="Rs 450"
                placeholderTextColor="#9E9E9E"
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>

            {/* DISPLAY PRICE */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Display Price{' '}
                <Text style={styles.muted}>(the price customers will see)</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={displayPrice}
                onChangeText={setDisplayPrice}
                placeholder="Rs 400"
                placeholderTextColor="#9E9E9E"
                keyboardType="numeric"
                returnKeyType="next"
              />
            </View>

            {/* VARIANTS */}
            <View style={styles.variantsSection}>
              <Text style={styles.variantTitle}>
                Variants / Portions{' '}
                <Text style={styles.muted}>(If applicable)</Text>
              </Text>

              {/* SMALL */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Small</Text>
                <TextInput
                  style={styles.input}
                  value={smallPrice}
                  onChangeText={setSmallPrice}
                  placeholder="Rs 400"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>

              {/* MEDIUM */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Medium</Text>
                <TextInput
                  style={styles.input}
                  value={mediumPrice}
                  onChangeText={setMediumPrice}
                  placeholder="Rs 400"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>

              {/* LARGE */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Large</Text>
                <TextInput
                  style={styles.input}
                  value={largePrice}
                  onChangeText={setLargePrice}
                  placeholder="Rs 400"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>

              {/* HALF */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Half</Text>
                <TextInput
                  style={styles.input}
                  value={halfPrice}
                  onChangeText={setHalfPrice}
                  placeholder="Rs 400"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>
          </ScrollView>

          {/* FIXED BUTTONS - Always visible above keyboard */}
          <View
            style={[
              styles.buttonContainer,
              isKeyboardVisible && styles.buttonContainerKeyboardActive,
            ]}
          >
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={handleCancelPress}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSavePress}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PricingEdit;

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: width * 0.06,
    paddingTop: 24,
    paddingBottom: 10,
  },

  title: {
    fontSize: 22,
    fontFamily: getFontFamily('Bold'),
    color: COLORS.primary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    color: '#777',
    marginBottom: 10,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: width * 0.06,
    paddingBottom: 100,
  },

  scrollContentKeyboardActive: {
    paddingBottom: 200, // Extra padding when keyboard is open
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontFamily: getFontFamily('Medium'),
    color: COLORS.text,
    marginBottom: 6,
  },

  muted: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: getFontFamily('Regular'),
  },

  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 14,
    fontFamily: getFontFamily('Regular'),
    backgroundColor: '#fff',
    minHeight: 48,
  },

  variantsSection: {
    marginTop: 10,
  },

  variantTitle: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.primary,
    marginBottom: 16,
  },

  buttonContainer: {
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  buttonContainerKeyboardActive: {
    paddingBottom: Platform.OS === 'ios' ? 35 : 16,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },

  cancelText: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: COLORS.primary,
  },

  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveText: {
    fontSize: 15,
    fontFamily: getFontFamily('SemiBold'),
    color: '#fff',
  },
});
