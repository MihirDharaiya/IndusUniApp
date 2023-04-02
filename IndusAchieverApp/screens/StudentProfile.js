import { StyleSheet, Text, View, ScrollView, Image, Pressable,FlatList } from 'react-native'
import {React,useState,useEffect} from 'react'
import Colors from '../constants/Colors'
import BorderCard from '../components/BorderCard'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import RoundButton from '../components/RoundButton'
import Card from '../components/Card'
import { Linking } from 'react-native';
import {getFirestore, getDocs, collection, limit, query, where} from 'firebase/firestore';
import {app} from '../firebase/firebase';
import { getAuth} from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function StudentProfile({route,navigation}) {  
    const currentProfileUser = route.params.data.uid;
    const [users,setUsers] = useState([]);
    const db = getFirestore(app);
    const auth=getAuth();
    async function getUsers(){
        const docRef = query(collection(db,"users") ,where("uid","!=",auth.currentUser.uid),limit(4));
        const docSnap = await getDocs(docRef);
        var arr=[]
        let i =0;
          docSnap.forEach(doc => {
            if(currentProfileUser != doc.id && i<3){
              arr.push(doc.data())     
              i++;
            }
        })
        setUsers(arr)
      }
      useEffect(() => {
        getUsers()
      },[])
      function card(data) {
        return (
          <>
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
            </>
        )
      }
    return (
        <ScrollView style={styles.rootContainer}>
            <View>
                <BorderCard>
                <View style={{justifyContent:'space-between', alignItems: 'space-between', flexDirection: 'row'}}>
                <Pressable
                onPress={() => {
                  navigation.navigate("ReportStudent",{data:route.params.data});
                }}
              >
                <View style={styles.reportContainer}>
                  <Icon
                    name="flag"
                    size={responsiveFontSize(2)}
                    color={Colors.red}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "400",
                        color: Colors.red,
                        fontSize: responsiveFontSize(1.6),
                      },
                    ]}
                  >
                    Report
                  </Text>
                </View>
              </Pressable>        
            <Text style={styles.yearStyle}>{route.params.data.batchYear}</Text>
            </View>
                    <View style={styles.image}>
                    <Image 
                    source={require("../assets/images/Profile.png")}/>
                    </View>
                    <View>
                        <Text style={styles.nameTitle}>{route.params.data.name}</Text>
                        <Text style={styles.subTitle}>Branch: </Text>
                        <View style={{flexDirection: 'row', textAlign: 'center', justifyContent: 'center'}}>
                        <Text style={styles.answerText}>{route.params.data.branch+", "}</Text>
                        <Text style={styles.answerText}>{route.params.data.batchYear}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        {/* <Text style={{fontSize: responsiveFontSize(2)}}>Skills:</Text> */}
                    <View style={{flexDirection:'row'}}>
                    </View>
                      
                    </View>
                    <View
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}/>
                    <View style={styles.roundButtonView}>
                    <RoundButton
                    onPress={()=>{Linking.openURL(route.params.data.github)}}
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="github-alt"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    onPress={()=>{Linking.openURL("mailto:"+route.params.data.email)}}
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="envelope"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    onPress={()=>{Linking.openURL(route.params.data.linkedIn)}}
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="linkedin-in"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    onPress={()=>{Linking.openURL(route.params.data.instagram)}}
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="instagram"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    onPress={()=>{Linking.openURL(route.params.data.twitter)}}
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="twitter"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    </View>
                </BorderCard>
                <View style={styles.suggestionView}>
                    <Text style={styles.suggestionText}>Suggestions:</Text>
                </View>
                <View>
        <FlatList
            data={users}
            renderItem={({item}) => card(item)}
            keyExtractor={data => data.uid}
            initialNumToRender={2}
            >
            </FlatList>
        </View>
            </View>
        </ScrollView>
      )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    image:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    yearStyle:{
        color: Colors.darkred,
        fontWeight: '700'
      },
    nameTitle:{
        fontSize: responsiveFontSize(2.5),
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: responsiveHeight(1)
    },
    subTitle:{
        fontSize: responsiveFontSize(2.2),
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: responsiveHeight(2)
    },
    answerText:{
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        textAlign: 'center',
        color:Colors.grey,
        paddingTop: responsiveHeight(0.5)
    },
    buttonView:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 15
    },
    roundButtonView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    suggestionText:{
        color: Colors.darkred,
        fontSize: responsiveFontSize(2.7),
        fontWeight: 'bold'
    },
    suggestionView:{
        margin: 10
    },
    titleContainer: {
        flexDirection: 'row'
    },
    moreText: {
        color: Colors.grey,
        textAlign: 'center'
      },
    imgContainer: {
        margin: 10,
    },
    profileImg: {
        width: responsiveWidth(24),
        height: responsiveWidth(24),
        borderRadius: 25,
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
    reportContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "400",
        color: Colors.lightgrey,
        marginLeft: 4,
      },

})