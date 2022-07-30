import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type ListContainerProps = ViewProps;

export const ListContainer: React.FC<ListContainerProps> = (props) => {
  return (
    <View {...props} style={[styles.listContainer, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
});
