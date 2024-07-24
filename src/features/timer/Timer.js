import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { Countdown } from '../../components/Countdown';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: 10 }}>
        <ProgressBar
          color="#6464824D"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="stop" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  task: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  }
});
