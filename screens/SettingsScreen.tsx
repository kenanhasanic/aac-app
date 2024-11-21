import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordCreateModal from '../components/PasswordCreateModal';
import auth from '@react-native-firebase/auth';

const SettingsScreen = ({route, navigation}: any) => {
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [isSafeModeEnabled, setIsSafeModeEnabled] = useState<boolean>();
  const [safeModeData, setSafeModeData] = useState('');

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      DeviceEventEmitter.removeAllListeners('event. testEvent');
    };
  }, []);

  useEffect(() => {
    const getSettingsData = async () => {
      const storedSafeModeData = await AsyncStorage.getItem('safeModeData');
      if (storedSafeModeData !== '' && storedSafeModeData !== null) {
        if (JSON.parse(storedSafeModeData!!).isSet === 'true') {
          setSafeModeData(JSON.parse(storedSafeModeData!!));
          setIsSafeModeEnabled(true);
        }
      }
    };

    getSettingsData();
  }, []);

  const openChangePasswordModal = () => {
    openPasswordModal();
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalVisible(false);
  };

  const deleteSafeModePassword = async () => {
    Alert.alert(
      'Delete Safe Mode Password',
      'Are you sure you want to delete the safe mode password?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            AsyncStorage.setItem('safeModeData', '');
          },
        },
      ],
    );
  };

  const enableSafeMode = () => {
    if (safeModeData !== '') {
      Alert.alert(
        'Disable Safe Mode',
        'Are you sure you want to disable the safe mode? That means deleting the password aswell.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Disable',
            onPress: () => {
              AsyncStorage.setItem('safeModeData', '');
              setIsSafeModeEnabled(false);
              setSafeModeData('');
            },
          },
        ],
      );
    } else {
      openPasswordModal();
    }
  };

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const closePasswordModal = (isSet: boolean) => {
    if (isSet) navigation.navigate('HomeScreen');
    setPasswordModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out the user from Firebase
      await AsyncStorage.removeItem('user'); // Clear the user data from local storage
      await AsyncStorage.removeItem('safeModeData'); // Clear the user data from local storage
      Alert.alert('Signed Out', 'You have been signed out.');
      // navigation.replace('LoginScreen'); // Redirect to the Login screen
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'There was a problem signing out.');
    }
  };

  return (
    <View style={styles.container}>
      <PasswordCreateModal
        visible={passwordModalVisible}
        onClose={closePasswordModal}
      />
      <Text style={styles.header}>Settings</Text>

      {/* Enable/Disable Safe Mode Button */}
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: isSafeModeEnabled ? '#FF8C00' : '#00C853'},
        ]}
        onPress={enableSafeMode}>
        <Text style={styles.buttonText}>
          {isSafeModeEnabled ? 'Disable Safe Mode' : 'Enable Safe Mode'}
        </Text>
      </TouchableOpacity>

      {/* Change Password Button */}
      <TouchableOpacity
        disabled={!isSafeModeEnabled}
        style={[
          styles.button,
          {backgroundColor: '#007BFF'},
          !isSafeModeEnabled ? {opacity: 0.5} : {},
        ]}
        onPress={openChangePasswordModal}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Grid Size Buttons */}
      <View style={styles.gridSizeContainer}>
        <Text style={styles.subHeader}>Grid Size</Text>
        <View style={styles.gridButtonsContainer}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '3');
            }}>
            <Text style={styles.gridButtonText}>3x3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '4');
            }}>
            <Text style={styles.gridButtonText}>4x4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '5');
            }}>
            <Text style={styles.gridButtonText}>5x5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '6');
            }}>
            <Text style={styles.gridButtonText}>6x6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '7');
            }}>
            <Text style={styles.gridButtonText}>7x7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => {
              DeviceEventEmitter.emit('event.testEvent', '8');
            }}>
            <Text style={styles.gridButtonText}>8x8</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Change Password Modal */}
      <Modal
        visible={isChangePasswordModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeChangePasswordModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Change Password</Text>
            {/* Add password input fields here */}
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#007BFF'}]}
              onPress={closeChangePasswordModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#FF4C4C', marginTop: 30}]}
        onPress={() => {
          // You can implement the logout functionality here
          handleLogout();
        }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  gridSizeContainer: {
    marginTop: 20,
  },
  gridButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridButton: {
    width: '45%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  gridButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});

export default SettingsScreen;
