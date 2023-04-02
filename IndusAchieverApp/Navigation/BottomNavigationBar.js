import { StyleSheet, SafeAreaView,  StatusBar, Image, View} from 'react-native';
import Colors from '../constants/Colors';
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import ActiveDoubts from '../screens/ActiveDoubts';
import PastDoubts from '../screens/PastDoubts';
import Community from '../screens/Community';
import AlumniProfile from '../screens/AlumniProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/FontAwesome";
import {responsiveHeight} from 'react-native-responsive-dimensions';
import CreateDoubtScreen from '../screens/CreateDoubtScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Splash from '../screens/Splash';
import SocailMediaScreen from '../screens/SocailMediaScreen';
import FrequentlyAskedQuestion from '../screens/FrequentlyAskedQuestion';
import NotificationBell from '../components/NotificationBell';
import Notification from '../screens/Notification';
import ForgotPassword from '../screens/ForgotPassword';
import ReenterPassword from '../screens/ReenterPassword';
import EmailVerification from '../screens/EmailVerification';
import AcademicCalendar from '../screens/AcademicCalendar';
import StudentProfile from '../screens/StudentProfile';
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';
import VerifyEmail from '../screens/VerifyEmail';
import ReportStudent from '../screens/ReportStudent';
import SuccessPage from '../screens/SuccessPage';
import FacultyList from '../screens/FacultyList';
import ViewDetails from '../screens/ViewDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  function HomeStack(){
    return (
      <Stack.Navigator
					initialRouteName="HomeScreen"
				>
        <Stack.Screen
						name="HomeScreen"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
        <Stack.Screen
          name="FacultyList"
          component={FacultyList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateDoubtScreen"
          component={CreateDoubtScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActiveDoubts"
          component={ActiveDoubts}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="FrequentlyAskedQuestion"
          component={FrequentlyAskedQuestion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
						name="Notifications"
						component={Notification}
						options={{ headerShown: false }}
					/>
          <Stack.Screen
						name="AcademicCalendar"
						component={AcademicCalendar}
						options={{ headerShown: false }}
					/>
      </Stack.Navigator>    
    )
   }
   function CommunityStack(){
    return (
      <Stack.Navigator
					initialRouteName="Community"
				>
        <Stack.Screen
						name="Community"
						component={Community}
						options={{ headerShown: false }}
					/>
        <Stack.Screen
          name="AlumniProfile"
          component={AlumniProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentProfile"
          component={StudentProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>    
    )
   }
   function ProfileStack(){
    return (
      <Stack.Navigator
					initialRouteName="Profile"
				>
        <Stack.Screen
						name="Profile"
						component={Profile}
						options={{ headerShown: false }}
					/>
        <Stack.Screen
          name="SocailMediaScreen"
          component={SocailMediaScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>    
    )
   }
   let tabClientNavigator=(
    <Tab.Navigator
				initialRouteName="HomeStack"
        screenOptions={({navigation}) => ({
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: Colors.extralightgrey,
          headerStyle: {
            backgroundColor: Colors.white,
            elevation: null,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 0.1,
          },
          headerLeft: () => (
            <View style={styles.logo}>
              <Image
                style={{ width: responsiveHeight(30) }}
                source={require("../assets/images/AppBarLogo.png")}
                resizeMode="contain"
              />
            </View>
          ),
          headerRight: () => (
            <NotificationBell
              onPress={() => {
              navigation.navigate("Notifications");
              }}
            />
          ),
        })}
				// screenOptions={{
				// 	showLabel: false,
				// }}
			>
        <Tab.Screen
					name="PastDoubts"
					component={PastDoubts}
					options={{tabBarIcon: ({size}) => <Icon name='clipboard-list' size={size} color={Colors.blue}/>}}
					tabBarOptions={{ style: {} }}/>
           <Tab.Screen
					name="CommunityStack"
					component={CommunityStack}
					options={{tabBarIcon: ({size}) => <Icon name='users' size={size} color={Colors.blue}/>}}
					tabBarOptions={{ style: {
          } }}/>
        <Tab.Screen
					name="HomeStack"
					component={HomeStack}
					options={{tabBarIcon: ({size}) => <Icon name='home' size={size} color={Colors.blue}/>}}
					tabBarOptions={{ style: {} }}/>
           <Tab.Screen
					name="ActiveDoubts"
					component={ActiveDoubts}
					options={{tabBarIcon: ({size}) => <Icons name='comments' size={size} color={Colors.blue}/>}}
					tabBarOptions={{ style: {} }}/>  
          <Tab.Screen
					name="ProfileStack"
					component={ProfileStack}
					options={{tabBarIcon: ({size}) => <Icon name='user-alt' size={size} color={Colors.blue}/>}}
					tabBarOptions={{ style: {} }}/>

      </Tab.Navigator>
  )
  function GetTab() {
    const auth = getAuth();
    const useruid = auth.currentUser.uid;
    const db = getFirestore(app);
    const getUserData = async () => {
    const a = await getDoc(doc(db, "users", useruid));
    AsyncStorage.setItem("users", JSON.stringify(a.data()));
  };

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.removeItem("users");
      let user = await AsyncStorage.getItem("users");
      if (!user) {
        getUserData();
      }
      user = JSON.parse(user);
      console.log(user);
    }
    fetchData();
  });
    return tabClientNavigator;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" options={{ headerShown: false }}>
				<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="SignUpScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="tabClientNavigator" component={GetTab} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="ReenterPassword" component={ReenterPassword} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ headerShown: false }} />
        <Stack.Screen name="ReportStudent" component={ReportStudent} options={{ headerShown: false }} />
        <Stack.Screen name="SuccessPage" component={SuccessPage} options={{ headerShown: false }} />
        <Stack.Screen
          name="Event Details"
          component={ViewDetails}
          options={{
            presentation: "modal",
          }}
        />
			</Stack.Navigator>
    </NavigationContainer>
  )
}

export default BottomNavigationBar

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: { paddingLeft: 16 },
    bellBox: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
})