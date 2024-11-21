/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Card from './components/Card';
import cardsData from './static/cardData';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import CreateCard from './screens/CreateCard';
import Icon from 'react-native-vector-icons/AntDesign';
import {PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SettingsScreen from './screens/SettingsScreen';

const StackA = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <StackA.Screen name="HomeScreen" component={HomeScreen} />
      <StackA.Screen
        name="EditScreen"
        component={EditScreen}
        options={{headerShown: true}}
      />
      <StackA.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: true}}
      />
    </StackA.Navigator>
  );
}

const StackB = createNativeStackNavigator();

function StackBNavigator() {
  return (
    <StackB.Navigator
      initialRouteName="CreateCard"
      screenOptions={{
        headerShown: false,
      }}>
      <StackB.Screen name="CreateCard" component={CreateCard} />
    </StackB.Navigator>
  );
}
const StackC = createNativeStackNavigator();

function StackCNavigator() {
  return (
    <StackC.Navigator
      initialRouteName="CreateCard"
      screenOptions={{
        headerShown: false,
      }}>
      <StackC.Screen name="LoginScreen" component={LoginScreen} />
      <StackC.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1e1e2e', // Matches SignUpScreen background color
          },
          headerTintColor: '#ffffff', // Optional: sets the color of the header text
        }}
      />
    </StackC.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: '#BADA55',
  },
};

function App(): React.JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      console.log('storedUser: ', storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUserFromStorage();

    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        // User signed in, store user data
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('setUser: ', user);
        setUser(user);
      } else {
        // User signed out, clear stored user data
        AsyncStorage.getItem('user')
          .then(storedUser => {
            console.log('deleting user: ', storedUser);
          })
          .then(async () => {
            await AsyncStorage.removeItem('user');
          });
        setUser(null);
      }
    });

    return subscriber; // Unsubscribe on unmount
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={StackCNavigator}
            options={{headerShown: false, tabBarStyle: {display: 'none'}}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName: string = '';
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Create Card') {
                iconName = 'addfile';
              }
              return <Icon name={iconName} size={size} color="white" />;
            },
            tabBarLabelStyle: {
              fontSize: 14,
              color: 'white',
            },
            tabBarStyle: {
              height: 60,
            },
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {},
            tabBarActiveBackgroundColor: 'tomato', // Background color of the active tab
            tabBarInactiveBackgroundColor: 'gray', // Background color of the inactive tab
          })}>
          <Tab.Screen
            name="Home"
            component={StackANavigator}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Create Card"
            component={StackBNavigator}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
