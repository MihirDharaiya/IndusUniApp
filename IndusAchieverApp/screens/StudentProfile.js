import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import BorderCard from '../components/BorderCard'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import PrimaryButton from '../components/PrimaryButton'
import RoundButton from '../components/RoundButton'
import Card from '../components/Card'
import GreyCard from '../components/GreyCard'

export default function StudentProfile() {
    return (
        <ScrollView style={styles.rootContainer}>
            <View>
                <BorderCard>
                    <View style={styles.image}>
                    <Image 
                    source={require("../assets/images/Profile.png")}/>
                    </View>
                    <View>
                        <Text style={styles.nameTitle}>Rahul Bhatt</Text>
                        <Text style={styles.subTitle}>Branch: </Text>
                        <Text style={styles.answerText}>CSE, 3rd Year</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Text style={{fontSize: responsiveFontSize(2)}}>Skills:</Text>
                    <View style={{flexDirection:'row'}}>
                        <GreyCard>
                        <Text>React.js</Text>
                        </GreyCard>
                        <GreyCard>
                        <Text>React.js</Text>
                        </GreyCard>
                        <GreyCard>
                        <Text>React.js</Text>
                        </GreyCard>
                        <GreyCard>
                        <Text>React.js</Text>
                        </GreyCard>
                    </View>
                      
                    </View>
                    <View
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}/>
                    <View style={styles.roundButtonView}>
                    <RoundButton
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="github-alt"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="envelope"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="linkedin-in"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
                    textNotVisible={true}
                    iconVisible={true}
                    style={styles.iconRight}
                    iconName="instagram"
                    size={responsiveFontSize(2.3)}
                    color={Colors.white}
                    ></RoundButton>
                    <RoundButton
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
                <Card>
                    <View style={styles.titleContainer}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.profileImg}
                            source={require("../assets/images/Profile.png")}
                            />        
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Name:</Text>
                        <Text style={styles.answerTitle}>Rahul Bhatt</Text>
                        <Text style={styles.title}>Branch:</Text>
                        <Text style={styles.answerTitle}>CE,2nd Year</Text>
                    </View>      
                    </View>
                </Card>
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

})