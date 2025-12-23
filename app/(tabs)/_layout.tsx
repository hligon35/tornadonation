import React from 'react';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, Text, type ImageSourcePropType } from 'react-native';

import { defaultTheme } from '@tornado-nation/ui';

const navIconTeams = require('../../assets/navIcons/teams.png');
const navIconEvents = require('../../assets/navIcons/events.png');
const navIconHome = require('../../assets/navIcons/home.png');
const navIconLive = require('../../assets/navIcons/live.png');
const navIconStore = require('../../assets/navIcons/store.png');

const navIconTeamsActive = require('../../assets/activeIcons/teams.png');
const navIconEventsActive = require('../../assets/activeIcons/events.png');
const navIconHomeActive = require('../../assets/activeIcons/home.png');
const navIconLiveActive = require('../../assets/activeIcons/live.png');
const navIconStoreActive = require('../../assets/activeIcons/store.png');


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  focused: boolean;
  source: ImageSourcePropType;
  activeSource: ImageSourcePropType;
}) {
  return (
    <Image
      source={props.focused ? props.activeSource : props.source}
      resizeMode="contain"
      style={{ width: 28, height: 28, marginBottom: -3, opacity: props.focused ? 1 : 0.75 }}
    />
  );
}

function TabBarLabel(props: { focused: boolean; color: string; children: React.ReactNode }) {
  return (
    <Text
      style={[
        styles.tabLabelBase,
        { color: props.color },
        props.focused ? styles.tabLabelActive : null,
      ]}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  tabLabelBase: {
    fontSize: 12,
  },
  tabLabelActive: {
    fontWeight: '900',
    textShadowColor: defaultTheme.colors.white,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: defaultTheme.colors.brandSecondary,
        },
        tabBarActiveTintColor: defaultTheme.colors.slate900,
        tabBarInactiveTintColor: defaultTheme.colors.slate900,
        tabBarLabel: ({ focused, color, children }) => (
          <TabBarLabel focused={focused} color={color}>
            {children}
          </TabBarLabel>
        ),
      }}
    >
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconTeams} activeSource={navIconTeamsActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconEvents} activeSource={navIconEventsActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconHome} activeSource={navIconHomeActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconLive} activeSource={navIconLiveActive} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} source={navIconStore} activeSource={navIconStoreActive} />
          ),
        }}
      />
    </Tabs>
  );
}

