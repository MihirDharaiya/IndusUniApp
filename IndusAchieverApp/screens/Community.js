import { StyleSheet,View, Button, Text, FlatList, Pressable, Image} from 'react-native'
import {React,useState,useEffect} from 'react'
import FlexedButtons from '../components/FlexedButtons'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryTextInputField from '../components/SecondaryTextInputField'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Colors from '../constants/Colors';
import Card from '../components/Card'
import {getFirestore, getDocs, doc, collection, onSnapshot, limit, query, where} from 'firebase/firestore';
import {app} from '../firebase/firebase';
import { getAuth} from "firebase/auth";

export default function Community({navigation}) {
  const [showSection1, setShowSection1] = useState(true);
  const [users,setUsers] = useState([]);
  const db = getFirestore(app);
  const auth=getAuth();

  async function getUsers(){
    const docRef = query(collection(db,"users") ,where("uid","!=",auth.currentUser.uid));
    const docSnap = await getDocs(docRef);
    var arr=[]
      docSnap.forEach(doc => {
          arr.push(doc.data())     
    })
    setUsers(arr)
  }
  useEffect(() => {
    getUsers()
  },[])

  const toggleSections = () => {
    setShowSection1(!showSection1);
  };
  function card(data) {
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("StudentProfile",{data:data});
            
          }}
          >
        <Card>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={styles.yearStyle}><Text style={{fontWeight: '700', color: Colors.black}}>Batch Year:</Text> {data.batchYear}</Text>
            </View>
          <View style={styles.titleContainer}>
          <View style={styles.imgContainer}>
          <Image
                style={styles.profileImg}
                source={require("../assets/images/Profile.png")}
              />        
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
    )
  }
  return (
    <View style={styles.rootContainer}>
      <View>
      {/* <FlexedButtons></FlexedButtons> */}
      {/* <View style={styles.container}>
        <View style={styles.searchBox}>
        <SecondaryTextInputField
        iconVisible={true}
        iconName={"search"}
        size={responsiveFontSize(3)}
        placeholder={"Search By Name"}
        ></SecondaryTextInputField>
        </View>
        <View style={styles.button}>
        <PrimaryButton>Search</PrimaryButton>
        </View>
      </View> */}
      <View>
        <FlatList
      data={users}
      renderItem={({item}) => card(item)}
      keyExtractor={data => data.uid}
      initialNumToRender={1}
      >
      </FlatList>
        </View>
      </View>
     </View>
  );
};

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: Colors.white
    },
    yearStyle:{
      color: Colors.darkred,
      fontWeight: '700'
    },
    container:{
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBox:{
      width: responsiveWidth(55),
      marginTop: responsiveHeight(1.1)
    },
    button: {
      width: responsiveWidth(40)
    },
    titleContainer: {
      flexDirection: 'row'
    },
    title:{
      fontWeight: '800',
      marginBottom: responsiveHeight(1),
      fontSize: responsiveFontSize(2)
    },
    answerTitle: {
      fontWeight: '500',
      marginBottom: responsiveHeight(1),
      color: Colors.grey,
      fontSize: responsiveFontSize(1.8)
    },
    textContainer:{
      padding: 6,
      justifyContent: 'flex-end'
    },
    imgContainer: {
      margin: 10,
    },
});