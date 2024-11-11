/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const BUTTON_TRANSITION_TIME = 500;

const App = () => {
  const pressed = useSharedValue<number>(0);

  const animatedBoxShadow = useAnimatedStyle(() => {
    const blurRadius = interpolate(pressed.value, [0, 1], [10, 0]);
    const color = interpolateColor(
      pressed.value,
      [0, 1],
      // from black to yellow - will not work <---!!!!
      ['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 0, 0.5)'], // will not work!! <---!!!!
    );

    const boxShadow = `0px 4px ${blurRadius}px 0px ${color}`;

    return {
      boxShadow,
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      ['lightblue', 'red'],
    );

    return {
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    pressed.value = withTiming(1, {
      duration: BUTTON_TRANSITION_TIME,
      easing: Easing.out(Easing.ease),
    });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, {
      duration: BUTTON_TRANSITION_TIME,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView style={backgroundStyle}>
        <View
          style={{
            padding: 24,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            The background color animation will work, but not the shadow
            animation.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              marginBottom: 8,
            }}>
            The shadow animation will also not work if using the BoxShadowValue
            type instead of a string, it does not make a difference.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
            }}>
            Please note that the shadow renders correctly on first render, but
            not after the button has been pressed once
          </Text>
          <AnimatedPressable
            style={[
              backgroundColorStyle,
              animatedBoxShadow,
              {
                padding: 16,
                borderRadius: 100,
                marginVertical: 16,
              },
            ]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text>Hello I am button with shadow</Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const backgroundStyle = {
  backgroundColor: 'lightgrey',
  flex: 1,
};

export default App;
