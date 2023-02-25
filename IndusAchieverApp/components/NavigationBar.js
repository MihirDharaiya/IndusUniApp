import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from "react-native-vector-icons/FontAwesome5";
import HomeScreen from '../screens/HomeScreen';
import PastDoubts from '../screens/PastDoubts';
import AlumniSection from '../screens/AlumniSection';
import ActiveDoubts from '../screens/ActiveDoubts';
import Profile from '../screens/Profile';
import Colors from '../constants/Colors';

export default function NavigationBar() {
    const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) =>({
        tabBarIcon: ({focused, size, color}) =>{
            let iconName;
            if(route.name === "Home"){
                iconName = focused ? "home" : "home";
                size = focused ? size+8 : size+5; 
            }
            else if(route.name === "ActiveDoubts"){
                iconName = focused ? "comments" : "comments";
                size = focused ? size+8 : size+5; 
            }
            else if(route.name === "PastDoubts"){
                iconName = focused ? "clipboard-list" : "clipboard-list";
                size = focused ? size+8 : size+5; 
            }
            else if(route.name === "Alumni"){
                iconName = focused ? "users" : "users";
                size = focused ? size+8 : size+5; 
            }
            else if(route.name === "Profile"){
                iconName = focused ? "user" : "user";
                size = focused ? size+8 : size+5; 
            }
            return <Ionicons name={iconName} size={size} color={Colors.blue}/>
        },
      })}
      >
      <Tab.Screen name='PastDoubts' component={PastDoubts} />
        <Tab.Screen name='Alumni' component={AlumniSection} />
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='ActiveDoubts' component={ActiveDoubts} />
        <Tab.Screen name='Profile' component={Profile} />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})