import { Button, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
export default function FlexedButtons() {
   return (
   <View style={styles.container}>
     <View style={styles.buttonContainer}>
      <Button title="Alumni Network" color={Colors.black}/>
    </View>
    <View style={styles.buttonContainer2}>
      <Button title="Student Network" color={Colors.black}/>
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

  }
});