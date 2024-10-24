/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function HomeScreen({navigation}: any) {
//   const windowWidth = Dimensions.get('window').width;
//   const cardWidth = windowWidth / 2;
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: 'green',
//       }}>
//       <Text>Home Screen</Text>
//       <View style={{flexDirection: 'row'}}>
//         <FlatList
//           data={cardsData} // Pass the cardsData array
//           renderItem={({item}) => <Card data={item}></Card>}
//           keyExtractor={(item, index) => index.toString()}
//           key={4}
//           numColumns={4} // Use index as key
//         />
//       </View>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('DetailsScreen')}
//       />
//     </View>
//   );
// }

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
