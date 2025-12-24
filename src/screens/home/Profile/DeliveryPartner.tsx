import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';

const { width } = Dimensions.get('window');
const rs = (size: number) => (width / 375) * size;

const HEADER_HEIGHT = rs(56);
const ANDROID_STATUS_BAR = StatusBar.currentHeight ?? 0;

// Types
type DeliveryPartner = {
  id: string;
  name: string;
  type: string;
  status: string;
  availability: string;
  vehicleType: string;
  contact: string;
  completedOrders: number;
  isActive: boolean;
  staffList: string[];
};

type FormData = {
  name: string;
  type: string;
  contact: string;
  vehicleType: string;
  availability: string;
};

const DeliveryPartners = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation<any>();
  
  // State for delivery partners
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([
    {
      id: '1',
      name: 'John Doe',
      type: 'Restaurant-owned',
      status: 'Active',
      availability: 'Available',
      vehicleType: 'Bike',
      contact: '+91 98765 43210',
      completedOrders: 120,
      isActive: true,
      staffList: ['Staff 1', 'Staff 2', 'Staff 3']
    },
    {
      id: '2',
      name: 'Jane Smith',
      type: 'Third-party',
      status: 'Active',
      availability: 'On Delivery',
      vehicleType: 'Car',
      contact: '+91 98765 43211',
      completedOrders: 85,
      isActive: true,
      staffList: ['Staff 1', 'Staff 2']
    },
    {
      id: '3',
      name: 'Mike Johnson',
      type: 'Restaurant-owned',
      status: 'Inactive',
      availability: 'Unavailable',
      vehicleType: 'Bike',
      contact: '+91 98765 43212',
      completedOrders: 45,
      isActive: false,
      staffList: ['Staff 1']
    }
  ]);

  // Modal states
  const [showPartnersList, setShowPartnersList] = useState(false);
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<DeliveryPartner | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: 'Restaurant-owned',
    contact: '',
    vehicleType: 'Bike',
    availability: 'Available'
  });

  // Initialize form when editing
  useEffect(() => {
    if (selectedPartner && isEditMode) {
      setFormData({
        name: selectedPartner.name,
        type: selectedPartner.type,
        contact: selectedPartner.contact,
        vehicleType: selectedPartner.vehicleType,
        availability: selectedPartner.availability
      });
    } else {
      setFormData({
        name: '',
        type: 'Restaurant-owned',
        contact: '',
        vehicleType: 'Bike',
        availability: 'Available'
      });
    }
  }, [selectedPartner, isEditMode]);

  // Calculate summary data
  const summaryData = [
    { label: 'Delivery Partner Type', value: 'Mixed (Restaurant & 3rd Party)' },
    { label: 'Delivery Staff List', value: `${deliveryPartners.reduce((acc, partner) => acc + partner.staffList.length, 0)} Active Staff` },
    { label: 'Delivery Partner Availability', value: `${deliveryPartners.filter(p => p.availability === 'Available').length} Available` },
    { label: 'Active / Inactive Status', value: `${deliveryPartners.filter(p => p.isActive).length} Active, ${deliveryPartners.filter(p => !p.isActive).length} Inactive` },
    { label: 'Assigned Orders History', value: `${deliveryPartners.reduce((acc, partner) => acc + partner.completedOrders, 0)} Orders Completed` },
    { label: 'Total Delivery Partners', value: `${deliveryPartners.length} Partners` },
  ];

  const handleAddEditPartner = () => {
    setShowPartnersList(true);
  };

  const handleSelectPartner = (partner: DeliveryPartner) => {
    setSelectedPartner(partner);
    setIsEditMode(true);
    setShowPartnersList(false);
    setShowAddEditForm(true);
  };

  const handleAddNewPartner = () => {
    setSelectedPartner(null);
    setIsEditMode(false);
    setShowPartnersList(false);
    setShowAddEditForm(true);
  };

  const handleSavePartner = () => {
    if (!formData.name || !formData.contact) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    if (isEditMode && selectedPartner) {
      // Update existing partner
      setDeliveryPartners(prev => prev.map(partner =>
        partner.id === selectedPartner.id
          ? {
              ...partner,
              ...formData,
              completedOrders: partner.completedOrders,
              isActive: partner.isActive,
              staffList: partner.staffList
            }
          : partner
      ));
    } else {
      // Add new partner
      const newPartner: DeliveryPartner = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        status: 'Active',
        availability: formData.availability,
        vehicleType: formData.vehicleType,
        contact: formData.contact,
        completedOrders: 0,
        isActive: true,
        staffList: []
      };
      setDeliveryPartners(prev => [...prev, newPartner]);
    }

    setShowAddEditForm(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const togglePartnerStatus = (partnerId: string) => {
    setDeliveryPartners(prev => prev.map(partner =>
      partner.id === partnerId
        ? { ...partner, isActive: !partner.isActive, status: !partner.isActive ? 'Active' : 'Inactive' }
        : partner
    ));
  };

  const renderPartnersListModal = () => (
    <Modal
      visible={showPartnersList}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPartnersList(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Delivery Partners
            </Text>
            <TouchableOpacity onPress={() => setShowPartnersList(false)}>
              <Text style={[styles.closeButton, { color: COLORS.primary }]}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.partnersList}>
            {deliveryPartners.map((partner) => (
              <TouchableOpacity
                key={partner.id}
                style={[styles.partnerItem, { borderBottomColor: colors.border }]}
                onPress={() => handleSelectPartner(partner)}
              >
                <View style={styles.partnerInfo}>
                  <Text style={[styles.partnerName, { color: colors.text }]}>
                    {partner.name}
                  </Text>
                  <View style={styles.partnerDetailsRow}>
                    <Text style={[styles.partnerDetail, { color: colors.textSecondary }]}>
                      {partner.type} • {partner.vehicleType}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: partner.isActive ? '#4CAF50' : '#FF5252' }
                    ]}>
                      <Text style={styles.statusText}>
                        {partner.isActive ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.partnerContact, { color: colors.textSecondary }]}>
                    {partner.contact}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.addNewButton}
            onPress={handleAddNewPartner}
          >
            <Text style={styles.addNewButtonText}>Add New Delivery Partner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderAddEditFormModal = () => (
    <Modal
      visible={showAddEditForm}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAddEditForm(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {isEditMode ? 'Edit Delivery Partner' : 'Add Delivery Partner'}
            </Text>
            <TouchableOpacity onPress={() => setShowAddEditForm(false)}>
              <Text style={[styles.closeButton, { color: COLORS.primary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Partner Name *
              </Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: theme === 'dark' ? '#2D2D2D' : '#F5F5F5',
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Enter partner name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Delivery Partner Type
              </Text>
              <View style={styles.radioGroup}>
                {['Restaurant-owned', 'Third-party', 'Contract-based'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.radioOption}
                    onPress={() => setFormData(prev => ({ ...prev, type }))}
                  >
                    <View style={[
                      styles.radioCircle,
                      { borderColor: COLORS.primary }
                    ]}>
                      {formData.type === type && (
                        <View style={[styles.radioSelected, { backgroundColor: COLORS.primary }]} />
                      )}
                    </View>
                    <Text style={[styles.radioLabel, { color: colors.text }]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Contact Details *
              </Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: theme === 'dark' ? '#2D2D2D' : '#F5F5F5',
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                value={formData.contact}
                onChangeText={(text) => setFormData(prev => ({ ...prev, contact: text }))}
                placeholder="Enter contact number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Vehicle Type
              </Text>
              <View style={styles.selectContainer}>
                {['Bike', 'Car', 'Scooter', 'Cycle', 'Walk'].map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle}
                    style={[
                      styles.selectOption,
                      { 
                        backgroundColor: formData.vehicleType === vehicle 
                          ? COLORS.primary 
                          : theme === 'dark' ? '#2D2D2D' : '#F5F5F5',
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, vehicleType: vehicle }))}
                  >
                    <Text style={[
                      styles.selectOptionText,
                      { color: formData.vehicleType === vehicle ? '#FFFFFF' : colors.text }
                    ]}>
                      {vehicle}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: colors.text }]}>
                Availability Status
              </Text>
              <View style={styles.selectContainer}>
                {['Available', 'On Delivery', 'Break', 'Unavailable'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.selectOption,
                      { 
                        backgroundColor: formData.availability === status 
                          ? COLORS.primary 
                          : theme === 'dark' ? '#2D2D2D' : '#F5F5F5',
                        borderColor: colors.border
                      }
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, availability: status }))}
                  >
                    <Text style={[
                      styles.selectOptionText,
                      { color: formData.availability === status ? '#FFFFFF' : colors.text }
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePartner}
          >
            <Text style={styles.saveButtonText}>
              {isEditMode ? 'Update Partner' : 'Save Partner'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSuccessPopup = () => (
    <Modal
      visible={showSuccessPopup}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.successPopupOverlay}>
        <View style={styles.successPopup}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>
          <Text style={styles.successText}>
            Partner {isEditMode ? 'Updated' : 'Added'} Successfully!
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* ---------- HEADER ---------- */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44),
            height:
              HEADER_HEIGHT +
              (Platform.OS === 'android' ? ANDROID_STATUS_BAR : rs(44)),
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/back.png')}
            style={[styles.backIcon, { tintColor: colors.text }]}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Delivery Partners
        </Text>

        <View style={{ width: rs(22) }} />
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Summary Cards */}
        {summaryData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
              },
            ]}
          >
            <Text style={[styles.label, { color: COLORS.primary }]}>
              {item.label}
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {item.value}
            </Text>
          </View>
        ))}

        {/* Delivery Partners List */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            All Delivery Partners ({deliveryPartners.length})
          </Text>
        </View>

        {deliveryPartners.map((partner) => (
          <View
            key={partner.id}
            style={[
              styles.partnerCard,
              {
                backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
              },
            ]}
          >
            <View style={styles.partnerCardHeader}>
              <View>
                <Text style={[styles.partnerCardName, { color: colors.text }]}>
                  {partner.name}
                </Text>
                <Text style={[styles.partnerCardType, { color: colors.textSecondary }]}>
                  {partner.type} • {partner.vehicleType}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.statusToggle,
                  { backgroundColor: partner.isActive ? '#4CAF50' : '#FF5252' }
                ]}
                onPress={() => togglePartnerStatus(partner.id)}
              >
                <Text style={styles.statusToggleText}>
                  {partner.isActive ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.partnerCardDetails}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Contact
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {partner.contact}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Availability
                </Text>
                <Text style={[
                  styles.detailValue,
                  { 
                    color: partner.availability === 'Available' ? '#4CAF50' : 
                           partner.availability === 'On Delivery' ? '#FF9800' : '#FF5252'
                  }
                ]}>
                  {partner.availability}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                  Completed Orders
                </Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {partner.completedOrders}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* ---------- ADD / EDIT BUTTON ---------- */}
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={handleAddEditPartner}
        >
          <Text style={styles.actionText}>
            Add / Edit Delivery Partner
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      {renderPartnersListModal()}
      {renderAddEditFormModal()}
      {renderSuccessPopup()}
    </View>
  );
};

export default DeliveryPartners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backIcon: {
    width: rs(22),
    height: rs(22),
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  scrollContent: {
    padding: rs(16),
    paddingBottom: rs(40),
  },

  infoCard: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  label: {
    fontSize: rs(15),
    marginBottom: rs(6),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  value: {
    fontSize: rs(15),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  sectionHeader: {
    marginTop: rs(24),
    marginBottom: rs(12),
  },

  sectionTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  partnerCard: {
    padding: rs(16),
    borderRadius: rs(12),
    marginBottom: rs(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  partnerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(12),
  },

  partnerCardName: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
    marginBottom: rs(4),
  },

  partnerCardType: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  statusToggle: {
    paddingHorizontal: rs(12),
    paddingVertical: rs(6),
    borderRadius: rs(20),
  },

  statusToggleText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  partnerCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  detailItem: {
    width: '48%',
    marginBottom: rs(8),
  },

  detailLabel: {
    fontSize: rs(12),
    fontFamily: getFontFamily('Figtree', 'Regular'),
    fontWeight: getFontWeight('400'),
    marginBottom: rs(2),
  },

  detailValue: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  actionBtn: {
    marginTop: rs(24),
    backgroundColor: COLORS.primary,
    paddingVertical: rs(14),
    borderRadius: rs(12),
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    borderTopLeftRadius: rs(20),
    borderTopRightRadius: rs(20),
    paddingBottom: Platform.OS === 'ios' ? rs(34) : rs(24),
    maxHeight: '80%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rs(16),
    paddingVertical: rs(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  modalTitle: {
    fontSize: rs(18),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  closeButton: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  partnersList: {
    maxHeight: rs(400),
  },

  partnerItem: {
    padding: rs(16),
    borderBottomWidth: 1,
  },

  partnerInfo: {
    flex: 1,
  },

  partnerName: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
    marginBottom: rs(4),
  },

  partnerDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(4),
  },

  partnerDetail: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  statusBadge: {
    paddingHorizontal: rs(8),
    paddingVertical: rs(2),
    borderRadius: rs(12),
  },

  statusText: {
    color: '#FFFFFF',
    fontSize: rs(12),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  partnerContact: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Regular'),
    fontWeight: getFontWeight('400'),
  },

  addNewButton: {
    marginHorizontal: rs(16),
    marginTop: rs(16),
    backgroundColor: COLORS.primary,
    paddingVertical: rs(14),
    borderRadius: rs(12),
    alignItems: 'center',
  },

  addNewButtonText: {
    color: '#FFFFFF',
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  // Form Styles
  formContainer: {
    paddingHorizontal: rs(16),
    maxHeight: rs(500),
  },

  formGroup: {
    marginBottom: rs(20),
  },

  formLabel: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
    marginBottom: rs(8),
  },

  formInput: {
    borderWidth: 1,
    borderRadius: rs(8),
    paddingHorizontal: rs(12),
    paddingVertical: rs(12),
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Regular'),
    fontWeight: getFontWeight('400'),
  },

  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rs(8),
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rs(16),
    marginBottom: rs(12),
  },

  radioCircle: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(10),
    borderWidth: 2,
    marginRight: rs(8),
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    width: rs(10),
    height: rs(10),
    borderRadius: rs(5),
  },

  radioLabel: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Regular'),
    fontWeight: getFontWeight('400'),
  },

  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: rs(8),
  },

  selectOption: {
    paddingHorizontal: rs(12),
    paddingVertical: rs(8),
    borderRadius: rs(8),
    borderWidth: 1,
    marginRight: rs(8),
    marginBottom: rs(8),
  },

  selectOptionText: {
    fontSize: rs(14),
    fontFamily: getFontFamily('Figtree', 'Medium'),
    fontWeight: getFontWeight('500'),
  },

  saveButton: {
    marginHorizontal: rs(16),
    marginTop: rs(16),
    backgroundColor: COLORS.primary,
    paddingVertical: rs(14),
    borderRadius: rs(12),
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
  },

  // Success Popup
  successPopupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successPopup: {
    backgroundColor: '#FFFFFF',
    padding: rs(24),
    borderRadius: rs(16),
    alignItems: 'center',
    minWidth: rs(200),
  },

  successIcon: {
    width: rs(48),
    height: rs(48),
    borderRadius: rs(24),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: rs(12),
  },

  successIconText: {
    color: '#FFFFFF',
    fontSize: rs(24),
    fontFamily: getFontFamily('Figtree', 'Bold'),
    fontWeight: getFontWeight('700'),
  },

  successText: {
    fontSize: rs(16),
    fontFamily: getFontFamily('Figtree', 'SemiBold'),
    fontWeight: getFontWeight('600'),
    color: '#333',
    textAlign: 'center',
  },
});