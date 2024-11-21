import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';

const PasswordCreateModal = ({visible, onClose}: any) => {
  const [input, setInput] = useState('');
  const [inputConfirm, setInputConfirm] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    console.log('input', input);
    console.log('inputC', inputConfirm);
    if (input === inputConfirm) {
      console.log('isti su');
      await AsyncStorage.setItem(
        'safeModeData',
        JSON.stringify({isSet: 'true', password: input}),
      );
      onClose(true);
    } else {
      setError(true);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} // Handles back button close on Android
    >
      <Pressable
        style={styles.modalBackground}
        onPress={() => {
          onClose(false);
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>
            Do you want to create/change a password for a safe mode? It will let
            you prohibit changing the settings to the app.
          </Text>
          {error ? (
            <Text style={styles.errorText}>Passwords do not match!</Text>
          ) : (
            <></>
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={inputConfirm}
            onChangeText={setInputConfirm}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PasswordCreateModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blurred effect with transparency
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  errorText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
