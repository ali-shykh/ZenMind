import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to foucs on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1 }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            style={{ marginLeft: 20 }}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.7,
    padding: 16,
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
