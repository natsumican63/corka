import { lightColors as Colors } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'default' | 'outline' | 'clear' | 'gradient';
};

export const Button = ({ type = 'default', disabled = false, loading = false, ...props }: ButtonProps) => {
  if (type === 'gradient') {
    return <GradientButton {...props} disabled={disabled} loading={loading} />;
  }
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[styles.buttonContainer, disabled && { shadowOpacity: 0 }]}
      {...props}
    >
      <View
        style={[
          styles.button,
          type == 'outline' && { backgroundColor: 'transparent', borderWidth: 2, borderColor: Colors.primary },
          type == 'clear' && { backgroundColor: 'transparent' },
          disabled && { backgroundColor: Colors.disabled },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.grey5} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              type == 'outline' && { color: Colors.primary },
              type == 'clear' && { color: Colors.black },
              disabled && { color: Colors.greyOutline },
            ]}
          >
            {props.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const GradientButton = (props: ButtonProps) => {
  const { loading, disabled } = props;
  return (
    <TouchableOpacity style={styles.buttonContainer} {...props} disabled={loading || disabled}>
      <LinearGradient
        colors={loading || disabled ? [Colors.grey4] : [Colors.primary, Colors.secondary]}
        start={[0.1, 0.1]}
        end={[1, 1]}
        style={[styles.button, (loading || disabled) && { opacity: 0.3 }]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.grey5} />
        ) : (
          <Text style={[styles.buttonText, disabled && { color: Colors.greyOutline }]}>{props.title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 60,
  },
});
