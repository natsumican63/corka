import React from 'react';
import { View, ViewProps } from 'react-native';

type SpacerProps = ViewProps & { size?: number };

export const Spacer = (props: SpacerProps) => {
  return <View style={{ marginTop: props.size ?? 20 }} />;
};
