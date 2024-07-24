import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';


export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

const HistoryItem = ({ item }) => (
  <Text style={styles.historyItem(item.state)}>{item.subject}</Text>
);

  return (
    <>
      <SafeAreaView style={{ flex: 0.3, alignItems: 'center' }}>
            <Text style={styles.title}>YOU HAVE FOCUSED ON</Text>
        {focusHistory.length > 0 ? (
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
        ) : (
          <Text style={styles.noItems}>Nothing</Text>
        )}
      </SafeAreaView> 
      <View style={styles.clearHistory}>
        <RoundedButton title="Clear" size={75} onPress={clearHistory} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (state) => ({
    color: state > 1 ? 'red' : 'green',
    fontSize: 15,
    fontWeight: 'bold',
  }),
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noItems: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 15,
    paddingTop: 10,
  }
});
