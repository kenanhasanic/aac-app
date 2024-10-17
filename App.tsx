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
function DetailsScreen({navigation}: any) {
  return (
    <View
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}>
      <Text>Details Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
function AboutScreen({navigation}: any) {
  return (
    <View
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}>
      <Text>About Screen</Text>
    </View>
  );
}

const StackA = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <StackA.Screen name="HomeScreen" component={HomeScreen} />
      <StackA.Screen name="DetailsScreen" component={DetailsScreen} />
    </StackA.Navigator>
  );
}
const StackB = createNativeStackNavigator();

function StackBNavigator() {
  return (
    <StackB.Navigator
      initialRouteName="About"
      screenOptions={{
        headerShown: false,
      }}>
      <StackB.Screen name="About" component={AboutScreen} />
    </StackB.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 5,
            height: 70,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={StackANavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="StackB"
          component={StackBNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
