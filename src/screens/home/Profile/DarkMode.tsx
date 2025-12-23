import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Switch,
    Modal,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';
import { COLORS } from '../../../theme/colors';

const { width } = Dimensions.get('window');
const responsiveSize = (size: number) => (width / 375) * size;
const rs = responsiveSize;
const DarkMode = () => {
    const navigation = useNavigation<any>();
    const { theme, isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
    const [notifications, setNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const showPopup = useCallback((msg: string) => {
        setPopupMessage(msg);
        setPopupVisible(true);
    }, []);

    const closePopup = () => setPopupVisible(false);

    const handleToggleDarkMode = () => {
        toggleDarkMode();
        showPopup(`Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/back.png')}
                        style={[styles.backIcon, { tintColor: colors.text }]}
                    />
                </TouchableOpacity>

                <Text style={[styles.headerTitle, { color: colors.text }]}>Appearance</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        flexGrow: 1,
                        paddingBottom: 80,
                    },
                ]}
            >

                {/* THEME */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Theme</Text>
                <View style={[styles.card, { backgroundColor: colors.tabBg }]}>
                    <View style={styles.row}>
                        <Image
                            source={require('../../../assets/light.png')}
                            style={[styles.icon, { tintColor: colors.text }]}
                        />
                        <View style={[styles.textBox,]}>
                            <Text style={[styles.title, { color: colors.text }]}>Dark Mode</Text>
                            <Text style={[styles.sub, { color: colors.inactive }]}>
                                Switch between light and dark theme
                            </Text>
                        </View>
                    </View>

                    {/* <Switch
            value={isDarkMode}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: '#C7C7CC', true: COLORS.primary }}
            thumbColor="#fff"
          /> */}
                    <TouchableOpacity
                        onPress={toggleTheme}
                        activeOpacity={0.8}
                        style={[
                            styles.themeToggle,
                            {
                                backgroundColor:
                                    theme === 'dark' ? colors.primary : colors.inactive,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.themeToggleCircle,
                                {
                                    transform: [{ translateX: theme === 'dark' ? rs(20) : 0 }],
                                },
                            ]}
                        />
                    </TouchableOpacity>

                </View>

                {/* NOTIFICATIONS */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
                <View style={[styles.card, { backgroundColor: colors.tabBg }]}>
                    <View style={styles.row}>
                        <Image
                            source={require('../../../assets/notification.png')}
                            style={[styles.icon, { tintColor: colors.text }]}
                        />
                        <View style={styles.textBox}>
                            <Text style={[styles.title, { color: colors.text }]}>Push Notifications</Text>
                            <Text style={[styles.sub, { color: colors.inactive }]}>
                                Receive app notifications and updates
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: '#C7C7CC', true: COLORS.primary }}
                        thumbColor="#fff"
                    />
                </View>

                {/* EMAIL */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Email Preferences</Text>
                <View style={[styles.card, { backgroundColor: colors.tabBg }]}>
                    <View style={styles.row}>
                        <Image
                            source={require('../../../assets/email.png')}
                            style={[styles.icon, { tintColor: colors.text }]}
                        />
                        <View style={styles.textBox}>
                            <Text style={[styles.title, { color: colors.text }]}>Marketing Emails</Text>
                            <Text style={[styles.sub, { color: colors.inactive }]}>
                                Receive promotional emails and offers
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={marketingEmails}
                        onValueChange={setMarketingEmails}
                        trackColor={{ false: '#C7C7CC', true: COLORS.primary }}
                        thumbColor="#fff"
                    />
                </View>

                {/* RESET */}
                <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.tabBg }]}>
                    <Text style={[styles.resetText,]}>Reset to Default</Text>
                </TouchableOpacity>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={[styles.footerTitle, { color: colors.text }]}>Vinsta Partner App</Text>
                    <Text style={[styles.footerSub, { color: colors.text }]}>Version 1.0.0</Text>
                </View>
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* POPUP */}
            <Modal transparent visible={popupVisible} animationType="fade">
                <View style={styles.popupOverlay}>
                    <View style={styles.popupBox}>
                        <Text style={styles.popupText}>{popupMessage}</Text>
                        <TouchableOpacity
                            style={styles.popupBtn}
                            onPress={closePopup}
                        >
                            <Text style={styles.popupBtnText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DarkMode;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#EEE',
    },

    backIcon: { width: 22, height: 22 },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },

    scrollContent: { padding: 16 },

    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 14,
    },

    card: {
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },

    icon: { width: 26, height: 26, resizeMode: 'contain' },

    textBox: { maxWidth: width * 0.6 },

    title: { fontSize: 15, fontWeight: '600' },

    sub: { fontSize: 13, color: '#666', marginTop: 2 },

    resetBtn: {
        backgroundColor: '#F6F6F6',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },

    resetText: { color: '#FF3B30', fontSize: 15, fontWeight: '600' },

    footer: { alignItems: 'center', marginTop: 30 },

    footerTitle: { fontSize: 15, fontWeight: '600' },

    footerSub: { fontSize: 13, color: '#666', marginTop: 4 },

    popupOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    popupBox: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
    },

    popupText: { fontSize: 15, marginBottom: 16, textAlign: 'center' },

    popupBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },

    popupBtnText: { color: '#fff', fontWeight: '600' },
    themeToggle: {
        width: rs(46),
        height: rs(26),
        borderRadius: rs(13),
        padding: rs(3),
        justifyContent: 'center',
    },

    themeToggleCircle: {
        width: rs(20),
        height: rs(20),
        borderRadius: rs(10),
        backgroundColor: '#fff',
        elevation: 3, // Android shadow
    },


});



