import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/presentation/components/HapticTab';
import Header from '@/presentation/components/ui/Header';
import { useTheme } from '@/presentation/hooks/useThemeColor';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';


export default function TabLayout() {
  const theme = useTheme() 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        header:(props:BottomTabHeaderProps) => <Header title={props.options.title ?? ''} />,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'center',        
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1,
          borderColor: theme.colors.primary,

        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Primera prueba',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-1-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(second)"
        options={{
          headerShown: false,
          title: 'Segunda prueba',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="numeric-2-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
