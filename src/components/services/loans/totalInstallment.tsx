import React, { FC, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, StyleSheet } from 'react-native';
interface ITotalInstallment {
  dates: string[];
  installment: number;
}
const TotalInstallment: FC<ITotalInstallment> = ({ dates, installment }) => {
  const [open, setOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    if (open) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View className="overflow-hidden pb-4">
      <Pressable
        style={{ backgroundColor: '#881337' }}
        className="p-4 rounded-xl"
        onPress={toggle}
      >
        <Text className="font-bold text-center text-white">
          Compute Installment
        </Text>
      </Pressable>

      <Animated.View
        style={{
          transform: [{ scaleY: scaleAnim }],
          opacity: opacityAnim,
          transformOrigin: 'top',
        }}
      >
        {open && (
          <View>
            {dates.map((date, i) => (
              <View
                key={i}
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#d1d5db',
                }}
                className="flex-row justify-between p-4"
              >
                <Text> {date} </Text>
                <Text> {installment} </Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  button: {
    padding: 16,
    backgroundColor: '#fecaca',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentBox: {
    backgroundColor: '#fca5a5',
    padding: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
});

export default TotalInstallment;
