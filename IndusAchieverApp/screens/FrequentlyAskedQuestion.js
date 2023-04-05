import { StyleSheet, Text, ScrollView,View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const FrequentlyAskedQuestion = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'How do I create an account?', answer: 'To create an account, go to the Sign Up page and follow the instructions.' },
    { id: 2, question: 'How do I reset my password?', answer: 'To reset your password, go to the Forgot Password page and follow the instructions.' },
    { id: 3, question: 'How do I view announcements or updates from my instructor?', answer: 'Announcements and updates from your instructor can be found on the "Announcements" tab in the app. This will display any important messages or updates from your instructor.' },
    { id: 4, question: 'How do I create a doubt?', answer: 'To create a doubt, go to the list of faculties and click any one of them to create a doubt with respect to that faculty' },
    { id: 5, question: 'How do I see the Academic Calendar?', answer: 'To view the calendar, go to the Home page and click Academic Calendar widget' },
  ]);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQuestion(id === activeQuestion ? null : id);
  }
  return (
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
    </View>
    {questions.map((q) => (
      <TouchableOpacity key={q.id} style={styles.questionContainer} onPress={() => toggleQuestion(q.id)}>
        <Text style={styles.question}>{q.question}</Text>
        {q.id === activeQuestion ? <Text style={styles.answer}>{q.answer}</Text> : null}
      </TouchableOpacity>
    ))}
  </ScrollView>
  )
}

export default FrequentlyAskedQuestion
const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#fff',
},
header: {
  marginBottom: 20,
  marginTop: responsiveHeight(3)
},
title: {
  fontSize: responsiveFontSize(2.7),
  fontWeight: '600',
  textAlign: 'center',
  color:Colors.grey,
  paddingBottom: responsiveHeight(2)

},
questionContainer: {
  marginBottom: 15,
  paddingVertical: 12,
  paddingHorizontal: 15,
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
},
question: {
  fontSize: responsiveFontSize(2.5),
  fontWeight: 'bold',
  marginBottom: 5,
},
answer: {
  paddingTop: 10,
  paddingBottom: 10,
  fontSize: responsiveFontSize(2),
  color: Colors.navyblue
},
});




