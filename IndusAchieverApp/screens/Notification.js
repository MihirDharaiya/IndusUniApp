import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView, StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../constants/Colors";
import BorderCard from "../components/BorderCard";
import TextInputBoxField from "../components/TextInputBoxField";
import { getAuth} from "firebase/auth";
import {getFirestore, getDocs, doc, collection, onSnapshot, limit, query} from 'firebase/firestore';
import {app} from '../firebase/firebase';
import {React, useEffect, useState,useCallback} from "react";


export default function Notification() {
  const auth=getAuth();
    const [events,setEvents] = useState([]);
    const db = getFirestore(app);

    async function getEvents(){
      const docRef = query(collection(db,"events"));
      const docSnap = await getDocs(docRef);
      var arr=[]
        docSnap.forEach(doc => {
            arr.push(doc.data())     
      })
      setEvents(arr)
    }
    useEffect(() => {
      getEvents()
    },[])
    const [textShown, setTextShown] = useState(false); 
    const [lengthMore,setLengthMore] = useState(false); 
    const toggleNumberOfLines = () => { 
          setTextShown(!textShown);
      }
      const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); 
    },[]);      
    function card(data){
      return (
        <View>
          <BorderCard>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Faculty Name:</Text>
            <Text style={styles.headingText}>Raised On:</Text>
          </View>
          <View style={styles.answerView}>
            <Text style={styles.answerText}>{data.fname}</Text>
            <Text style={styles.answerText2}>{data.date}</Text>
          </View>
          <View>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
          <View style={styles.mainContainer}>
          <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={{ lineHeight: 21 }}>{data.description}</Text>
              {
                  lengthMore ? 
                  <>
                  <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 10,color:Colors.navyblue }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  <Text style={{color:Colors.darkred, marginTop: responsiveHeight(0.2)}}>{data.link}</Text>
                  </>
                  :null
              }
      </View>
      </BorderCard>
        </View>
      )
    }
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
      <View style={styles.titleView}>
            <Icon name="bell" color={Colors.grey} size={responsiveFontSize(3)}/>
            <Text style={styles.activeText}>Announcement</Text>
          </View>
          <FlatList
      data={events}
      renderItem={({item}) => card(item)}
      keyExtractor={data => data.uid}
      >
      </FlatList>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  activeText: {
    fontSize: responsiveFontSize(3),
    color:Colors.grey,
    fontWeight: '500',
    paddingLeft: responsiveWidth(2),
  },
  titleView:{
    paddingTop: responsiveHeight(1.8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: responsiveHeight(2)
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(0.5),
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3)
  },
  headingText: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2)
  },
  answerView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: responsiveWidth(0.6),
    paddingRight: responsiveWidth(0.3),
    paddingBottom: responsiveHeight(1)
  },
  answerText: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    color:Colors.darkred
  },
  answerText2: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    color:Colors.grey
  },
  titleText:{
    color: Colors.blue,
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    margin: 5,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2)
  }
});
