import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const Countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };
  const [millis, setMillis] = useState(null);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(Countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    padding: 24,
    backgroundColor: 'rgba(100, 100, 130, 0.3)',
  },
});
