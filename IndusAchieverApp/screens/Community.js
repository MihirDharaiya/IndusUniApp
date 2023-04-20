import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  Pressable,
  Image,
  BackHandler,
} from "react-native";
import { React, useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  onSnapshot,
  limit,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import SecondaryTextInputField from '../components/SecondaryTextInputField'
import PrimaryButton from '../components/PrimaryButton';
import filter from "lodash.filter";


export default function Community({ navigation }) {
  const [showSection1, setShowSection1] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth();
  const isFocused = useIsFocused();

  async function getUsers() {
    const docRef = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser.uid)
    );
    const docSnap = await getDocs(docRef);
    var arr = []
    docSnap.forEach(doc => {
      arr.push(doc.data())
    })
    setUsers(arr)
  }
  useEffect(() => {
    getUsers();
    const backAction = () => {
      navigation.navigate("HomeScreen");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFocused]);

  const toggleSections = () => {
    setShowSection1(!showSection1);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formatquery = query.toLowerCase();
    const filterData = filter(users, (user) => {
      return contains(user, formatquery);
    });
    setUsers(filterData);
  };
  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };
  function card(data) {
    const prof = data.profileImg;
    const profile = { uri: data.profileImg };
    const default_prof = require("../assets/images/Profile.png");
    let icon = prof === "" ? default_prof : profile;
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Student Profile", { data: data });
          }}
        >
          <Card>
            <View
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <Text style={styles.yearStyle}>
                <Text style={{ fontWeight: "700", color: Colors.black }}>
                  Batch Year:
                </Text>{" "}
                {data.batchYear}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <View style={styles.imgContainer}>
                <Image style={styles.profileImage} source={icon} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.answerTitle}>{data.name}</Text>
                <Text style={styles.title}>Branch:</Text>
                <Text style={styles.answerTitle}>{data.branch}</Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <View style={{ marginTop: 10 }}>
        <View style={styles.container}>
          <View style={styles.searchBox}>
            <SecondaryTextInputField
              clearButtonMode={"always"}
              placeholder={"Search By Name"}
              enteredValue={searchQuery}
              enteredValueHandler={(query) => {
                handleSearch(query)
              }}
            ></SecondaryTextInputField>
          </View>
        </View>
        <View>
          <FlatList
            data={users}
            renderItem={({ item }) => card(item)}
            keyExtractor={(data) => data.uid}
            initialNumToRender={1}
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  yearStyle: {
    color: Colors.darkred,
    fontWeight: "700",
  },
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    flex: 1,
    // width: responsiveWidth(60),
    marginTop: responsiveHeight(1.1),
    marginHorizontal: responsiveWidth(2),
  },
  button: {
    // width: responsiveWidth(35)
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "800",
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  answerTitle: {
    fontWeight: "600",
    marginBottom: responsiveHeight(1),
    color: Colors.grey,
    fontSize: responsiveFontSize(2.1),
  },
  textContainer: {
    padding: 6,
    justifyContent: "flex-end",
  },
  imgContainer: {
    margin: 10,
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(30) / 2,
    alignItems: "center",
    paddingTop: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
