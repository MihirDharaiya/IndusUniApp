import {View, StyleSheet, Pressable, Text} from 'react-native';
import React, { useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default function FlexedButtons({onPress}) {

   return (
   <View style={styles.container}>
     <View style={styles.buttonContainer}>
      <Pressable onPress={onPress}>
        <View>
        <Text style={styles.text}>Alumni Network</Text>
        </View>
      </Pressable>   
      </View>
    <View style={styles.buttonContainer2}>
    <Pressable onPress={onPress}>
        <View>
        <Text style={styles.text}>Student Network</Text>
        </View>
      </Pressable>   
      </View>
  </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2
  },
  buttonContainer2: {
    flex: 1,
    borderBottomWidth: 2,
    borderTopWidth: 2
  },
  text: {
    fontSize: responsiveFontSize(2),
    padding: 10,
    textAlign: 'center',
  }
});