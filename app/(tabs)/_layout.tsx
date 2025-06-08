import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '오늘의 말씀',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <FontAwesome5 name="book-open" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: '필사하기',
          tabBarIcon: ({ color, focused }) => (
            <View style={[
              styles.writeButton,
              { backgroundColor: focused ? colors.tint : colors.buttonPrimary }
            ]}>
              <Feather name="edit-3" size={24} color={focused ? colors.buttonText : colors.background} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: '진도율',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <MaterialIcons name="insights" size={28} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : null}>
              <Feather name="settings" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 226, 133, 0.2)', // Warm yellow with 20% opacity
  },
  writeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
