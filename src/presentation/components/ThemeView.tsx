import { useTheme } from '@/presentation/hooks/useThemeColor';
import React from 'react';
import { View as RNView, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

const View: React.FC<Props> = ({ style, ...props }) => {
  const theme = useTheme();

  return (
    <RNView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...props}
    >
      {props.children}
    </RNView>
  );
};

export default View;